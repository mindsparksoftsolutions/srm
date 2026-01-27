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
    public class SchoolsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SchoolsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Schools (Public for forms)
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<School>>> GetSchools()
        {
            return await _context.Schools.OrderBy(s => s.Name).ToListAsync();
        }

        // POST: api/Schools (Admin only)
        [HttpPost]
        public async Task<ActionResult<School>> CreateSchool(School school)
        {
            if (await _context.Schools.AnyAsync(s => s.Name.ToLower() == school.Name.ToLower()))
            {
                return Conflict("School with this name already exists.");
            }

            school.Id = Guid.NewGuid();
            _context.Schools.Add(school);
            await _context.SaveChangesAsync();

            return Ok(school);
        }

        // PUT: api/Schools/5 (Admin only)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSchool(Guid id, School school)
        {
            if (id != school.Id)
            {
                return BadRequest();
            }

            if (await _context.Schools.AnyAsync(s => s.Name.ToLower() == school.Name.ToLower() && s.Id != id))
            {
                return Conflict("School with this name already exists.");
            }

            _context.Entry(school).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SchoolExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // DELETE: api/Schools/5 (Admin only)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchool(Guid id)
        {
            var school = await _context.Schools.FindAsync(id);
            if (school == null) return NotFound();

            _context.Schools.Remove(school);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SchoolExists(Guid id)
        {
            return _context.Schools.Any(e => e.Id == id);
        }
    }
}
