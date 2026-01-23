using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFormsApi.Data;
using StudentFormsApi.Models;

namespace StudentFormsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollegeStudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CollegeStudentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/CollegeStudents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollegeStudent>>> GetCollegeStudents()
        {
            return await _context.CollegeStudents.OrderByDescending(s => s.CreatedAt).ToListAsync();
        }

        // GET: api/CollegeStudents/counts
        [HttpGet("counts")]
        public async Task<ActionResult<IEnumerable<object>>> GetCollegeWiseCounts()
        {
            var counts = await _context.CollegeStudents
                .GroupBy(s => s.CollegeNameLocation)
                .Select(g => new { College = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .ToListAsync();

            return Ok(counts);
        }

        // GET: api/CollegeStudents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CollegeStudent>> GetCollegeStudent(Guid id)
        {
            var student = await _context.CollegeStudents.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // POST: api/CollegeStudents
        [HttpPost]
        public async Task<ActionResult<CollegeStudent>> PostCollegeStudent(CollegeStudent student)
        {
            student.Id = Guid.NewGuid();
            student.CreatedAt = DateTime.UtcNow;
            _context.CollegeStudents.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCollegeStudent", new { id = student.Id }, student);
        }

        // PUT: api/CollegeStudents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCollegeStudent(Guid id, CollegeStudent student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollegeStudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/CollegeStudents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollegeStudent(Guid id)
        {
            var student = await _context.CollegeStudents.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.CollegeStudents.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CollegeStudentExists(Guid id)
        {
            return _context.CollegeStudents.Any(e => e.Id == id);
        }
    }
}
