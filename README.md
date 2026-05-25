# Log Manager System

A comprehensive, all-in-one logging system for application developers to save, manage, and analyze logs of their applications.

##  Project Overview

Log Manager helps developers:

- Understand user experience while using their applications
- Catch and track errors/bugs that users encounter
- Make data-driven decisions based on feature usage analytics

##  Project Structure

This is a monorepo containing three main components:

```
├── backend/              # Express.js + MongoDB backend server
├── frontend/             # React dashboard for developers
├── client-library/       # NPM package for client-side logging
└── README.md            # This file
```

### Installation

1. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your MongoDB URI and JWT secret
   npm run dev
   ```

2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # .env should point to your backend API
   npm run dev
   ```

3. **Client Library Setup**
   ```bash
   cd client-library
   npm install
   npm link  
   ```

##  Features

### Backend 

-  User authentication (Register, Login, Logout)
-  API Key management for developers
-  Application management (CRUD operations)
-  Log ingestion and storage
-  Log retrieval with pagination, sorting, and filtering
-  Authorization middleware to protect endpoints

**Key Endpoints:**

- Auth: `POST /api/users/register`, `/api/users/login`, `/api/users/logout`
- Applications: `GET/POST /api/applications`, `GET/DELETE /api/applications/:name`
- Logs: `GET/POST /api/applications/:name/logs`

### Frontend Dashboard 
- User authentication (Login/Register)
- API Key display
- View all applications
- Create/delete applications
- Detailed application view
- Logs table with pagination (10 logs per page)
- Log sorting (recent/most occurred)
- Log filtering (by level, by message search)
- Pie chart: Log level distribution (INFO/WARN/ERROR)
- Line chart: Daily logs by level (last 7 days)
- Responsive design with Tailwind CSS

### Client Library 
- NPM package for easy integration
- `init()` method to configure API key and app name
- `log()` method for logging with level support
- Convenience methods: `info()`, `warn()`, `error()`
- Batch logging support
- API key validation
- Error handling and logging


##  Tech Stack
**Backend:**

- Node.js + TypeScript
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

**Frontend:**

- React 19 + TypeScript
- Vite
- React Router v7
- Tailwind CSS
- Recharts for visualizations
- Axios for HTTP requests

**Client Library:**

- JavaScript/TypeScript
- Fetch API for HTTP requests

##  Testing

```bash
# Backend
cd backend
npm run build
npm run dev

# Frontend
cd frontend
npm run dev
```

## 👤 Author
**Eman Arafa** - [GitHub Profile](https://github.com/emanarafa19)
