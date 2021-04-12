# README #
Welcome to the AWH interview exercise.

This repo contains one solution with six projects. It is targeted for C# and javascript developers.

### Project TaskManager.Api ###
TaskManager.Api is a simple API with CRUD operations for a ToDo object.

### Project TaskManager.Common ###
TaskManager.Common contains the data contracts for DTOs that are shared across projects. It currently only contains a ToDoDto.

### Project TaskManager.Data ###
TaskManger.Data contains the data models, repositories and migrations for the solution.

### Project TaskManger.Services ###
TaskManager.Services is the service layer between the API and Data layers. It has the mappers that translate domain models to DTOs and DTOs to domain models.

### Project TaskManager.Tests ###
TaskManager.Tests is the unit test project. It has one sample unit test.

### Project TaskManager.Web ###
TaskManager.Web is a simple, unstyled MVC website with all of the domain models, HTML layouts, mapping and internal services for each of the CRUD operations available within the API.


# Required Technologies #

* A Windows or Mac computer.
* Visual Studio Community Edition (latest version). Note there are missing components on the Mac that you will have to self install (NuGet CLI) to run the API project while running the website.

### What is this repository for? ###
The goal of this exercise is to get this solution up and running as part of the interview process to AWH. This is to test your ability to work with git.

Once you have a running project that works as intended, you will be asked to make several feature enhancements.

### How do I get set up? ###
* Install Visual Studio Community 2017 or later or Visual Studio Code if you do not have it set up. Note that Visual Studio 2015 will not work with this project.
* Clone this repo.
* Change local configurations that may need changed for your environment.
* Check CORS access.
* Since this is a code first project you may need to run migrations to generate the database.

### Contribution guidelines ###
* Only AWH staff should be push changes to this repo

# New Features #
* Style the existing MVC website to match these designs: [Responsive Website Designs](https://projects.invisionapp.com/d/main#/projects/prototypes/21209237).
* Alternatively, you may choose to add a new front end using a Javascript framework like React.js, Angular.js, Svelte.js or similar.
* Alternatively, you may choose to build a mobile app for the front end using Xamarin or React Native. With that option, use these designs: [Android App Designs](https://projects.invisionapp.com/d/main#/projects/prototypes/21186629) and [iOS App Designs](https://projects.invisionapp.com/d/main#/projects/prototypes/21203858).
* Add a new property called Status to the ToDo object with the following possible values: "To Do", "In Progress" and "Done".
* There should be an indicator for upcoming (yellow) and past due (red) ToDos.
* You are encouraged to make other additions and modifications as desired.

### Who do I talk to? ###
For this repo, questions on direction, scope, or intent can be directed to robin.walters@awh.net

### Additional Resources ###
[Getting Started with EF Core on .NET Core Console App with a New database](https://docs.microsoft.com/en-us/ef/core/get-started/netcore/new-db-sqlite)

[EF Core .NET Command-line Tools](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)

[Migrations - EF Core with ASP.NET Core MVC](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/migrations#introduction-to-migrations)
