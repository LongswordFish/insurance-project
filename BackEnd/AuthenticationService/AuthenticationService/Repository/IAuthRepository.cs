using AuthenticationService.Models;

namespace AuthenticationService.Repository
{
    public interface IAuthRepository
    {

        void Register(Authentication auth);

        void Delete(int UserId);

        void Update(Authentication auth);

        Tokens BuildToken(Authentication auth);
    }
}
