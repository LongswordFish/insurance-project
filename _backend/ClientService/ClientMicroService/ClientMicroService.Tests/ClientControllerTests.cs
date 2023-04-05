using ClientMicroService.Controllers;
using ClientMicroService.CustomException;
using ClientMicroService.Models;
using ClientMicroService.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientMicroService.Tests
{
    [TestFixture]
    public class ClientControllerTests
    {
        private Mock<IClientService> _mockClientService;
        private ClientController _clientController;

        [SetUp]
        public void Setup()
        {
            _mockClientService = new Mock<IClientService>();
            _clientController = new ClientController(_mockClientService.Object);
        }

        [Test]
        public async Task GetClientById_Returns_OkResult_With_Valid_Id()
        {
            // Arrange
            var clientId = 1;
            var client = new Client { ClientId = clientId, Email = "test@example.com", Location = "New York", ClientName = "Test Client" };
            _mockClientService.Setup(x => x.GetClientById(clientId)).ReturnsAsync(client);

            // Act
            var result = await _clientController.GetClientById(clientId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(client, okResult.Value);
        }

        //[Test]
        //public async Task GetClientById_Returns_NotFoundResult_With_Invalid_Id()
        //{
        //    // Arrange
        //    var clientId = 1;
        //    //_mockClientService.Setup(x => x.GetClientById(clientId)).Throws(new ClientServiceException());

        //    // Act
        //    var result = await _clientController.GetClientById(clientId);

        //    // Assert
        //    Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        //}

        [Test]
        public async Task GetAllClients_Returns_OkResult_With_All_Clients()
        {
            // Arrange
            var clients = new List<Client>
            {
                new Client { ClientId = 1, Email = "test1@example.com", Location = "New York", ClientName = "Test Client 1" },
                new Client { ClientId = 2, Email = "test2@example.com", Location = "Los Angeles", ClientName = "Test Client 2" },
                new Client { ClientId = 3, Email = "test3@example.com", Location = "Chicago", ClientName = "Test Client 3" },
            };
            _mockClientService.Setup(x => x.GetAllClients()).ReturnsAsync(clients);

            // Act
            var result = await _clientController.GetAllClients();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(clients, okResult.Value);
        }

        [Test]
        public async Task AddClient_Returns_CreatedAtActionResult_With_Added_Client()
        {
            // Arrange
            var client = new Client { ClientId = 1, Email = "test@example.com", Location = "New York", ClientName = "Test Client" };
            _mockClientService.Setup(x => x.AddClient(client)).ReturnsAsync(client);

            // Act
            var result = await _clientController.AddClient(client);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);
            var createdAtResult = result.Result as CreatedAtActionResult;
            Assert.AreEqual(nameof(ClientController.GetClientById), createdAtResult.ActionName);
            Assert.AreEqual(client.ClientId, createdAtResult.RouteValues["clientId"]);
            Assert.AreEqual(client, createdAtResult.Value);
        }
    }
}
