# 🐾 PAWS — Veterinary Management Platform

<div align="center">

![PAWS Logo](./frontend/assets/images/paws.png)

**Connecting pet owners with veterinary care in Medellín, Colombia**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen?style=for-the-badge)](https://paws-app-bjfydtcsh6g4djcg.centralus-01.azurewebsites.net/)
[![License](https://img.shields.io/badge/License-Academic-blue?style=for-the-badge)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=for-the-badge&logo=postgresql)](https://postgresql.org)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running with Docker](#running-with-docker)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Team](#team)

---

## Overview

PAWS is a full-stack **Single Page Application (SPA)** that bridges the gap between pet owners and veterinary businesses in Medellín. The platform enables:

- Pet owners to manage their animals, book appointments, and access AI-powered health guidance.
- Veterinary clinics to manage their business profile, appointments, and patient records.
- Administrators to oversee all registered users, pets, and businesses.

> Built as the final integrative project for the **RIWI Basic Route** program, following SCRUM methodology with Azure DevOps.

---

## Features

### 🐕 For Pet Owners
- Register and log in with email/password or Google OAuth
- Create and manage pet profiles (species, breed, age, weight)
- Book veterinary appointments at registered clinics
- View full appointment history with real-time status
- Access complete medical records per pet
- AI symptom triage — get urgency classification (HIGH / MEDIUM / LOW)
- AI care tips personalized to your pet's profile

### 🏥 For Veterinary Businesses
- Register clinic with NIT verification
- Manage appointment requests (confirm, cancel, complete)
- Create and update medical records for patients
- Configure business profile, schedule and services

### 🤖 AI Features (Google Gemini)
- **Symptom Triage**: Classifies urgency based on species and symptoms
- **Clinic Recommendation**: Suggests top 3 clinics matching the symptoms
- **Care Tips**: Returns 5 personalized tips (cached 24h)

### 🗺️ Discovery
- Interactive map with all registered clinics (Google Maps API)
- Search and filter by zone, specialty, services, 24h availability
- Emergency module with direct WhatsApp links to 24/7 clinics

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JavaScript ES6+, HTML5, CSS3 |
| Styling | Tailwind CSS (CDN) |
| Backend | Node.js 18+ / Express.js 4 |
| Database | PostgreSQL 14+ |
| Authentication | JWT + Google OAuth 2.0 (Passport.js) |
| AI | Google Gemini 2.5 Flash |
| Chatbot | Groq SDK |
| Email | Nodemailer |
| Containers | Docker + Docker Compose |
| Deployment | Azure App Service + Azure Container Registry |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/[your-org]/PAWS-develop.git
cd PAWS-develop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials (see [Environment Variables](#environment-variables)).

### 4. Set up the database

```bash
# Connect to PostgreSQL and run the schema
psql -U postgres -c "CREATE DATABASE myvet_db;"
psql -U postgres -d myvet_db -f database/db.sql
```

### 5. Start the development server

```bash
npm run dev      # with nodemon (auto-reload)
# or
npm start        # without auto-reload
```

The app will be available at **http://localhost:3000**

---

## Environment Variables

Create a `.env` file in the root of the project:

```env
# ── Database ──────────────────────────────────────
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myvet_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# ── Server ────────────────────────────────────────
PORT=3000

# ── Authentication ────────────────────────────────
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here

# ── Google OAuth ──────────────────────────────────
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# ── AI (Google Gemini) ────────────────────────────
GEMINI_API_KEY=your_gemini_api_key

# ── Email (Nodemailer) ────────────────────────────
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# ── Frontend ──────────────────────────────────────
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

> ⚠️ Never commit `.env` to the repository. It is already listed in `.gitignore`.

---

## Database Setup

The database schema is in `database/db.sql`. It creates 26 tables covering:

- **Identity**: `users`, `refresh_tokens`
- **Businesses**: `businesses`, `clinics`, `vets`, `petshops`, `dog_walkers`, `daycares`, `shelters`
- **Catalogs**: `specialties`, `animal_types`, `schedules`
- **Pet Management**: `pets`, `medical_records`, `adoptions`, `shelter_pets`
- **Operations**: `appointments`, `daycare_slots`, `daycare_bookings`, `reviews`
- **Emergency**: `emergencies`, `emergency_messages`

The ER diagram is available at `database/ER_Diagram.png`.

To apply the latest migration:

```bash
psql -U postgres -d myvet_db -f database/migration_v3.sql
```

---

## Running with Docker

```bash
# Build and start both the app and PostgreSQL
docker-compose up --build

# Stop containers
docker-compose down
```

The app will be available at **http://localhost:3000**

For Azure deployment instructions, see [`docs/docker-azure.md`](./docs/docker-azure.md).

---

## API Reference

All API endpoints are prefixed with `/api`.

| Module | Base Path | Description |
|--------|-----------|-------------|
| Auth | `/api/auth` | Login, register, logout, Google OAuth |
| Users | `/api/users` | User CRUD, dashboard, appointments |
| Pets | `/api/pets` | Pet CRUD, query by user |
| Businesses | `/api/businesses` | Business CRUD, specialties, schedule |
| Appointments | `/api/appointments` | Create, update, status management |
| Medical Records | `/api/medical-records` | Create, update, query by pet |
| Emergencies | `/api/emergencies` | Emergency events |
| AI | `/api/ai` | Triage, clinic recommendation, care tips |
| Contact | `/api/contact` | Send contact email |

---

## Project Structure

```
PAWS-develop/
├── index.html                  # SPA entry point
├── backend/
│   ├── app.js                  # Express app + route registration
│   ├── db.js                   # PostgreSQL connection pool
│   ├── routes/                 # Route definitions (9 modules)
│   ├── controllers/            # Business logic layer
│   ├── storage/                # Data access layer (SQL queries)
│   ├── services/               # Email, AI integrations
│   └── middleware/             # Auth, validation, error handling
├── frontend/
│   ├── src/
│   │   ├── router/             # Hash-based SPA router
│   │   ├── views/              # Page components (19 views)
│   │   ├── components/         # Shared UI components
│   │   ├── services/           # API client layer (api.js)
│   │   └── styles/             # CSS files per view
│   └── assets/                 # Images, fonts, icons
├── database/
│   ├── db.sql                  # Full schema
│   ├── migration_v3.sql        # Latest migration
│   ├── ER_Diagram.png          # Entity-relationship diagram
│   └── UML_Veterinary.png      # UML class diagram
├── docs/
│   ├── docker-azure.md         # Azure deployment guide
│   └── dependencias.md         # Dependency notes
├── Dockerfile
├── package.json
└── .env.example
```

---

## Team

| Name | Role | GitHub |
|------|------|--------|
| [Name 1] | Scrum Master / Backend Lead | [@username](https://github.com/username) |
| [Name 2] | Product Owner / Frontend Lead | [@username](https://github.com/username) |
| [Name 3] | Developer / AI Integration | [@username](https://github.com/username) |
| [Name 4] | Developer / User Features | [@username](https://github.com/username) |
| [Name 5] | Developer / Admin & Deployment | [@username](https://github.com/username) |

> RIWI Basic Route — Cohort 2025-2026 — Medellín, Colombia