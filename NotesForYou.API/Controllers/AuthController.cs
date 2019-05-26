using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NotesForYou.API.Data;
using NotesForYou.API.Dtos;
using NotesForYou.API.Models;

namespace NotesForYou.API.Controllers {
    [AllowAnonymous]
    [Route ("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly SignInManager<User> _signInManager;

        public AuthController (UserManager<User> userManager, IConfiguration config,
            IMapper mapper, SignInManager<User> signInManager) {
            _userManager = userManager;
            _config = config;
            _mapper = mapper;
            _signInManager = signInManager;
        }

        [HttpPost ("register")]
        public async Task<IActionResult> Register (UserToRegisterDto userToRegister) {
            var userToCreate = _mapper.Map<User> (userToRegister);

            var result = await _userManager.CreateAsync (userToCreate, userToRegister.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto> (userToCreate);

            if (result.Succeeded) {
                return CreatedAtRoute ("GetUser", new { Controller = "Users", id = userToCreate.Id }, userToReturn);
            }

            return BadRequest (result.Errors);

        }

        [HttpPost ("login")]
        public async Task<IActionResult> Login (UserLoginDto userLoginDto) {

            var user = await _userManager.FindByNameAsync (userLoginDto.Username);

            var result = await _signInManager.CheckPasswordSignInAsync (user, userLoginDto.Password, false);

            if (result.Succeeded) {
                var appUser = await _userManager.Users.Include (n => n.UserNotes)
                    .FirstOrDefaultAsync (u => u.NormalizedUserName == userLoginDto.Username.ToUpper ());

                var userToReturn = _mapper.Map<UserForListDto> (appUser);

                return Ok (new {
                    token = GenerateJwtToken (appUser).Result,
                        user = userToReturn
                });
            }
            return Unauthorized ();

        }

        public async Task<string> GenerateJwtToken (User user) {
            var claims = new List<Claim> {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString ()),
                new Claim (ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync (user);

            foreach (var role in roles) {
                claims.Add (new Claim (ClaimTypes.Role, role));
            }

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

            return tokenHandler.WriteToken (token);
        }
    }
}