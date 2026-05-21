# Smart Task Planner

A modern full-stack task management application built using:

- ASP.NET Core Web API
- React + Vite
- Entity Framework Core
- SQLite

This project is designed as a scalable productivity platform that will evolve from a simple task manager into a smart habit and productivity tracking system.

---

## Features Implemented

### Backend
- ASP.NET Core Web API
- CRUD APIs for Tasks
- Entity Framework Core
- SQLite database integration
- Swagger/OpenAPI support
- CORS configuration for React frontend

### Frontend
- React + Vite setup
- Modern responsive UI
- Add Task functionality
- Fetch tasks from backend API
- Mark tasks as completed
- Delete tasks
- Dynamic task statistics dashboard

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQLite

---

## Project Structure

```text
TASK_PLANNER/
│
├── TaskPlanner.Api/       -> ASP.NET Core backend
│
├── task-planner-ui/       -> React frontend
```

---

## Getting Started

### Backend Setup

1. Open `TaskPlanner.Api`
2. Restore NuGet packages
3. Run migrations

```powershell
Add-Migration InitialCreate
Update-Database
```

4. Run the API

Swagger URL:

```text
https://localhost:7173/swagger
```

---

### Frontend Setup

Navigate to:

```text
task-planner-ui
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Create `.env` file:

```env
VITE_API_BASE_URL=https://localhost:7173
```

---

## Future Enhancements

- User Authentication (JWT)
- Habit Tracking
- Productivity Analytics
- Calendar Integration
- Notifications & Reminders
- AI-based Productivity Suggestions
- Drag-and-Drop Task Board

---

## Learning Goals

This project was built to strengthen skills in:

- Full-stack development
- REST API development
- React frontend architecture
- Database integration
- Entity Framework Core
- API consumption
- State management
- Clean UI design

---

## Author

Shreelakshmi
