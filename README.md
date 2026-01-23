# Student Registration App

A full-stack application for managing student registrations with English and Tamil localization.

## Prerequisites
- .NET 8 SDK
- Node.js & npm
- SQL Server LocalDB

## Setup Instructions

### Backend (StudentFormsApi)
1. Navigate to the backend directory:
   ```powershell
   cd StudentFormsApi
   ```
2. Build the project:
   ```powershell
   dotnet build
   ```
3. Update the database:
   ```powershell
   dotnet ef database update
   ```
4. Run the API:
   ```powershell
   dotnet run
   ```
   The API will start at `http://localhost:5078` (check the console output to confirm port).

### Frontend (student-forms-ui)
1. Navigate to the frontend directory:
   ```powershell
   cd student-forms-ui
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Run the development server:
   ```powershell
   npm run dev
   ```
   The app will open at `http://localhost:5173` (or similar).

## Features
- **Localization**: Toggle between English and Tamil.
- **Form Validation**: Inline errors for required fields.
- **CRUD Operations**: Add, View, Edit, and Delete students.
- **Premium UI**: Built with Tailwind CSS and modern design principles.
