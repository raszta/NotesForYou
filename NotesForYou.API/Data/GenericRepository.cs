using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data {
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity {
        private readonly DataContext _context;
        private readonly DbSet<T> entities;

        public GenericRepository (DataContext context) {
            _context = context;
            entities = _context.Set<T> ();
        }

        public void Add (T entity) {
            if (entity == null) {
                throw new ArgumentNullException ("entity");
            }
            _context.Add (entity);
        }

        public void Delete (T entity) {
            if (entity == null) {
                throw new ArgumentNullException ("entity");
            }
            _context.Remove (entity);
        }

        public async Task<T> Get (int id) {
            return await entities.FirstOrDefaultAsync (e => e.Id == id);
        }

        public async Task<IEnumerable<T>> GetAll () {
            return await entities.ToListAsync ();
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }
    }
}