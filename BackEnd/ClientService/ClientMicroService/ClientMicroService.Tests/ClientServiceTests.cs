using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Moq;
using ClientMicroService.Models;
using ClientMicroService.Services;
using ClientMicroService.Repositories;
using ClientMicroService.CustomException;

namespace ClientMicroService.Tests
{
    [TestFixture]
    public class ClientServiceTests
    {
        private Mock<IClientRepository> _mockClientRepository;
        private IClientService _clientService;

        [SetUp]
        public void Setup()
        {
            _mockClientRepository = new Mock<IClientRepository>();
            _clientService = new ClientService(_mockClientRepository.Object);
        }

        [Test]
        public async Task GetClientById_Returns_Client_With_Valid_Id()
        {
            // Arrange
            var clientId = 2;
            var client = new Client { ClientId = clientId, Email = "fghty@gmail.com", Location = "BC", ClientName = "Mark" };
            _mockClientRepository.Setup(x => x.GetClientById(clientId)).ReturnsAsync(client);

            // Act
            var result = await _clientService.GetClientById(clientId);

            // Assert
            Assert.AreEqual(client, result);
        }

        [Test]
        public void GetClientById_Throws_ClientServiceException_With_Invalid_Id()
        {
            // Arrange
            var clientId = 2;
            _mockClientRepository.Setup(x => x.GetClientById(clientId)).ReturnsAsync((Client)null);

            // Act & Assert
            Assert.ThrowsAsync<ClientServiceException>(() => _clientService.GetClientById(clientId));
        }

        [Test]
        public async Task GetAllClients_Returns_All_Clients()
        {
            // Arrange
            var clients = new List<Client>
            {
                new Client { ClientId = 2, Email = "fghty@gmail.com", Location = "BC", ClientName = "Mark" },
                new Client { ClientId = 3, Email = "cgi@gmail.com", Location = "Edmonton", ClientName = "Rakesh" },
            };
            _mockClientRepository.Setup(x => x.GetAllClients()).ReturnsAsync(clients);

            // Act
            var result = await _clientService.GetAllClients();

            // Assert
            Assert.AreEqual(clients, result);
        }

        [Test]
        public void AddClient_Throws_ClientServiceException_With_Invalid_Client()
        {
            // Arrange
            var invalidClient = new Client { ClientId = 2, Email = null, Location = "New York", ClientName = "Test Client" };

            // Act & Assert
            Assert.ThrowsAsync<ClientServiceException>(() => _clientService.AddClient(invalidClient));
        }

        [Test]
        public async Task DeleteClient_Returns_Deleted_Client_With_Valid_Id()
        {
            // Arrange
            var clientId = 2;
            var client = new Client { ClientId = clientId, Email = "fghty@gmail.com", Location = "BC", ClientName = "Mark" };
            _mockClientRepository.Setup(x => x.DeleteClient(clientId)).ReturnsAsync(client);

            // Act
            var result = await _clientService.DeleteClient(clientId);

            // Assert
            Assert.AreEqual(client, result);
        }
    }
}
