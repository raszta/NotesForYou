using System;

namespace NotesForYou.API.Dtos {
    public class NoteToReturnDto {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string AuthorKnownAs { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public bool GoldenThought { get; set; }

    }
}