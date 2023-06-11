using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Stripe;
using System;
using System.Text.Json.Serialization;
using TaskManager.Services.Services;

namespace TaskManager.Api
{
  public class ApiStartup
  {
    public ApiStartup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      Services.ServicesStartup.ConfigureServices(services, Configuration);

      services.AddControllers()
          .AddJsonOptions(options =>
          {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

          });

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Task Manager API", Version = "v1" });
      });

      services.AddScoped<IToDoService, ToDoService>();

      services.AddCors(options =>
      {
        options.AddPolicy(name: "AllowSpecificOrigin",
                  builder =>
                  {
                    builder.WithOrigins("http://127.0.0.1:5173", "https://salmon-desert-0086f8d10.3.azurestaticapps.net/")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                  });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IServiceProvider serviceProvider, IWebHostEnvironment env)
    {
      Services.ServicesStartup.Configure(serviceProvider);
      StripeConfiguration.ApiKey = Configuration["STRIPE:SecretKey"];


      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseStaticFiles();

      app.UseRouting();

      app.UseCors("AllowSpecificOrigin");

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      app.UseSwagger();

      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task Manager API V1");
      });
    }
  }
}
