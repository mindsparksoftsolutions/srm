using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFormsApi.Data;
using StudentFormsApi.Models;

namespace StudentFormsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Default strict authorization
    public class CollegesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CollegesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Colleges (Public for forms)
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<College>>> GetColleges()
        {
            return await _context.Colleges.OrderBy(c => c.Name).ToListAsync();
        }

        // POST: api/Colleges (Admin only)
        [HttpPost]
        public async Task<ActionResult<College>> CreateCollege(College college)
        {
            if (await _context.Colleges.AnyAsync(c => c.Name.ToLower() == college.Name.ToLower()))
            {
                return Conflict("College with this name already exists.");
            }

            college.Id = Guid.NewGuid();
            _context.Colleges.Add(college);
            await _context.SaveChangesAsync();

            return Ok(college);
        }

        // PUT: api/Colleges/5 (Admin only)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCollege(Guid id, College college)
        {
            if (id != college.Id)
            {
                return BadRequest();
            }

            if (await _context.Colleges.AnyAsync(c => c.Name.ToLower() == college.Name.ToLower() && c.Id != id))
            {
                return Conflict("College with this name already exists.");
            }

            _context.Entry(college).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollegeExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // DELETE: api/Colleges/5 (Admin only)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollege(Guid id)
        {
            var college = await _context.Colleges.FindAsync(id);
            if (college == null) return NotFound();

            _context.Colleges.Remove(college);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CollegeExists(Guid id)
        {
            return _context.Colleges.Any(e => e.Id == id);
        }
    }
}
