using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NotesForYou.API.Models;
using Microsoft.EntityFrameworkCore;

namespace NotesForYou.API.Data {
    public class NoteRepository : INoteRepository, IGenericRepository<Note> {
        private readonly DataContext _context;
        public NoteRepository (DataContext context) {
            _context = context;

        }

        public void Add(Note entity)
        {
            _context.Add(entity);
        }

        public void Delete(Note entity)
        {
            _context.Remove(entity);
        }

        public async Task<Note> Get(int id)
        {
            return await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task<IEnumerable<Note>> GetAll()
        {
            return await _context.Notes.ToListAsync();
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

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}