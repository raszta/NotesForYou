using System.Threading.Tasks;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data {
    public interface IAuthRepository {
        Task<User> Register (User user, string password);
        Task<User> Login (string username, string password);
        Task<bool> Exists (string username);
    }
}