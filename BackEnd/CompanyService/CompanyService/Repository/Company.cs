using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CompanyService.Repository;

public partial class Company
{
    [Key]
    public int CompanyId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Description { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Country { get; set; } = null!;

    public string PostalCode { get; set; } = null!;

    public byte[]? Logo { get; set; }

    public string? ContactDetails { get; set; }

    public bool IsApproved { get; set; } = false;

    public bool AdminViewed { get; set; } = false;

    public DateTime? DateRegistered { get; set; }

    public DateTime? DateApproved { get; set; }
}
