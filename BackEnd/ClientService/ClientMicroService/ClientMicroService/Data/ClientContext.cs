using ClientMicroService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ClientMicroService.Data
{
    public class ClientContext : DbContext
    {
        public ClientContext(DbContextOptions<ClientContext> options)
            : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=127.0.0.1;port=3306;database=test;user id=root;password=Laxmi@1980", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.32-mysql"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.ClientId);

                entity.Property(e => e.ClientId)
                    .HasColumnName("ClientId")
                    .IsRequired();

                entity.Property(e => e.Email)
                    .HasColumnName("Email")
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(e => e.Location)
                    .HasColumnName("Location")
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(e => e.ClientName)
                    .HasColumnName("ClientName")
                    .HasMaxLength(100)
                    .IsRequired();
            });
        }

    }
}
