# Propel CRM

A CRM for real estate agents.

## Features

- Docker setup for Development and Production.
- Session based cookie authentication

## Architecture

### Client

- Tailwind / Shadcn UI (Radix)
  - `./client/src/components/ui` contain shadcn components and everything in
  - `./client/src/components` contain my extension / customization of them as well as my own
- Vite
- React
- React Router
- React Query / React Context

### Server

- Node
- Express

### Database

- PostgreSQL (Neon)
- Drizzle ORM

### Containerization

- Docker

## Getting Started

Populate `./server/.env.example` with your own postgreSQL credentials and:

### Without Docker

`git clone https://github.com/0xcire/Propel-CRM.git propel-crm` \
`cd propel-crm` \
from `propel-crm` ... \
`cd server && npm install && npm run dev` \
`cd client && npm install && npm run dev` \
open up `http://localhost:5173/` in your browser

### With Docker (recommended)

`git clone https://github.com/0xcire/Propel-CRM.git propel-crm` \
`cd propel-crm` \
`docker compose -f docker-compose.dev.yml up` to run in dev mode & \
`docker compose up` to run in prod

### Interacting with DB via Drizzle

Ensure `server/drizzle.config.ts` is properly configured and:

`npm exec drizzle-kit generate:pg` to run migrations \
`npm exec drizzle-kit introspect:pg` to generate schemas based on existing db \
`npm exec drizzle-kit drop` to delete previously generated migrations \
`npm exec drizzle-kit studio` to use Drizzle ORM's new feature to explore your db \
see more commands [here](https://orm.drizzle.team/kit-docs/commands)

## Learning Points

- Docker

  - Containerizing both client and server separately
  - Writing separate configs for dev and prod
    - Trying to follow best practices as necessary
  - Using nginx as a reverse proxy server
  - Using docker-compose to sync app together

- Authentication

  - Differences between JWT and Session/Cookie based auth

## Successes

- Implemented Session/Cookie based authentication

## Issues

- React Query and Forms.
  - Ran into issues where default values were not updated after invalidating queries on mutation success.
  - [this TK Dodo article](https://tkdodo.eu/blog/react-query-and-forms) really helped me out

## Roadmap

### MVP Features

- [x] adding **full** Docker support
- [x] auth MVP
  - [x] user can sign up
  - [x] user can sign in
  - [x] user can sign out
- [x] user-slice MVP
  - [x] user can create account
  - [x] user can update their own account details (username, email, password)
  - [x] user can delete their own account
- [ ] contacts-slice MVP
  - [x] user can get all related contacts
  - [x] user can add a contact
  - [x] user can update a contact
  - [x] user can delete a contact
  - [ ] on dashboard, user gets a side panel to view contacts (like valorant, csgo, discord, etc...)
  - [ ] dashboard should have a '+' button that shows dropdown for adding contact, task, listing, etc
  - [ ] full contacts page
- [ ] tasks-slice MVP
- [ ] listings-slice MVP
- [ ] analytics-slice MVP

### Full Features

- [ ] auth / user-slice

  - [ ] refresh token
  - [ ] email confirmation
  - [ ] account recovery
  - [ ] 2fa opt-in
  - [ ] disable account
  - [ ] framer-motion left/right page transitions between sign-in and sign-up

- [ ] contacts-slice (depending on how other features are built out...)

  - [ ] listings may show potential contacts associated
  - [ ] certain tasks may have associated contacts
  - [ ] sending follow up texts or emails to contacts, etc

- [ ] detect purely mobile viewport and replace dialog components with [Vaul](https://github.com/emilkowalski/vaul)
