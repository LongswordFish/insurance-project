using AuthenticationService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationService.Repository
{
    public partial class AuthContext: DbContext
    {
        public AuthContext()
        {

        }
        public AuthContext (DbContextOptions<AuthContext> options): base(options) { }

        public virtual DbSet<Authentication> Auths { get; set; }
    }
}
