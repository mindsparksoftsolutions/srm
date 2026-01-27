using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFormsApi.Data;
using StudentFormsApi.Models;

namespace StudentFormsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.OrderByDescending(s => s.CreatedAt).ToListAsync();
        }

        // GET: api/Students/counts
        [HttpGet("counts")]
        public async Task<ActionResult<IEnumerable<object>>> GetSchoolWiseCounts()
        {
            var counts = await _context.Students
                .GroupBy(s => s.SchoolNameLocation)
                .Select(g => new { School = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .ToListAsync();

            return Ok(counts);
        }

        // GET: api/Students/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Student>> GetStudent(Guid id)
        // {
        //     var student = await _context.Students.FindAsync(id);

        //     if (student == null)
        //     {
        //         return NotFound();
        //     }

        //     return student;
        // }

        // POST: api/Students
        [HttpPost]
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            // Honeypot Check: If "Website" is filled, it's likely a bot.
            // Return Ok() (silent rejection) so the bot thinks it succeeded.
            if (!string.IsNullOrEmpty(student.Website))
            {
                return Ok(student);
            }

            student.Id = Guid.NewGuid();
            student.CreatedAt = DateTime.UtcNow;
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetStudent", new { id = student.Id }, student);
            return Ok(student);
        }

        // PUT: api/Students/5
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutStudent(Guid id, Student student)
        // {
        //     if (id != student.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(student).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!StudentExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // DELETE: api/Students/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteStudent(Guid id)
        // {
        //     var student = await _context.Students.FindAsync(id);
        //     if (student == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Students.Remove(student);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        private bool StudentExists(Guid id)
        {
            return _context.Students.Any(e => e.Id == id);
        }
    }
}
