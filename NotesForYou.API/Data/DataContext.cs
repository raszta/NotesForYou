using Microsoft.EntityFrameworkCore;

namespace NotesForYou.API.Data {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }
    }
}