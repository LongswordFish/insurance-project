using ClientMicroService.CustomException;
using ClientMicroService.Models;
using ClientMicroService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet("{clientId}")]
        public async Task<ActionResult<Client>> GetClientById(int clientId)
        {
            try
            {
                var client = await _clientService.GetClientById(clientId);
                return Ok(client);
            }
            catch (ClientServiceException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
        {
            var clients = await _clientService.GetAllClients();
            return Ok(clients);
        }

        [HttpPost]
        public async Task<ActionResult<Client>> AddClient(Client client)
        {
            try
            {
                var existingClient = await _clientService.GetClientById(client.ClientId);
                if (existingClient != null)
                {
                    return Conflict($"A client with ID {client.ClientId} already exists.");
                }

                if (string.IsNullOrEmpty(client.Email) || string.IsNullOrEmpty(client.Location) || string.IsNullOrEmpty(client.ClientName))
                {
                    return BadRequest("Client data is invalid");
                }

                var addedClient = await _clientService.AddClient(client);
                return CreatedAtAction(nameof(GetClientById), new { clientId = addedClient.ClientId }, addedClient);
            }
            catch (ClientServiceException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{clientId}")]
        public async Task<ActionResult<Client>> UpdateClient(int clientId, Client client)
        {
            try
            {
                if (clientId != client.ClientId)
                {
                    return BadRequest();
                }
                var updatedClient = await _clientService.UpdateClient(client);
                return Ok(updatedClient);
            }
            catch (ClientServiceException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{clientId}")]
        public async Task<ActionResult<Client>> DeleteClient(int clientId)
        {
            try
            {
                var deletedClient = await _clientService.DeleteClient(clientId);
                return Ok(deletedClient);
            }
            catch (ClientServiceException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

