using System;

namespace NotesForYou.API.Dtos {
    public class UserToRegisterDto {
        public UserToRegisterDto () {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
        public string Username { get; set; }

        public string Password { get; set; }

        public string Gender { get; set; }

        public string KnownAs { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}