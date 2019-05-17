using System.Collections.Generic;
using System.Threading.Tasks;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetUserAllNotes (int userId);
        Task<Note> GetUserNote(int userId, int id);
    }
}