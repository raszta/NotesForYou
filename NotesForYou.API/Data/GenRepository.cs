// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Microsoft.EntityFrameworkCore;

// namespace NotesForYou.API.Data {
//     public class GenRepository<T> : IGenRepository<T> where T : class {
//         private readonly DataContext _context;
//         // private readonly DbSet _table;

//         public GenRepository (DataContext context) {
//             _context = context;
//             // _table = table.Set(T);
//         }

//         public void Add (T entity) {
//             _context.Add (entity);
//         }

//         public void Delete (T entity) {
//             _context.Remove (entity);
//         }

//         public async Task<T> Get (int id) {
//             // return await _context.Users.FirstOrDefaultAsync( u => u.Id == id);
//         }

//         public async Task<IEnumerable<T>> GetAll () {
//             throw new System.NotImplementedException ();
//         }

//         public async Task<bool> SaveAll () {
//             throw new System.NotImplementedException ();
//         }
//     }
// }