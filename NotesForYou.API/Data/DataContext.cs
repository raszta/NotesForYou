using Microsoft.EntityFrameworkCore;
using NotesForYou.API.Models;

namespace NotesForYou.API.Data {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
    }
}