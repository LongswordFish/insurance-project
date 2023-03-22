using System.ComponentModel.DataAnnotations; 

namespace CompanyService.Repository
{
    public class Company
    {
        [Key]
        public int companyId { get; set; }
        public string email { get; set; }
        public string companyName { get; set; }
        public string location { get; set; }
        public string logo { get; set; }
        public string contactDetails { get; set; }
        public bool isApproved { get; set; }
    }
}
