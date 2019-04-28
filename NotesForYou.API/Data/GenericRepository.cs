using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NotesForYou.API.Models;
using Microsoft.EntityFrameworkCore;

namespace NotesForYou.API.Data {
    public class GenericRepository : IGenericRepository {
        private readonly DataContext _context;
        public GenericRepository (DataContext context) {
            _context = context;

        }
        public void Add<T> (T entity) where T : class {
            _context.Add (entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove (entity);
        }

        public async Task<IEnumerable<User>> GetUsers () {
            var users = await _context.Users.ToListAsync ();

            return users;
        }

        public async Task<User> GetUser (int id) {
            var user = await _context.Users.FirstOrDefaultAsync (u => u.Id == id);

            return user;
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }
    }
}