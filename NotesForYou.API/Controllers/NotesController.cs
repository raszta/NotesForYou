using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesForYou.API.Data;
using NotesForYou.API.Models;

namespace NotesForYou.API.Controllers {
    [Route ("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotesController : ControllerBase {
        private readonly IGenericRepository<Note> _repo;
        private readonly IMapper _mapper;
        private readonly INoteRepository _noteRepo;

        public NotesController (IGenericRepository<Note> repo, IMapper mapper, INoteRepository noteRepo) {
            _repo = repo;
            _mapper = mapper;
            _noteRepo = noteRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes () {
            var notes = await _repo.GetAll ();

            return Ok (notes);
        }

        [HttpGet]
        public async Task<IActionResult> GetNote (int id) {
            var note = await _repo.Get (id);

            return Ok (note);
        }

        [HttpGet ("{userId}/myNote/{id}")]
        public async Task<IActionResult> GetNoteFromUser (int userId, int id) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            var noteFromRepo = await _noteRepo.GetUserNote (userId, id);
            if (noteFromRepo == null) {
                return NotFound ();
            }

            return Ok (noteFromRepo);
        }

        [HttpGet ("{userId}/myNote")]
        public async Task<IActionResult> GetNotesFromUser (int userId) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            var notesFromRepo = await _noteRepo.GetUserAllNotes (userId);
            if (notesFromRepo == null) {
                return NotFound ();
            }

            return Ok (notesFromRepo);
        }
    }
}