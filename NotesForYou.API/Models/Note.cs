using System;

namespace NotesForYou.API.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public User Author { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public bool GoldenThought { get; set; }
    }
}