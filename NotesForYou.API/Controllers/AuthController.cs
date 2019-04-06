using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NotesForYou.API.Data;
using NotesForYou.API.Dtos;
using NotesForYou.API.Models;

namespace NotesForYou.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly IAuthRepository _repository;
        private readonly IConfiguration _config;

        public AuthController (IAuthRepository repository, IConfiguration config) {
            _config = config;
            _repository = repository;
        }

        [HttpPost ("register")]
        public async Task<IActionResult> Register (UserToRegisterDto userToRegister) {

            userToRegister.Username = userToRegister.Username.ToLower ();

            if (await _repository.Exists (userToRegister.Username))
                return BadRequest ("Username already taken!");

            var userToCreate = new User {
                Username = userToRegister.Username
            };

            var userCreated = _repository.Register (userToCreate, userToRegister.Password);

            return StatusCode (201);

        }

        [HttpPost ("login")]
        public async Task<IActionResult> Login (UserLoginDto userLoginDto) {

            var userFromRepo = await _repository.Login (userLoginDto.Username.ToLower (), userLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new [] {
                new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString ()),
                new Claim (ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey (Encoding.UTF8
                .GetBytes (_config.GetSection ("AppSettings:Token").Value));

            var creds = new SigningCredentials (key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (claims),
                Expires = DateTime.Now.AddDays (1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler ();

            var token = tokenHandler.CreateToken (tokenDescriptor);

            return Ok (new {
                token = tokenHandler.WriteToken (token)
            });
        }
    }
}