# ShelterX

ShelterX is an emergency shelter management and disaster-response frontend prototype. It presents shelter capacity, operational conditions, role-based workflows, and responsive navigation using mock data.

## Current stack

- React 19, TypeScript, and Vite
- Tailwind CSS
- Wouter and Recharts

## Current features

- Responsive landing page and navigation
- Login and sign-up UI with five demo roles
- Role-based dashboard navigation
- Shelter search, filters, detail pages, manager controls, and profile editing
- Static/mock data only

## Current status and architecture

The frontend prototype is implemented and working. Authentication is demo/frontend-only; there is no backend, database, API, real-time update service, or prediction system.

Current architecture: React frontend → mock/static data.

## Run the frontend

Requirements: Node.js 18+ and npm 9+.

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Available commands

```bash
npm run dev       # Start the development server
npm run typecheck # Type-check TypeScript
npm run build     # Create a production build
npm run serve     # Serve the production build locally
```

## Planned stack

React frontend → Flask backend → MySQL database.

Flask, MySQL integration, and production authentication are planned future work and are not implemented in this repository yet.
