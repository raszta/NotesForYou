using System;
namespace NotesForYou.API.Dtos {
    public class NoteForCreationDto {
        public NoteForCreationDto() {
            DateCreated = DateTime.Now;
        }
        public int AuthorId { get; set; }

        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public bool GoldenThought { get; set; }

    }
}