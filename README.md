# WorkTrack

**WorkTrack** is a full-stack time tracking system designed for small businesses to register employee work hours, monitor activity, and maintain accurate records of work performed for clients.

The project was built as a **product engineering learning project** focused on:

* Clean Architecture
* Maintainability
* Real-world backend design
* Full-stack integration
* Architecture documentation

WorkTrack is intended to evolve into a **usable V1 for real-world testing** while serving as a platform to practice modern engineering patterns and scalable architecture.

---

# Live Demo

Frontend
https://work-track-azure.vercel.app

Backend API
https://wt-prod.up.railway.app

---

# Overview

WorkTrack allows businesses to:

* Create and manage employees
* Register work sessions (start / end time)
* Prevent overlapping work entries
* Associate work sessions with clients
* Track payment status of work entries
* View employee work history
* Maintain accurate time logs

The system is designed to **prioritize architecture quality and maintainability**, not just feature delivery.

---

# Key Features

## Employee Management

* Create employees through a UI form
* Automatic employee code generation (`EMP-001`, `EMP-002`, etc.)
* Active / inactive employee status
* Optional avatar via photo URL
* Automatic fallback avatar generation
* Persistent storage in PostgreSQL

Each employee contains:

* UUID identifier
* Human-readable employeeCode
* Name
* Active status
* Created timestamp
* Optional photo URL

---

## Time Tracking

WorkTrack supports registering working sessions for employees.

Features include:

* Register start and end time
* Associate work sessions with a client
* Optional description of work performed
* Prevent overlapping time entries
* Timestamp-based storage
* Track payment status of work sessions

Supported status values:

```
unpaid
paid
invoiced
cancelled
```

Each `TimeEntry` includes:

* UUID identifier
* Employee reference
* Start time
* End time
* Client name
* Description
* Payment status
* Creation timestamp

---

## Dashboard Capabilities

The frontend dashboard provides:

* Employee list overview
* Individual employee profile pages
* Historical time entries per employee
* Payment status toggling
* Aggregated work summaries
* Dark / light theme support

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

* Domain logic is framework independent
* Infrastructure can be replaced without affecting business rules
* Use cases remain explicit and testable
* The system can scale without architectural degradation

---

# Frontend Architecture

The frontend is built with a layered structure that mirrors Clean Architecture.

```
src/
├── domain
├── application
├── infrastructure
└── ui
```

### Domain

Business entities and domain models.

Examples:

```
Employee
TimeEntry
```

---

### Application

Contains use cases that orchestrate business operations.

Examples:

```
RegisterTimeEntry
GetEmployeeHours
GetDashboardSummary
CreateEmployee
```

---

### Infrastructure

Implements external dependencies.

Includes:

* API repositories
* DTO objects
* Data mappers
* API client

The infrastructure layer converts API responses into domain entities.

---

### UI

Contains:

* Pages
* Layouts
* Components
* Navigation
* Theme system

Built with:

* Tailwind CSS
* shadcn/ui
* next-themes

---

# Backend Architecture

The backend also follows **Clean Architecture** principles.

```
backend/
├── domain
├── application
├── infrastructure
└── http
```

---

## Domain

Contains business entities:

```
Employee
TimeEntry
```

---

## Application

Contains:

* Use cases
* Repository interfaces
* Application services
* Business errors

Examples:

```
CreateEmployee
RegisterTimeEntry
EmployeeCodeGenerator
```

Custom application errors include:

```
EmployeeNotFoundError
EmployeeInactiveError
TimeEntryOverlapError
```

---

## Infrastructure

Implements persistence and transport layers.

Includes:

* Drizzle ORM repositories
* Database schema definitions
* HTTP controllers
* NestJS modules
* Exception filters

---

## HTTP Layer

Provides REST API endpoints implemented with NestJS.

Controllers remain thin and delegate logic to the application layer.

---

# Backend Infrastructure

The backend persistence layer uses:

* PostgreSQL
* Drizzle ORM
* Docker (local database container)

Key database characteristics:

* Relational schema
* Foreign key relationship between employees and time entries
* Unique employeeCode constraint
* Migration-based schema evolution

---

# Error Handling

The backend implements centralized error handling.

Business errors originate in the **Application Layer** and extend:

```
ApplicationError
```

A global NestJS exception filter converts domain errors into HTTP responses.

Example mappings:

```
404 → EmployeeNotFoundError
400 → EmployeeInactiveError
409 → TimeEntryOverlapError
500 → Internal Server Error
```

This approach keeps controllers minimal and maintains consistent API responses.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* shadcn/ui
* next-themes

---

## Backend

* Node.js
* NestJS
* Drizzle ORM
* PostgreSQL
* REST API architecture

---

## Infrastructure

Production deployment uses modern cloud services.

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

# Local Development

## Clone the repository

```
git clone https://github.com/jlainezsv/WorkTrack.git
cd WorkTrack
```

---

## Start the database

The local database runs in Docker.

```
docker compose up
```

---

## Start the backend

```
cd backend
npm install
npm run dev
```

---

## Start the frontend

```
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

Backend runs at:

```
http://localhost:4000
```

---

# Environment Variables

Frontend `.env`

```
VITE_API_URL=http://localhost:4000
```

Production:

```
VITE_API_URL=https://wt-prod.up.railway.app
```

---

Backend `.env`

```
DATABASE_URL=postgresql://user:password@localhost:5432/worktrack
NODE_ENV=development
```

---

# Documentation

The project includes internal technical documentation located in:

```
docs/
```

Documentation includes:

* Architecture Overview
* Architecture Dashboard
* Dependency Graph

Dependency diagrams are generated automatically using **Dependency Cruiser**, helping visualize the relationships between modules and validate architectural boundaries.

---

# Engineering Goals

WorkTrack was built to explore and demonstrate:

* Clean Architecture implementation
* Domain-driven design concepts
* Scalable frontend architecture
* API-driven frontend systems
* Type-safe database access with Drizzle
* Documentation-driven development
* Full-stack product engineering practices

---

# Future Improvements

Planned enhancements include:

* Request validation using DTO schemas
* Automated testing for application use cases
* Pagination and filtering for API endpoints
* Employee activation / deactivation flows
* Role-based access control
* Multi-tenant architecture
* SaaS-ready infrastructure

---

# Author

Jonathan Lainez

UX/UI Designer transitioning into **Product Engineering**

Focused on building products that combine:

* Product thinking
* UX design
* Frontend engineering
* Scalable system architecture

---

# License

MIT License
