using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace TaskManager.Api
{
  public class ApiProgram
  {
    public static IConfiguration Configuration { get; private set; }

    public static void Main(string[] args)
    {
      Configuration = Services.ServicesStartup.Configuration;
      CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<ApiStartup>();
            });
  }
}
