# Wedding Site Frontend

Next.js app (App Router) with Tailwind CSS for the wedding website.

## Scripts
- `npm run dev` – start local dev server on port 3000
- `npm run build` – build production bundle
- `npm start` – run production server
- `npm run lint` – run ESLint

## API Proxy
`next.config.mjs` rewrites `/api/*` to the backend at `http://localhost:5000/api/*`. Ensure the backend is running with CORS allowing `http://localhost:3000`.

## Pages
- Home: welcome, countdown, hero image
- RSVP: submits to backend `/api/rsvps`
- Guest List: admin-only view consuming `/api/rsvps`
- FAQs & Schedule: static content from `public/content`

## Development
Install deps and start:
```bash
npm install
npm run dev
```

## Notes
- Fonts and colors configured in `src/app/layout.js` and `globals.css`.
- API client in `src/app/utils/api.js`.
