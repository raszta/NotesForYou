using System;

namespace NotesForYou.API.Dtos
{
    public class NoteForGoldenThoughtDto
    {
        public int AuthorId { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        
    }
}