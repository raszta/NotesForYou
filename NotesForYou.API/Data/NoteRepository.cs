using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data {
    public class NoteRepository : INoteRepository {
        private readonly DataContext _context;
        public NoteRepository (DataContext context) {
            _context = context;

        }

        public void Update (Note entity) {
            if (entity == null) {
                throw new ArgumentNullException ("entity");
            }
            _context.Notes.Update (entity);
        }

        public async Task<IEnumerable<Note>> GetUserAllNotes (int userId) {
            var notes = await _context.Notes.Include (n => n.Author).Where (n => n.AuthorId == userId).ToListAsync ();

            return notes;
        }

        public async Task<Note> GetUserNote (int userId, int id) {
            var note = await _context.Notes.Include (n => n.Author).FirstOrDefaultAsync (n => n.AuthorId == userId && n.Id == id);

            return note;
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }

        public void Delete (Note entity) {
            if (entity == null) {
                throw new ArgumentNullException ("entity");
            }
            _context.Notes.Remove (entity);
        }
    }
}