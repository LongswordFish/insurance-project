using ClientMicroService.Models;

namespace ClientMicroService.Services
{
    public interface IClientService
    {
        Task<Client> GetClientById(int clientId);
        Task<IEnumerable<Client>> GetAllClients();
        Task<Client> AddClient(Client client);
        Task<Client> UpdateClient(Client client);
        Task<Client> DeleteClient(int clientId);
    }
}
