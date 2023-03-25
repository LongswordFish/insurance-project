using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public interface IGetEndpointsTest
    {
        public Task GetAllShouldSucceed();
        public Task GetGivenWrongCRUD();

        public Task GetOneIdShouldSucceed();
        public Task GetOneIdShouldFail();

        public Task GetNameShouldSucceed();
        public Task GetNameShouldFail();

        public Task GetMaxShouldSucceed();
        public Task GetMaxShouldFail();
    }
}
