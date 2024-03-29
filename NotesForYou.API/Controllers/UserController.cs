using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesForYou.API.Data;
using NotesForYou.API.Dtos;
using NotesForYou.API.Helpers;
using NotesForYou.API.Models;

namespace NotesForYou.API.Controllers {
    // [ServiceFilter (typeof (LogUserActivity))]
    [Route ("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase {
        private readonly IGenericRepository<User> _repo;
        private readonly IMapper _mapper;

        public UsersController (IGenericRepository<User> repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers () {
            var users = await _repo.GetAll ();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>> (users);

            return Ok (usersToReturn);
        }

        [HttpGet ("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser (int id) {
            var user = await _repo.Get (id);

            var userToReturn = _mapper.Map<UserForDetailedDto> (user);

            return Ok (userToReturn);
        }

        [HttpPut ("{id}")]
        public async Task<IActionResult> UpdateUser (int id, UserForUpdateDto userForUpdate) {
            if (id != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            var userFromRepo = await _repo.Get (id);

            _mapper.Map (userForUpdate, userFromRepo);

            if (await _repo.SaveAll ()) {
                return NoContent ();
            }
            throw new Exception ($"Użytkownik {id} nie został poprawnie edytowany!");
        }
    }
}