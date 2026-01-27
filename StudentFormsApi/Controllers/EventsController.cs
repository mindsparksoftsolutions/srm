using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFormsApi.Data;
using StudentFormsApi.Models;

namespace StudentFormsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Events/active/{type} (Public)
        // Used by Header to get the single active event for "Student" or "College"
        [HttpGet("active/{type}")]
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        public async Task<ActionResult<EventDetail>> GetActiveEvent(string type)
        {
            var eventDetail = await _context.EventDetails
                .FirstOrDefaultAsync(e => e.EventType.ToLower() == type.ToLower() && e.IsActive);

            // Fallback: If no active event found, return the first one of that type
            if (eventDetail == null)
            {
                 eventDetail = await _context.EventDetails
                    .FirstOrDefaultAsync(e => e.EventType.ToLower() == type.ToLower());
                 
                 if (eventDetail == null) return NotFound();
            }

            return eventDetail;
        }

        // GET: api/Events (Admin - All events)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDetail>>> GetAllEvents()
        {
            return await _context.EventDetails
                .OrderByDescending(e => e.IsActive) // Active ones first
                .ThenBy(e => e.EventType)
                .ToListAsync();
        }

        // POST: api/Events (Admin - Create)
        [HttpPost]
        public async Task<ActionResult<EventDetail>> CreateEvent(EventDetail eventDetail)
        {
            eventDetail.Id = Guid.NewGuid();
            // New events are inactive by default unless logic changes
            eventDetail.IsActive = false; 

            _context.EventDetails.Add(eventDetail);
            await _context.SaveChangesAsync();

            return Ok(eventDetail); // Returning Ok to simplify frontend
        }

        // PUT: api/Events/5 (Admin - Update details)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(Guid id, EventDetail eventDetail)
        {
            if (id != eventDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(eventDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventDetailExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // PUT: api/Events/5/activate (Admin - Set Active)
        [HttpPut("{id}/activate")]
        public async Task<IActionResult> ActivateEvent(Guid id)
        {
            var targetEvent = await _context.EventDetails.FindAsync(id);
            if (targetEvent == null) return NotFound();

            // 1. Deactivate all others of this type
            var others = await _context.EventDetails
                .Where(e => e.EventType == targetEvent.EventType && e.Id != id)
                .ToListAsync();
            
            foreach (var evt in others)
            {
                evt.IsActive = false;
            }

            // 2. Activate target
            targetEvent.IsActive = true;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Events/5 (Admin - Delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            var eventDetail = await _context.EventDetails.FindAsync(id);
            if (eventDetail == null) return NotFound();

            // Prevent deleting the currently active event? 
            // Optional safety check. For now, allow it (User beware).
            
            _context.EventDetails.Remove(eventDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventDetailExists(Guid id)
        {
            return _context.EventDetails.Any(e => e.Id == id);
        }
    }
}
