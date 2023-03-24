using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public interface IPutEndpointsTest
    {
        public Task PutGivenWrongCRUD();
        public Task UpdateShouldSucceed();
        public Task UpdateShouldFail();

        public Task ApproveShouldSucceed();
        public Task DisapproveShouldSucceed();
    }
}
