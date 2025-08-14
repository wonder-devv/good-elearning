# hope-elearning-backend

A backend API for the Hope e-learning platform built with NestJS, TypeORM and PostgreSQL.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Testing](#testing)
- [Database & Migrations](#database--migrations)
- [Contributing](#contributing)
- [License](#license)

---

## About

This repository contains the backend (NestJS) for an e-learning platform. It uses TypeORM with PostgreSQL, Firebase for authentication utilities, and jose for JWT verification.

## Features

- REST API built with NestJS
- TypeORM PostgreSQL integration
- Firebase integration for user verification and auth utilities
- JWT verification (remote JWKs)
- File storage (local) utilities
- Tests using Jest and e2e tests setup

## Prerequisites

- Node.js (recommend v18+)
- npm (or yarn)
- PostgreSQL (for local development or a connection string)
- Firebase service account (for some auth operations)

## Quick Start

Clone the repo:

```powershell
git clone <repo-url>
cd hope-elearning-backend
```

Install dependencies:

```powershell
npm install
```

Create a `.env` (see example below) with required configuration.

Run in development mode (auto-reload):

```powershell
npm run start:dev
```

Build and run production build:

```powershell
npm run build
npm run start:prod
```

---

## Environment Variables

Below are the common environment variables used by the app (add any that apply to your deployment):

```text
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_NAME=hope_db

# Firebase (either a JSON string of the service account or a path to the JSON file)
FIREBASE_SERVICE_ACCOUNT='{"type":"...","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----...","client_email":"..."}'
FIREBASE_API_KEY=your_firebase_api_key

# JWT/JWKs (for remote verification)
JWK_SET_URI=https://issuer.example.com/.well-known/jwks.json
ISSUER_URI=https://issuer.example.com

# Storage / Images
IMAGE_PATH=./images
IMAGE_URL=http://localhost:3000/images

# Application / admin
SUPER_USER_ID=admin-id
SUPER_USER_NAME=admin
```

Notes:
- `FIREBASE_SERVICE_ACCOUNT` may be set as the raw JSON string or a path to a JSON file. The service code expects the value that `firebase-admin`'s `cert()` helper accepts.
- TypeORM in this project is configured via env vars (DB_*). The TypeORM config in `src/core/database/database.module.ts` currently sets `synchronize: true` — this is convenient for development but not recommended for production.

---

## Scripts

The `package.json` includes the following useful scripts:

- `npm run start` - Start the app
- `npm run start:dev` - Start in watch mode (development)
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Run built production bundle
- `npm run build` - Compile TypeScript
- `npm run format` - Run Prettier
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:e2e` - Run e2e tests

---

## Testing

Unit tests and e2e tests are configured with Jest.

Run all tests:

```powershell
npm run test
```

Run e2e tests:

```powershell
npm run test:e2e
```

---

## Database & Migrations

This project uses TypeORM. The current configuration (in `src/core/database/database.module.ts`) has `synchronize: true`, which will automatically sync schema changes with the database in development. For production use, consider using migrations and disable `synchronize`.

A typical Postgres quick start using Docker:

```powershell
docker run --name hope-postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=postgres -e POSTGRES_DB=hope_db -p 5432:5432 -d postgres:15
```

---

## Contributing

Contributions are welcome. Please open an issue for discussion before submitting larger changes.

- Follow the existing code style
- Run tests and linters locally

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author

Phyo Htet Arkar


If you'd like, I can also add a sample `.env.example` file to the repo, or a short `docker-compose.yml` for local development—would you like me to add that? 👋