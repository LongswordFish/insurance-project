namespace AuthenticationService.Models
{
    public class Tokens
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }

        public int userid { get; set; }
    }
}
