using System;
using System.IO;
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
      LoadEnvironmentVariables(".env");

      Configuration = Services.ServicesStartup.Configuration;
      CreateHostBuilder(args).Build().Run();
    }

    public static void LoadEnvironmentVariables(string envPath)
    {
        if (!File.Exists(envPath))
            return;

        var lines = File.ReadAllLines(envPath);
        foreach (var line in lines)
        {
            var parts = line.Split(
                '=',
                2,
                StringSplitOptions.RemoveEmptyEntries);

            if (parts.Length != 2)
                continue;

            Environment.SetEnvironmentVariable(parts[0], parts[1]);
        }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<ApiStartup>();
            });
  }
}
