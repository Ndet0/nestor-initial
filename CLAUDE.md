# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

**Frontend (React + Vite):**
- `npm run dev` - Start development server with HMR
- `npm run build` - Production build to `dist/`
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

**Backend (Express + SQLite):**
- `cd server && npm start` - Start API server on port 4000

## Architecture

This is a travel/adventure places discovery app for Kenya with a React frontend and Express API backend.

### Frontend (`src/`)
- **Routing:** React Router v7 in `App.jsx` with `BrowserRouter` wrapper in `main.jsx`
- **Layout:** Public pages use `Layout.jsx` (HeaderNav + Footer wrapper); landing and admin pages render standalone
- **Styling:** Tailwind CSS v4 + component-specific CSS files (co-located with JSX)
- **Data:** Static places data in `src/data/Places.js` with helper functions (`getPlaceById`, `getFeaturedPlaces`)
- **Icons:** lucide-react
- **Animations:** framer-motion

### Backend (`server/`)
- Express server with SQLite database (`nestor.db`)
- CORS enabled for cross-origin requests
- API endpoints at `/api/places` (GET all, POST create)
- JSON fields (images, highlights, facilities) stored as stringified JSON in SQLite

### Key Routes
- `/` - Landing page
- `/places` - Places listing with filtering
- `/place/:id` - Place detail view
- `/about`, `/contact` - Info pages
- `/admin` - Admin form for adding places (no layout wrapper)
