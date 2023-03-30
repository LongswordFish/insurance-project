using AuthenticationService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Repository
{
    public class AuthRepository: IAuthRepository
    {
        private readonly AuthContext _context;
        private IConfiguration _config;
        public AuthRepository(AuthContext Context, IConfiguration config)
        {
            _context = Context;
            _config = config;
        }

        public void Delete(int UserId)
        {
            try
            {
                Authentication auth = this._context.Auths.Find(UserId);
                if (auth != null)
                {
                    _context.Auths.Remove(auth);
                    this._context.SaveChanges();


                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Update(Authentication auth)
        {
            try
            {
                this._context.Auths.Update(auth);
                _context.Entry(auth).State = EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    public void Register(Authentication auth)
        {
            try
            {
                _context.Add(auth);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Tokens BuildToken(Authentication auth)
        {

            var signinkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CgiInsuranceSecretKey"));
            var signingcredentials = new SigningCredentials(signinkey, SecurityAlgorithms.HmacSha256);
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new[]
                {
                    new Claim(ClaimTypes.Email, auth.Email),
                    new Claim(ClaimTypes.Role, auth.Role)
                };

            var tokenDescripter = new SecurityTokenDescriptor
            {
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"],
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(5),
                SigningCredentials = signingcredentials
            };


            var token = tokenHandler.CreateToken(tokenDescripter);
            var dbdata = _context.Auths.SingleOrDefault(u => u.Email == auth.Email);

            return new Tokens { Token = tokenHandler.WriteToken(token) , userid=dbdata.UserId};


        }

    }
}
