using CompanyService.Middleware;
using CompanyService.Repository;
using CompanyService.Services;
using Microsoft.EntityFrameworkCore;

namespace CompanyService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers();

            IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

            builder.Services.AddDbContext<CompanyContext>
            (option => option.UseMySql(configuration.GetConnectionString("DBConnection"), ServerVersion.Parse("8.0.32-mysql")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:9091/api/Companies")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithMethods("PUT", "DELETE", "GET", "POST");
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();
            app.UseMiddleware<CorsMiddleware>();
            app.UseCors("MyPolicy");
            app.MapControllers();

            app.Run();
        }
    }
}