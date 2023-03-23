using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public interface IPostEndpointsTest
    {
        public void PostShouldSucceed();

        public void PostShouldFail();
    }
}
