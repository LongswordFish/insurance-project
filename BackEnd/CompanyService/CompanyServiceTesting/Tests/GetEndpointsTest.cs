﻿using CompanyService.Repository;
using CompanyServiceTesting.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Xunit.Abstractions;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Xunit.Extensions.Ordering;
using System.Net.Http.Headers;

namespace CompanyServiceTesting.Tests
{
    [CollectionDefinition("C1"), Order(1)]
    public class GetEndpointsTest : IGetEndpointsTest
    {
        private readonly CompanyContext _dbContext;
        private readonly CompaniesController _controller;
        private readonly HttpClient _httpClient;
        private readonly ITestOutputHelper _output;
        private readonly string _adminToken;
        private readonly string _companyToken;
        private readonly string _clientToken;

        public GetEndpointsTest(ITestOutputHelper output)
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
        public async Task GetAllShouldSucceed()
        {
            // Ensure that controller get method returns expected result
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _adminToken);

            var http_response = await _httpClient.GetAsync("api/company");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Assert.Equal(HttpStatusCode.OK, http_response.StatusCode);
            Assert.NotEmpty(http_companies);

            var controller_response = await _controller.GetCompanies();
            var controller_companies = controller_response.Value;
            Assert.NotEmpty(controller_companies);


            var obj1Str = JsonConvert.SerializeObject(http_companies);
            var obj2Str = JsonConvert.SerializeObject(controller_companies);
            Assert.Equal(obj1Str, obj2Str);
        }

        [Fact, Order(1)]
        public async Task GetGivenWrongCRUD()
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _adminToken);

            // Ensure that given the wrong endpoint, exception is caught
            var http_response = await _httpClient.GetAsync("api/company/get");
            Assert.Equal(HttpStatusCode.NotFound, http_response.StatusCode);
        }

        [Fact, Order(1)]
        public async Task GetMaxShouldFail()
        {
            // Ensure that when getting a specified number of results, exceptions are handled
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _adminToken);
            var controller_response = await _controller.GetCompanies(-1);
            Assert.IsType<BadRequestObjectResult>(controller_response.Result); 
        }

        [Fact, Order(2)]
        public async Task GetMaxShouldSucceed()
        {
            // Ensure that when getting a specified number of results, it is successful 
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _adminToken);
            int num_companies = 20;
            var http_response = await _httpClient.GetAsync($"api/company/view/{num_companies}");
            var http_companies = await http_response.Content.ReadAsAsync<IEnumerable<Company>>();
            Assert.Equal(HttpStatusCode.OK, http_response.StatusCode);
            Assert.NotEmpty(http_companies);

            var controller_response = await _controller.GetCompanies(num_companies);
            var controller_companies = controller_response.Value;
            Assert.NotEmpty(controller_companies);


            var obj1Str = JsonConvert.SerializeObject(http_companies);
            var obj2Str = JsonConvert.SerializeObject(controller_companies);
            Assert.Equal(obj1Str, obj2Str);
        }

        [Fact, Order(1)]
        public async Task GetOneIdShouldFail()
        {
            // Ensure that given a wrong ID, exception is caught
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _adminToken);
            var controller_response = await _controller.GetCompany(-100);
            Assert.IsType<NotFoundObjectResult>(controller_response.Result); 
        }

        [Fact, Order(2)]
        public async Task GetOneIdShouldSucceed()
        {
            // Ensure that for a company that exists, get is successful 
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _adminToken);
            var http_all_response = await _httpClient.GetAsync("api/company");
            var http_all_companies = await http_all_response.Content.ReadAsAsync<List<Company>>();
            Assert.Equal(HttpStatusCode.OK, http_all_response.StatusCode);
            Assert.NotEmpty(http_all_companies);

            var test_id = http_all_companies[0].CompanyId;
            var controller_response = await _controller.GetCompany(test_id);
            var controller_company = controller_response.Value;

            var http_response = await _httpClient.GetAsync($"api/company/id/{test_id}");
            var http_company = http_response.Content.ReadAsAsync<Company>();

            var obj1Str = JsonConvert.SerializeObject(http_company.Result);
            var obj2Str = JsonConvert.SerializeObject(controller_company);
            Assert.Equal(obj1Str, obj2Str);
        }

        [Fact, Order(3)]
        public async Task GetNameShouldFail()
        {
            // Ensure that given a name that doesn't exist, exception is caught
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _clientToken);
            var controller_response = await _controller.GetCompany("XUnitTESTING");
            Assert.Equal(null, controller_response.Result);
        }

        [Fact, Order(3)]
        public async Task GetNameShouldSucceed()
        {
            // Ensure that for a company that exists, get is successful 
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _clientToken);
            var http_all_response = await _httpClient.GetAsync("api/company");
            var http_all_companies = await http_all_response.Content.ReadAsAsync<List<Company>>();
            Assert.Equal(HttpStatusCode.OK, http_all_response.StatusCode);
            Assert.NotEmpty(http_all_companies);

            var test_name = http_all_companies[0].Name;
            var controller_response = await _controller.GetCompany(test_name);
            var controller_company = controller_response.Value;

            var http_response = await _httpClient.GetAsync($"api/company/name/{test_name}");
            var http_company = http_response.Content.ReadAsAsync<List<Company>>();
            
            var obj1Str = JsonConvert.SerializeObject(http_company.Result);
            var obj2Str = JsonConvert.SerializeObject(controller_company);
            Assert.Equal(obj1Str, obj2Str);
        }
    }
}
