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
        public Task GetOneShouldSucceed();
        public Task GetOneShouldFail();
        public Task GetGivenWrongCRUD();
    }
}
