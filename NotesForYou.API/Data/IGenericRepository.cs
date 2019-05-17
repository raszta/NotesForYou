using System.Collections.Generic;
using System.Threading.Tasks;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data {
    public interface IGenericRepository<T> where T : BaseEntity {
        void Add (T entity);
        void Delete (T entity);
        Task<bool> SaveAll ();
        Task<IEnumerable<T>> GetAll ();
        Task<T> Get (int id);
    }
}