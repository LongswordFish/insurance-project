using CompanyServiceTesting.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Xunit.Abstractions;
using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Xunit.Extensions.Ordering;

namespace CompanyServiceTesting.Tests
{
    [CollectionDefinition("C2"), Order(2)]
    public class PostEndpointsTest : IPostEndpointsTest
    {
        private readonly CompanyContext _dbContext;
        private readonly CompaniesController _controller;
        private readonly HttpClient _httpClient;
        private readonly ITestOutputHelper _output;
        private readonly string _adminToken;
        private readonly string _companyToken;
        private readonly string _clientToken;

        private readonly Company _test_comp = new Company
        {
            Name = "XUNIT Add",
            Email = "xunit_add@gmail.com",
            Description = "Test Description",
            Address = "Test Address",
            City = "Edmonton",
            State = "Alberta",
            Country = "Canada",
            PostalCode = "A1A2B2",
            IsApproved = false,
            AdminViewed = false,
            DateRegistered = DateTime.Now
        };

        private readonly Bad_Post_Company _bad_test = new Bad_Post_Company
        {
            CompanyId = "bad_test",
            Name = "XUNIT Bad Add",
            Email = "xunit_bad_add@gmail.com",
            Description = "Test Description",
            Address = "Test Address",
            City = "Edmonton",
            State = "Alberta",
            Country = "Canada",
            PostalCode = "A1A2B2",
            IsApproved = false,
            AdminViewed = false,
            DateRegistered = DateTime.Now
        }; 

        public PostEndpointsTest(ITestOutputHelper output)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CompanyContext>();
            _dbContext = new CompanyContext(optionsBuilder.Options);
            _controller = new CompaniesController(_dbContext);
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("http://localhost:9091/");
            _output = output;

            // Grab tokens 
            _adminToken = GlobalTokens.adminToken;
            _clientToken = GlobalTokens.clientToken;
            _companyToken = GlobalTokens.companyToken;
        }

        [Fact, Order(1)]
        public async Task PostGivenWrongCRUD()
        {
            // Ensure that given the wrong endpoint, exception is caught
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _companyToken);
            var json_content = JsonConvert.SerializeObject(_test_comp);
            var buffer = System.Text.Encoding.UTF8.GetBytes(json_content);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var http_response = await _httpClient.PostAsync("api/company/get", byteContent);
            Assert.Equal(HttpStatusCode.NotFound, http_response.StatusCode);
        }

        [Fact, Order(1)]
        public async Task PostShouldFail()
        {
            // Ensure that given bad data entries, exception is caught
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _companyToken);
            var json_content = JsonConvert.SerializeObject(_bad_test);
            var buffer = System.Text.Encoding.UTF8.GetBytes(json_content);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var http_response = await _httpClient.PostAsync("api/company/add/", byteContent);
            Assert.Equal(HttpStatusCode.BadRequest, http_response.StatusCode);
        }

        [Fact, Order(2)]
        public async Task PostShouldSucceed()
        {
            // Ensure that a fake data is successfully added and deleted
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _companyToken);
            var add_response = await _controller.PostCompany(_test_comp);
            Assert.IsType<CreatedAtActionResult>(add_response.Result);

            // Find test object
            var http_response = await _httpClient.GetAsync("api/company");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Company added_comp = http_companies.FirstOrDefault(c => c.Name == "XUNIT Add");

            // Delete test object 
            var delete_response = await _controller.DeleteCompany(added_comp.CompanyId);
            Assert.IsType<OkResult>(delete_response);

            // Ensure added element is no longer in the database 
            http_response = await _httpClient.GetAsync("api/company");
            http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            bool found_company = http_companies.Any(c => c.CompanyId == added_comp.CompanyId);
            Assert.False(found_company);
        }
    }


    public class Bad_Post_Company
    {
        public string CompanyId { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Description { get; set; }

        public string Address { get; set; } = null!;

        public string City { get; set; } = null!;

        public string State { get; set; } = null!;

        public string Country { get; set; } = null!;

        public string PostalCode { get; set; } = null!;

        public byte[]? Logo { get; set; }

        public string? ContactDetails { get; set; }

        public bool IsApproved { get; set; } = false;

        public bool AdminViewed { get; set; } = false;

        public DateTime? DateRegistered { get; set; }

        public DateTime? DateApproved { get; set; }
    }
}
