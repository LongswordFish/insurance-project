using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyServiceTesting.Repository
{
    public class GlobalTokens
    {
        public static string adminToken { get; } = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTY3OTk0MzEyMiwiZXhwIjoxNjc5OTYxMTIyLCJpYXQiOjE2Nzk5NDMxMjJ9.ofx8T0AfRumjMR8TQCdA614YVfZAKi0b3F2Rd03KgOM";
        public static string companyToken { get; } = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbXBhbnkxQGdtYWlsLmNvbSIsInJvbGUiOiJjb21wYW55IiwibmJmIjoxNjc5OTMxMjUxLCJleHAiOjE2Nzk5NDkyNTEsImlhdCI6MTY3OTkzMTI1MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTA5MCIsImF1ZCI6Ikluc3VyYW5jZSJ9.WUo_qJfTR3D7EZhR5E2L52XenvvXJgwVOhaNk8TVw34";
        public static string clientToken { get; } = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsaWVudDFAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsIm5iZiI6MTY3OTkzMTM0OSwiZXhwIjoxNjc5OTQ5MzQ5LCJpYXQiOjE2Nzk5MzEzNDksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjkwOTAiLCJhdWQiOiJJbnN1cmFuY2UifQ.hzBc2I-28PO_DrBOVjhGDSWFsEYmTkTjfT8EkFFuFrw";
    }
}
