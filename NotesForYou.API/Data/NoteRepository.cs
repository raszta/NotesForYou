using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NotesForYou.API.Models;
using Microsoft.EntityFrameworkCore;

namespace NotesForYou.API.Data {
    public class NoteRepository : INoteRepository {
        private readonly DataContext _context;
        public NoteRepository (DataContext context) {
            _context = context;

        }
        public void Add<T> (T entity) where T : class {
            _context.Add (entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove (entity);
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }

        public async Task<IEnumerable<Note>> GetUserAllNotes(int userId)
        {
            var notes =await _context.Notes.Where( n => n.AuthorId == userId).ToListAsync();

            return notes;
        }

        public async Task<Note> GetUserNote(int userId, int id)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.AuthorId == userId && n.Id == id);

            return note;
        }
    }
}