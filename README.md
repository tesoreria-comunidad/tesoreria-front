# Tesorería Comunidad Frontend

[Live Demo](https://tesoreria-front.vercel.app)  
[Repository](https://github.com/tesoreria-comunidad/tesoreria-front)

## Overview

This is the frontend for the "Tesorería Comunidad" system, designed to manage user, family, and fee data for a community or organization. It provides dashboards, user management, family records, fee tracking, and beneficiary management.

The application is built using **React**, **TypeScript**, **Vite**, and **TailwindCSS** for fast development and a modern UI/UX. Routing is handled via `react-router`, and state management uses Redux patterns.

## Features

- Dashboard with key metrics (active beneficiaries, families, current fee)
- User and family management
- Beneficiary tracking
- Cuota (fee) management
- Ramas (branches) management
- Role-based access (Master, Dirigente, Family, Beneficiary)
- Responsive design for mobile and desktop

## Tech Stack

- **React** (with hooks)
- **TypeScript**
- **Vite** (fast dev server and build tool)
- **TailwindCSS** (utility-first CSS)
- **Redux Toolkit** (for state management, via custom hooks)
- **React Router** (for page navigation)
- **Lucide React** (icons)
- **ESLint** (with recommended TypeScript and React plugins)

## Project Structure

- `src/pages/` - Contains main page components (dashboard, users, families, cuotas, ramas, etc.)
- `src/components/ui/` - UI components (inputs, badges, cards, calendar)
- `src/store/` - Redux store and hooks
- `src/routes/` - Application routes and role-based access configuration

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tesoreria-comunidad/tesoreria-front.git
   cd tesoreria-front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default Vite port).

4. **Build for production:**
   ```bash
   npm run build
   ```

## Configuration

- Vite config and TailwindCSS are pre-configured.
- All source code uses path alias `@` for `src/`.
- ESLint is set up for TypeScript and React (see `eslint.config.js`).
- See `package.json` for dependencies.

## Usage

- Log in to access the dashboard.
- Navigate between users, families, cuotas, and ramas.
- Actions are available based on your role (Master, Dirigente, Family, Beneficiary).

## Contributing

Pull requests and issues are welcome!  
Please follow the code style guidelines enforced by ESLint and use TypeScript for all new code.

## License

This project does not currently specify a license.

---

**Note:**  
Search results are limited to 10 files. For more code context, view the full repository on [GitHub](https://github.com/tesoreria-comunidad/tesoreria-front/search).
