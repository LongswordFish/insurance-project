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
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace CompanyServiceTesting.Tests
{
    public class PutEndpointsTest : IPutEndpointsTest
    {
        private readonly CompanyContext _dbContext;
        private readonly CompaniesController _controller;
        private readonly HttpClient _httpClient;
        private readonly ITestOutputHelper _output;

        public PutEndpointsTest(ITestOutputHelper output)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CompanyContext>();
            _dbContext = new CompanyContext(optionsBuilder.Options);
            _controller = new CompaniesController(_dbContext);
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("http://localhost:9091/");
            _output = output;
        }

        [Fact]
        public async Task PutGivenWrongCRUD()
        {
            Company test_comp = new Company
            {
                Name = "XUNIT Put",
                Email = "xunit_put@gmail.com",
                Address = "Test Address",
                IsApproved = false
            };

            // Ensure that given the wrong endpoint, exception is caught
            var json_content = JsonConvert.SerializeObject(test_comp);
            var buffer = System.Text.Encoding.UTF8.GetBytes(json_content);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var http_response = await _httpClient.PutAsync("api/company/put", byteContent);
            Assert.Equal(HttpStatusCode.NotFound, http_response.StatusCode);
        }

        [Fact]
        public async Task ApproveShouldSucceed()
        {
            // Ensure that company can be approved
            Company test_comp = new Company
            {
                Name = "XUNIT Approve",
                Email = "xunit_approve@gmail.com",
                Address = "Test Address",
                IsApproved = false
            };

            // Add to database
            var add_response = await _controller.PostCompany(test_comp);
            Assert.IsType<CreatedAtActionResult>(add_response.Result);

            // Find test object
            var http_response = await _httpClient.GetAsync("api/company");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Company added_comp = http_companies.FirstOrDefault(c => c.Name == "XUNIT Approve");

            // Update
            var controller_response = await _controller.ApproveCompany(added_comp.CompanyId);
            Assert.IsType<OkResult>(controller_response); 

            // Delete test object 
            var delete_response = await _controller.DeleteCompany(added_comp.CompanyId);
            Assert.IsType<OkResult>(delete_response);

            // Ensure added element is no longer in the database 
            http_response = await _httpClient.GetAsync("api/company");
            http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            bool found_company = http_companies.Any(c => c.CompanyId == added_comp.CompanyId);
            Assert.False(found_company);
        }

        [Fact]
        public async Task DisapproveShouldSucceed()
        {
            // Ensure that company can be disapproved
            Company test_comp = new Company
            {
                Name = "XUNIT Disapprove",
                Email = "xunit_disapprove@gmail.com",
                Address = "Test Address",
                IsApproved = true
            };

            // Add to database
            var add_response = await _controller.PostCompany(test_comp);
            Assert.IsType<CreatedAtActionResult>(add_response.Result);

            // Find test object
            var http_response = await _httpClient.GetAsync("api/company");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Company added_comp = http_companies.FirstOrDefault(c => c.Name == "XUNIT Disapprove");

            // Update
            var controller_response = await _controller.DisapproveCompany(added_comp.CompanyId);
            Assert.IsType<OkResult>(controller_response);

            // Delete test object 
            var delete_response = await _controller.DeleteCompany(added_comp.CompanyId);
            Assert.IsType<OkResult>(delete_response);

            // Ensure added element is no longer in the database 
            http_response = await _httpClient.GetAsync("api/company");
            http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            bool found_company = http_companies.Any(c => c.CompanyId == added_comp.CompanyId);
            Assert.False(found_company);
        }

        [Fact]
        public async Task UpdateShouldFail()
        {
            // Ensure that given bad entries, exception is caught 
            Company test_comp = new Company
            {
                Name = "XUNIT Bad Update",
                Email = "xunit_bad_update@gmail.com",
                Address = "Test Address",
                IsApproved = false
            };
            Bad_Put_Company bad_test = new Bad_Put_Company
            {
                Name = "XUNIT Bad Update",
                Email = "xunit_bad_update@gmail.com",
                Address = "Test Address",
                IsApproved = "t"
            };

            // Add to database
            var add_response = await _controller.PostCompany(test_comp);
            Assert.IsType<CreatedAtActionResult>(add_response.Result);

            // Find test object
            var http_response = await _httpClient.GetAsync("api/company");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Company added_comp = http_companies.FirstOrDefault(c => c.Name == "XUNIT Bad Update");
            bad_test.CompanyId = added_comp.CompanyId;

            // Update
            var json_content = JsonConvert.SerializeObject(bad_test);
            var buffer = System.Text.Encoding.UTF8.GetBytes(json_content);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            http_response = await _httpClient.PutAsync($"api/company/update/{added_comp.CompanyId}", byteContent);
            Assert.Equal(HttpStatusCode.BadRequest, http_response.StatusCode);

            // Delete test object 
            var delete_response = await _controller.DeleteCompany(added_comp.CompanyId);
            Assert.IsType<OkResult>(delete_response);

            // Ensure added element is no longer in the database 
            http_response = await _httpClient.GetAsync("api/company");
            http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            bool found_company = http_companies.Any(c => c.CompanyId == added_comp.CompanyId);
            Assert.False(found_company);
        }

        [Fact]
        public async Task UpdateShouldSucceed()
        {
            // Ensure that company can be updated 
            Company test_comp = new Company
            {
                Name = "XUNIT Good Update",
                Email = "xunit_good_update@gmail.com",
                Address = "Test Address",
                IsApproved = false
            };

            // Add to database
            var add_response = await _controller.PostCompany(test_comp);
            Assert.IsType<CreatedAtActionResult>(add_response.Result);

            // Find test object
            var http_response = await _httpClient.GetAsync("api/company");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Company added_comp = http_companies.FirstOrDefault(c => c.Name == "XUNIT Good Update");

            // Update
            test_comp.Address = "A newly updated address"; 
            var controller_response = await _controller.PutCompany(added_comp.CompanyId, test_comp);
            Assert.IsType<OkResult>(controller_response);

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

    public class Bad_Put_Company
    {
        public int CompanyId { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Address { get; set; } = null!;

        public byte[]? Logo { get; set; }

        public string? ContactDetails { get; set; }

        public string IsApproved { get; set; } = null;
    }
}
