using System.Collections.Generic;
using System.Threading.Tasks;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data {
    public interface INoteRepository {
        void Delete(Note entity);
        void Update (Note entity);
        Task<bool> SaveAll ();
        Task<IEnumerable<Note>> GetUserAllNotes (int userId);
        Task<Note> GetUserNote (int userId, int id);
    }
}