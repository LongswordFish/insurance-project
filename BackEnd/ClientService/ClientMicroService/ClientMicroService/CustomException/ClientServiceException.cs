namespace ClientMicroService.CustomException
{
    public class ClientServiceException : Exception
    {
        public ClientServiceException(string message) : base(message) { }
    }
}
