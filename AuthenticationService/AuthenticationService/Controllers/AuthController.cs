using AuthenticationService.Models;
using AuthenticationService.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly AuthContext _authContext;

        public AuthController(IAuthRepository authRepository, AuthContext context)
        {
            _authRepository = authRepository;

            _authContext = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Authentication registration)
        {
            var dbdata = _authContext.Auths.SingleOrDefault(u => u.Email == registration.Email);
            Regex regex = new Regex(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
            if (dbdata != null)
            {
                return BadRequest("User Already Exists");
            }
            else if (!regex.IsMatch(registration.Email))
            {
                return BadRequest("Email is Invalid");
            }
            else if(registration.Password.Length<=6 || registration.Password.Length>=12){
                return BadRequest("Password should have length between 6 & 12");
            }
            else if(registration.Role != "company" && registration.Role != "client")
            {
                return BadRequest("Role should be either a 'company' or a 'client'");
            }
            else
            {
                _authRepository.Register(registration);
                return Ok();
            }
           
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Authentication authData)
        {
            var dbdata = await _authContext.Auths.SingleOrDefaultAsync(u=> u.Email == authData.Email);
      
            if (dbdata == null)
            {
                return Unauthorized("User Not Found");
            }
            var isvaild = dbdata.Password == authData.Password;
            var isvalidrole = dbdata.Role == authData.Role;
            if (!isvaild)
            {
                return Unauthorized("Could not Authenticate User");
            }
            if (!isvalidrole)
            {
                return Unauthorized("Could not Authenticate User(Role Mismatch) ");
            }
            var token = _authRepository.BuildToken(authData);

            return Ok(token);
        }


        [HttpDelete("delete/{UserId}")]
        public IActionResult Delete(int UserId)
        {
            _authRepository.Delete(UserId);
            return Ok();
        }

        [HttpPut("update/{UserId}")]
        public async Task<IActionResult> Update(Authentication auth)
        {

            _authRepository.Update(auth);
            return NoContent();
        }

        


       
    }
}
