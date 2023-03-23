using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public interface IPutEndpointsTest
    {
        public void UpdateShouldSucceed();

        public void UpdateWrongEntriesFailed();

        public void UpdateBadIdFailed();

        public void ApproveShouldSucceed();

        public void ApproveShouldFail();

        public void DisapproveShouldSucceed();

        public void DisapproveShouldFail();
    }
}
