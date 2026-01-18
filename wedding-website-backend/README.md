# Wedding Site Backend

A simple Express + PostgreSQL API for RSVP management and wedding content.

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- `psql` CLI available in PATH

## Setup
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database (requires `psql` and `.env`):
   ```bash
   npm run db:init
   ```

## Development
Run with auto-reload:
```bash
npm run dev
```
The server listens on `PORT` (default 5000).

## Production
```bash
npm start
```

## API
- `POST /api/rsvps`
  - Body: `{ name: string, attending: 'yes' | 'no' }`
  - Returns: `{ success, message, data }`
- `GET /api/rsvps`
  - Returns: `{ success, data: Guest[] }`

## Notes
- CORS is restricted to `CORS_ORIGIN`.
- Inputs validated with `express-validator`.
- Errors for API routes returned as JSON.
