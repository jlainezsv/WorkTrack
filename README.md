# WorkTrack

**WorkTrack** is a full-stack time tracking system designed for small businesses to register employee work hours, monitor activity, and maintain accurate records of work performed for clients.

The project was built as a **real-world product engineering exercise**, focusing on **Clean Architecture**, maintainability, and full-stack system design. It includes a production deployment, domain-driven design patterns, and a documented architecture.

---

# Live Demo

Frontend  
https://work-track-azure.vercel.app

Backend API  
https://wt-prod.up.railway.app

---

# Overview

WorkTrack allows businesses to:

- Create and manage employees
- Register work sessions (start / end time)
- Prevent overlapping work entries
- Associate work sessions with clients
- Track payment status of work entries
- View employee work history
- Maintain accurate time logs

The project emphasizes **architecture quality and long-term maintainability**, not just feature delivery.

---

# Key Features

### Employee Management

- Create employees through a UI form
- Automatic employee code generation (`EMP-001`, `EMP-002`, etc.)
- Active / inactive employee status
- Optional avatar via photo URL
- Automatic fallback avatar generation

---

### Time Tracking

- Register work hours per employee
- Associate work with a client
- Optional description of work performed
- Prevent overlapping time entries
- Store entries with timestamps
- Track payment status

Supported status values:

```

unpaid
paid
invoiced
cancelled

```

---

### Dashboard Capabilities

- View all employees
- View individual employee profiles
- Display historical time entries
- Toggle time entry status
- Dark / light theme support

---

# Architecture

WorkTrack follows **Clean Architecture** across both frontend and backend.

```

Domain
Application
Infrastructure
UI

```

This structure ensures:

- Domain logic is framework independent
- Infrastructure can be replaced without affecting business rules
- Use cases remain explicit and testable

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- next-themes (dark / light mode)

---

## Backend

- Node.js
- NestJS
- Drizzle ORM
- PostgreSQL
- REST API

---

## Infrastructure

Production deployment uses modern cloud tooling.

Frontend Hosting  
Vercel

Backend Hosting  
Railway

Database  
Railway PostgreSQL

Local Development Database  
Docker (PostgreSQL container)

---

# Production Architecture

```

Browser
↓
React Frontend (Vercel)
↓
NestJS REST API (Railway)
↓
PostgreSQL Database (Railway)

```

---

# Project Structure

## Frontend

```

src
├── domain
├── application
├── infrastructure
└── ui

```

### Layers

Domain  
Business entities and core rules

Application  
Use cases and orchestration logic

Infrastructure  
Repositories, DTOs, API communication

UI  
Pages, components, and user interaction

---

## Backend

```

backend
├── domain
├── application
├── infrastructure
└── http

```

### Backend Layers

Domain  
Entities and core business logic

Application  
Use cases and application services

Infrastructure  
Database, ORM, and repository implementations

HTTP  
Controllers and API endpoints

---

# API Endpoints

Example endpoints implemented:

```

GET    /employees
GET    /employees/:id
POST   /employees

GET    /employees/:id/time-entries
GET    /employees/time-entries/all

POST   /employees/:id/time-entries

PATCH  /employees/time-entries/:id/status

```

---

# Local Development

### Clone the repository

```

git clone https://github.com/jlainezsv/WorkTrack.git
cd WorkTrack

```

---

### Start the database

The local database runs in Docker.

```

docker compose up

```

---

### Start the backend

```

cd backend
npm install
npm run dev

```

---

### Start the frontend

```

npm install
npm run dev

```

Frontend will run on:

```

http://localhost:5173

```

Backend will run on:

```

http://localhost:4000

```

---

# Environment Variables

Frontend `.env`

```

VITE_API_URL=http://localhost:4000

```

Production uses:

```

VITE_API_URL=https://wt-prod.up.railway.app

```

Backend `.env`

```

DATABASE_URL=postgresql://user:password@localhost:5432/worktrack
NODE_ENV=development

```

---

# Documentation

The project includes internal architecture documentation.

Location:

```

docs/

```

Includes:

Architecture Overview  
Architecture Dashboard  
Dependency Graph

Dependency diagrams are generated automatically using **Dependency Cruiser**.

---

# Engineering Goals

This project was created to explore and demonstrate:

- Clean Architecture implementation
- Domain-driven design concepts
- Scalable frontend architecture
- API-driven frontend systems
- Type-safe database access with Drizzle
- Modern deployment pipelines
- Documentation-driven development

---

# Future Improvements

Planned enhancements include:

- Request validation with DTOs
- Automated tests for use cases
- Pagination and filtering
- Employee activation / deactivation flows
- Role-based access control
- Multi-tenant architecture
- SaaS-ready infrastructure

---

# Author

Jonathan Lainez

UX/UI Designer → transitioning into **Product Engineering**

Focused on building products that combine:

- Product thinking
- UX design
- Frontend engineering
- Scalable system architecture

---

# License

MIT License
```
