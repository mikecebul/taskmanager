# TaskManager Frontend - React + Vite

This project is a single-page application built using React and Vite. It interacts with the ASP.NET Core API (TaskManger.API), which must be running for this application to function correctly.

## Prerequisites

Before you can run this application, you need to have the following installed on your system:

- Node.js and npm (npm is included with Node.js)
- .NET Core SDK
- Yarn package manager
- Visual Studio Code, or any other code editor of your choice

## Getting Started

Follow these steps to get the project running on your local machine:

1. **Start the API**

   Before starting the React application, you need to have the ASP.NET Core API running.

   - Navigate to the API project directory in your terminal and run the following command to start the API:

     ```
     dotnet run
     ```

   The API should now be running at `https://localhost:5001/` or `http://localhost:5000/`.

2. **Install dependencies**

   Navigate to the React project directory in your terminal and run the following command to install the project's dependencies:

3. **Start the React application**

Still in the React project directory, run the following command to start the React application:

This command starts the Vite dev server. You should now be able to access the React application at `http://localhost:3000/`.

## Project Structure

This project is organized as follows:

- `src/` contains all of the React application's source code.
- `src/App.js` is the main component of the React application.
- `vite.config.js` contains the Vite configuration for this project.
- `package.json` lists the project's npm dependencies and defines the available scripts.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE.md) file for details.
