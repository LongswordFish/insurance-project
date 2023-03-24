using ClientMicroService.CustomException;
using ClientMicroService.Models;
using ClientMicroService.Repositories;

namespace ClientMicroService.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;

        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public async Task<Client> GetClientById(int clientId)
        {
            var client = await _clientRepository.GetClientById(clientId);
            if (client == null)
            {
                throw new ClientServiceException($"Client with ID {clientId} not found");
            }
            return client;
        }

        public async Task<IEnumerable<Client>> GetAllClients()
        {
            return await _clientRepository.GetAllClients();
        }

        public async Task<Client> AddClient(Client client)
        {
            if (string.IsNullOrEmpty(client.Email) || string.IsNullOrEmpty(client.Location) || string.IsNullOrEmpty(client.ClientName))
            {
                throw new ClientServiceException("Client data is invalid");
            }

            return await _clientRepository.AddClient(client);
        }

        public async Task<Client> UpdateClient(Client client)
        {
            if (string.IsNullOrEmpty(client.Email) || string.IsNullOrEmpty(client.Location) || string.IsNullOrEmpty(client.ClientName))
            {
                throw new ClientServiceException("Client data is invalid");
            }

            return await _clientRepository.UpdateClient(client);
        }

        public async Task<Client> DeleteClient(int clientId)
        {
            var client = await _clientRepository.DeleteClient(clientId);
            if (client == null)
            {
                throw new ClientServiceException($"Client with ID {clientId} not found");
            }
            return client;
        }

    }
 }
