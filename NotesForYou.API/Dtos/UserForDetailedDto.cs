using System;
using System.Collections.Generic;
using NotesForYou.API.Models;

namespace NotesForYou.API.Dtos {
    public class UserForDetailedDto {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string KnownAs { get; set; }
        public string Interests { get; set; }
        public string Introduction { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public IEnumerable<Note> UserNotes { get; set; }
    }
}