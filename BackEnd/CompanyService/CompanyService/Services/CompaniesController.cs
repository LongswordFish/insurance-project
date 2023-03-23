using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CompanyService.Repository;

namespace CompanyService.Services
{
    [Route("api/company")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly CompanyContext _context;

        public CompaniesController(CompanyContext context)
        {
            _context = context;
        }

        // GET: api/company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
          if (_context.Companies == null)
          {
                throw new Exception("Entity set 'CompanyContext.Companies' is null.");
            }
            return await _context.Companies.ToListAsync();
        }

        // GET: api/company/view/id
        [HttpGet("view/{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
          if (_context.Companies == null)
          {
              throw new Exception("Entity set 'CompanyContext.Companies' is null.");
          }
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                throw new Exception($"There are no companies with ID number: {id}");
            }

            return company;
        }

        // PUT: api/company/update/id
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {
            if (id != company.CompanyId)
            {
                throw new Exception($"ID {id} and company.CompanyId {company.CompanyId} do not match. Could not update company information in the database.");
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    throw new Exception($"Company with ID {id} does not exist. Could not update company information in the database.");
                }
                else
                {
                    throw new Exception("Could not update company information in the database");
                }
            }

            return NoContent();
        }

        // POST: api/company/add
        [HttpPost("add")]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
          if (_context.Companies == null)
          {
                throw new Exception("Entity set 'CompanyContext.Companies' is null.");
            }
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = company.CompanyId }, company);
        }

        // DELETE: api/company/delete/id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            if (_context.Companies == null)
            {
                throw new Exception("Entity set 'CompanyContext.Companies' is null.");
            }
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                throw new Exception($"Company with ID {id} is null. Could not delete company.");
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST (approve company): api/company/approve/id
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveCompany(int id)
        {
            if (_context.Companies == null)
            {
                throw new Exception("Entity set 'CompanyContext.Companies' is null."); ;
            }
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                throw new Exception($"Company with ID {id} is null. Could not approve company.");
            }

            company.IsApproved = "1";

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    throw new Exception($"Company with ID {id} does not exist. Could not approve company.");
                }
                else
                {
                    throw new Exception("Could not approve company.");
                }
            }

            return NoContent();
        }

        // POST (disapprove company): api/company/disapprove/id
        [HttpPut("disapprove/{id}")]
        public async Task<IActionResult> DisapproveCompany(int id)
        {
            if (_context.Companies == null)
            {
                throw new Exception("Entity set 'CompanyContext.Companies' is null."); ;
            }
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                throw new Exception($"Company with ID {id} is null. Could not disapprove company.");
            }

            company.IsApproved = "0";

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    throw new Exception($"Company with ID {id} does not exist. Could not disapprove company.");
                }
                else
                {
                    throw new Exception("Could not disapprove company.");
                }
            }

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return (_context.Companies?.Any(e => e.CompanyId == id)).GetValueOrDefault();
        }
    }
}
