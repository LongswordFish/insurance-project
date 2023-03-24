using ClientMicroService.Models;

namespace ClientMicroService.Repositories
{
    public interface IClientRepository
    {
        Task<Client> GetClientById(int clientId);
        Task<IEnumerable<Client>> GetAllClients();
        Task<Client> AddClient(Client client);
        Task<Client> UpdateClient(Client client);
        Task<Client> DeleteClient(int clientId);
    }
}
