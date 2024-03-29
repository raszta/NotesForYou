using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesForYou.API.Data;
using NotesForYou.API.Dtos;
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
        [AllowAnonymous]
        public async Task<IActionResult> GetNotes () {
            var notes = await _repo.GetAll ();

            return Ok (notes);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetNote (int id) {
            var note = await _repo.Get (id);

            return Ok (note);
        }

        [HttpGet ("{userId}/mojaNotatka/{id}", Name = "GetNote")]
        public async Task<IActionResult> GetNoteFromUser (int userId, int id) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            var noteFromRepo = await _noteRepo.GetUserNote (userId, id);
            if (noteFromRepo == null) {
                return NotFound ();
            }
            var noteToReturn = _mapper.Map<NoteToReturnDto> (noteFromRepo);
            return Ok (noteToReturn);
        }

        [HttpGet ("{userId}/mojeNotatki")]
        public async Task<IActionResult> GetNotesFromUser (int userId) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            var notesFromRepo = await _noteRepo.GetUserAllNotes (userId);
            if (notesFromRepo == null) {
                return NotFound ();
            }
            var notesToReturn = _mapper.Map<IEnumerable<NoteToReturnDto>> (notesFromRepo);
            return Ok (notesToReturn);
        }

        [HttpPost ("dodaj/{userId}")]
        public async Task<IActionResult> CreateNote (int userId, NoteForCreationDto noteForCreationDto) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            if (noteForCreationDto == null) {
                return BadRequest ();
            }
            noteForCreationDto.AuthorId = userId;
            var note = _mapper.Map<Note> (noteForCreationDto);
            _repo.Add (note);

            if (await _repo.SaveAll ()) {
                var noteToReturn = _mapper.Map<NoteToReturnDto> (note);
                return CreatedAtRoute ("GetNote", new { id = note.Id }, noteToReturn);
            }

            throw new Exception ("Błąd przy zapisywaniu");
        }

        [HttpPut ("{userId}/edycja/{id}")]
        public async Task<IActionResult> UpdateNote (int userId, int id, NoteToUpdateDto noteToUpdate) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            var noteFromRepo = await _noteRepo.GetUserNote (userId, id);

            if (noteFromRepo == null) {
                return BadRequest ("Nie znaleziono notatki.");
            }

            _mapper.Map (noteToUpdate, noteFromRepo);
            _noteRepo.Update (noteFromRepo);

            if (await _noteRepo.SaveAll ()) {
                return NoContent ();
            }
            throw new Exception ($"Notatka {id} nie została poprawnie edytowana!");
        }

        [HttpDelete ("{userId}/usun/{id}")]
        public async Task<IActionResult> DeleteNote (int userId, int id) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized ();
            }

            var noteFromRepo = await _noteRepo.GetUserNote (userId, id);

            if (noteFromRepo == null) {
                return BadRequest ("Nie znaleziono notatki.");
            }

            _noteRepo.Delete (noteFromRepo);

            if (await _noteRepo.SaveAll ()) {
                return NoContent ();
            }
            throw new Exception ($"Notatka {id} nie została usunięta!");
        }
    }
}