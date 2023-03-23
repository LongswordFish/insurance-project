using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public interface IGetEndpointsTest
    {
        public void GetAllShouldSucceed();

        public void GetOneShouldSucceed();

        public void GetOneShouldFail();
    }
}
