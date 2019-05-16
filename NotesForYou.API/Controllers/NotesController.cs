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
        private readonly IGenRepository<Note> _repo;
        private readonly IMapper _mapper;

        public NotesController (IGenRepository<Note> repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes () {
            var notes = await _repo.GetAll ();

            return Ok (notes);
        }
    }
}