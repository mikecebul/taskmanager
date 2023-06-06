# TaskManager Frontend - React + Vite

This project is a single-page application built using React and Vite. It interacts with the ASP.NET Core API (TaskManger.API), which must be running for this application to function correctly.

## Features

This application includes the following features:

- **Type Safety**: Implemented using TypeScript, which helps catch errors early and improves the development experience with features like auto-completion and type inference.
- **Modern Styling**: Utilized Tailwind CSS, a highly customizable, low-level CSS framework that provides utility classes to build designs directly in your markup.
- **Component Library**: Used Radix UI, a low-level, unstyled, and highly customizable component library that offers great accessibility and developer experience.
- **Asynchronous State Management**: Implemented with tanstack/react-query, a powerful library for fetching, synchronizing, and updating server state in React applications.
- **Accept Credit Card Donations**: Integrated Stripe Checkout for handling monetary donations via a "Buy me a coffee" button in the footer.

## Prerequisites

Before you can run this application, you need to have the following installed on your system:

- Node.js and npm (npm is included with Node.js)
- .NET Core SDK
- Yarn package manager
- Visual Studio Code, or any other code editor of your choice
- SQLLocalDB from SQL Server 2019 (if using VS Code)

## Getting Started

Follow these steps to get the project running on your local machine:

1. **Create the Database**

   Before starting the application for the first time, you need to create the initial database migration. Ensure that you're in the API project directory and run:

   ```
   dotnet ef database update
   ```

2. **Start the API**

   Before starting the React application, you need to have the ASP.NET Core API running. Navigate to the API project directory in your terminal and start the API:

   ```
   cd TaskManager.API
   dotnet run
   ```

   The API should now be running at `https://localhost:5001/` or `http://localhost:5000/`.

3. **Install dependencies**

   In a new terminal navigate to the React project directory and run the following command to install the project's dependencies:

   ```
   cd /TaskManager.React
   yarn
   ```

4. **Start the React application**

   Still in the React project directory, run the following command to start the React application:

   ```
    yarn dev
   ```

   This command starts the Vite dev server. You should now be able to access the React application at `http://127.0.0.1:5173/`.
   <br>
5. **Set up Environment Variable**
   Copy the contents of .env.example to a new file named .env:
   ```
   cp .env.example .env
   ```
   This file includes the Stripe test public key. It is set up to work immediately, but you can replace it with a production key when you're ready to deploy the app.

## Project Structure

This project is organized as follows:

- `src/` contains all of the React application's source code.
  - `src/components/` houses all the reusable UI components. These components are built using TypeScript, Radix UI, and Tailwind CSS for a robust, accessible, and style-agnostic UI.
  - `src/lib/` contains utility files and functions such as API fetching logic, type definitions, and Tailwind CSS merging utilities.
- `src/App.js` is the main component of the React application.
- `tailwind.config.js` contains the configuration for Tailwind CSS, including theme setup.
- `vite.config.js` contains the Vite configuration for this project.
- `package.json` lists the project's npm dependencies and defines the available scripts.
