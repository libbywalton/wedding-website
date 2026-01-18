# Wedding Website – Full Stack Application

A complete wedding website comprising a Next.js frontend and an Express + PostgreSQL backend. This README covers the whole project: setup, development, testing, and deployment.

## Overview
- Frontend: Next.js 16 (App Router), React 19, Tailwind CSS
- Backend: Express 4, PostgreSQL (via `pg`), input validation, CORS, security headers
- API: RSVP endpoints for guests, plus admin view of the guest list

## Repository Structure
- `wedding-site-frontend/` – Next.js app (UI, pages, assets)
- `wedding-site-backend/` – Express API + DB schema and server scripts

## Prerequisites
- Node.js 18+ (recommended LTS)
- PostgreSQL 14+
- `psql` CLI available on PATH (for DB setup)
- macOS (tested), Linux should also work

## Environment Configuration
Backend environment variables (`wedding-site-backend/.env`):

## Install Dependencies
```bash
# Backend
cd wedding-site-backend
npm install

# Frontend
cd ../wedding-site-frontend
npm install
```

## Database Setup
Initialize the database using the provided schema:
```bash
cd wedding-site-backend
npm run db:init
```
This uses `schema.sql` to create table `guests`.

## Development
Run both services locally.
```bash
# Backend (port 5000)
cd wedding-site-backend
npm start

# Frontend (port 3000)
cd ../wedding-site-frontend
npm run dev
```
- The frontend proxies `/api/*` to the backend at `http://localhost:5000/api/*` via Next rewrite rules.
- The backend restricts CORS to `CORS_ORIGIN` (default `http://localhost:3000`).

## Testing
Both projects include Jest test suites.
```bash
# Backend tests
cd wedding-site-backend
npm test

# Frontend tests
cd ../wedding-site-frontend
npm test
```
- Backend tests mock the DB and cover `POST /api/rsvps` and `GET /api/rsvps`.
- Frontend tests currently validate API client behavior.

## Useful Scripts
Backend (`wedding-site-backend/package.json`):
- `npm run dev` – start server with auto-reload
- `npm start` – start server (production mode)
- `npm run db:init` – create schema in target database
- `npm run lint` – run ESLint
- `npm test` – run backend Jest suite

Frontend (`wedding-site-frontend/package.json`):
- `npm run dev` – start Next.js dev server
- `npm run build` – build production bundle
- `npm start` – run Next.js production server
- `npm run lint` – run ESLint
- `npm test` – run frontend Jest suite

## API Summary
- `POST /api/rsvps`
  - Body: `{ name: string, attending: 'yes' | 'no' }`
  - Response: `{ success, message, data }`
- `GET /api/rsvps`
  - Response: `{ success, data: Guest[] }`
