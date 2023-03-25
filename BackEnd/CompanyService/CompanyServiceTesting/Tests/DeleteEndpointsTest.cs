using CompanyServiceTesting.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit.Abstractions;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Xunit.Extensions.Ordering;
using Xunit;

namespace CompanyServiceTesting.Tests
{
    [CollectionDefinition("C3"), Order(3)]
    public class DeleteEndpointsTest : IDeleteEndpointsTest
    {
        private readonly CompanyContext _dbContext;
        private readonly CompaniesController _controller;
        private readonly HttpClient _httpClient;
        private readonly ITestOutputHelper _output;

        public DeleteEndpointsTest(ITestOutputHelper output)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CompanyContext>();
            _dbContext = new CompanyContext(optionsBuilder.Options);
            _controller = new CompaniesController(_dbContext);
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("http://localhost:9091/");
            _output = output;
        }

        [Fact, Order(1)]
        public async Task DeleteGivenWrongCRUD()
        {
            // Ensure that given the wrong endpoint, exception is caught
            var http_response = await _httpClient.DeleteAsync("api/company/get");
            Assert.Equal(HttpStatusCode.NotFound, http_response.StatusCode);
        }

        [Fact, Order(1)]
        public async Task DeleteShouldFail()
        {
            // Ensure that given a bad ID, exception is caught
            var controller_response = await _controller.DeleteCompany(-100);
            Assert.IsType<NotFoundObjectResult>(controller_response);
        }

        [Fact, Order(2)]
        public async Task DeleteShouldSucceed()
        {
            // Adding and deleting a test item should return successful 

            // Add test object
            Company test_comp = new Company
            {
                Name = "XUNIT Delete",
                Email = "xunit_delete@gmail.com",
                Address = "Test Address",
                IsApproved = false
            };
            var add_response = await _controller.PostCompany(test_comp);
            Assert.IsType<CreatedAtActionResult>(add_response.Result);

            // Find test object
            var http_response = await _httpClient.GetAsync("api/company");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Company added_comp = http_companies.FirstOrDefault(c => c.Name == "XUNIT Delete");

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
}
