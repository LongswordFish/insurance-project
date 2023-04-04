using AuthenticationService.Controllers;
using AuthenticationService.Models;
using AuthenticationService.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace AuthenticationServiceTest
{
    public class Tests
    {
        private AuthController _authController;
        private AuthContext _authContext;
        private IConfiguration _configuration;
        [SetUp]
        public void Setup()
        {
            var authRepository = Mock.Of<IAuthRepository>();
            var authContext = Mock.Of<AuthContext>();
            _authController = new AuthController(authRepository, authContext);
        }

        [Test]
        public void Register_Success()
        {
            var registration = new Authentication
            {
                Email = "test1@gmail.com",
                Password = "password1",
                Role = "client"
            };

            var result = _authController.Register(registration);

            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public void Register_EmailInvalid()
        {
            var registration = new Authentication
            {
                Email = "client@",
                Password = "password1",
                Role = "client"
            };

            var result = _authController.Register(registration);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;
            Assert.AreEqual("Email is Invalid", badRequestResult.Value);
        }

        [Test]
        public void Register_EmptyNotSuccess()
        {
            var registration = new Authentication
            {
                Email = "",
                Password = "password1",
                Role = "client"
            };

            var result = _authController.Register(registration);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;
            Assert.AreEqual("Registration Unsuccesfull", badRequestResult.Value);
        }

        [Test]
        public void Register_PasswordInvalid()
        {
            var registration = new Authentication
            {
                Email = "client@gmail.com",
                Password = "pass",
                Role = "client"
            };

            var result = _authController.Register(registration);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;
            Assert.AreEqual("Password should have length between 6 & 12", badRequestResult.Value);
        }

        [Test]
        public void Register_RoleInvalid()
        {
            var registration = new Authentication
            {
                Email = "client@gmail.com",
                Password = "password1",
                Role = "admin"
            };

            var result = _authController.Register(registration);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;
            Assert.AreEqual("Role should be either a 'company' or a 'client'", badRequestResult.Value);
        }


        [Test]
        public void Delete_Success()
        {
            int UserId = 1;
            var result = _authController.Delete(UserId);
            Assert.IsInstanceOf<OkResult>(result);
            
        }

        [Test]
        public void Update_Success()
        {
            var update = new Authentication
            {
                UserId = 1,
                Email = "client@gmail.com",
                Password = "password1",
                Role = "client"
            };

            var result = _authController.Update(update);

            Assert.NotNull(result);
            Assert.IsInstanceOf<Task<IActionResult>>(result);
        }


    }
}