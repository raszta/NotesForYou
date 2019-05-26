using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace NotesForYou.API.Models {
    public class User : IdentityUser<int> {

        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string KnownAs { get; set; }
        public string Interests { get; set; }
        public string Introduction { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Note> UserNotes { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}