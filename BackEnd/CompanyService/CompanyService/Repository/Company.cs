using System;
using System.Collections.Generic;

namespace CompanyService.Repository;

public partial class Company
{
    public int CompanyId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Address { get; set; } = null!;

    public byte[]? Logo { get; set; }

    public string? ContactDetails { get; set; }

    public string IsApproved { get; set; } = null!;
}
