using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public interface IDeleteEndpointsTest
    {
        public void DeleteShouldSucceed();

        public void DeleteShouldFail();
    }
}
