using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using TaskManager.Data.Repositories;

namespace TaskManager.Services
{
    public static class ServicesStartup
    {
        public static IConfiguration Configuration
        {
            get { return Data.DataStartup.Configuration; }
        }

        public static void Configure(IServiceProvider serviceProvider)
        {
            Data.DataStartup.Configure(serviceProvider);
        }

        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            Data.DataStartup.ConfigureServices(services, configuration);

            services.AddScoped<IToDoRepository, ToDoRepository>();
        }
    }
}
