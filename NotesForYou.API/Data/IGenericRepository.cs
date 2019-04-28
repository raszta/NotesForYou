using System.Collections.Generic;
using System.Threading.Tasks;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data
{
    public interface IGenericRepository
    {
         void Add<T> (T entity) where T: class;
         void Delete<T> (T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}