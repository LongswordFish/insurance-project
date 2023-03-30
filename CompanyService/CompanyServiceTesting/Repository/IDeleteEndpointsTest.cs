using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public interface IDeleteEndpointsTest
    {
        public Task DeleteShouldSucceed();
        public Task DeleteShouldFail();
        public Task DeleteGivenWrongCRUD(); 
    }
}
