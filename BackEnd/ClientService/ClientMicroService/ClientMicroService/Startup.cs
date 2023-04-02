using ClientMicroService.Data;
using ClientMicroService.Middleware;
using ClientMicroService.Repositories;
using ClientMicroService.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using NUnit.Framework;
using Steeltoe.Discovery.Client;
using System.Net;

namespace ClientMicroService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

            //Add service
            var connectionstring = configuration["mysqlconnection:connectionString"];
            services.AddDbContext<ClientContext>
(option => option.UseMySql(
                connectionstring,
                ServerVersion.Parse("8.0.32-mysql"),
                option =>
                {
                    option.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: System.TimeSpan.FromSeconds(5),
                        errorNumbersToAdd: null);
                }
                ));

            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:9092/api/client")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithMethods("PUT", "DELETE", "GET", "POST");
                    });
            });


            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IClientRepository, ClientRepository>();

            services.AddDiscoveryClient(configuration);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Client Microservice API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseMiddleware<CorsMiddleWare>();
            app.UseCors("MyPolicy");


            app.UseDiscoveryClient();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Client Microservice API V1");
                
            });

            app.UseExceptionHandler(errorApp => {
                errorApp.Run(async context => {
                    var exception = context.Features.Get<IExceptionHandlerFeature>();
                    if (exception != null)
                    {
                        var error = new
                        {
                            message = exception.Error.Message,
                            stackTrace = exception.Error.StackTrace
                        };
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(error));
                    }
                });
            });

        }
    }
}
