using System.Collections.Generic;
using System.Threading.Tasks;

namespace NotesForYou.API.Data
{
    public interface IGenRepository<T> where T: class
    {
         void Add (T entity);
         void Delete(T entity);
         Task<bool> SaveAll();
         Task<IEnumerable<T>> GetAll();
         Task<T> Get(int id);

    }
}