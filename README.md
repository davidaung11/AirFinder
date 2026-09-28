# AirFinder

Foundation for an air-conditioning service marketplace built with Next.js,
TypeScript, Tailwind CSS, PostgreSQL, Prisma, and Auth.js / NextAuth.

## Local setup

1. Copy `.env.example` to `.env`.
2. Replace the PostgreSQL placeholders in `DATABASE_URL`.
3. Generate a cryptographically secure random value and set `NEXTAUTH_SECRET`.
4. Install dependencies with `npm install`.
5. Generate the Prisma client with `npm run prisma:generate`.
6. Start the app with `npm run dev`.

No database models or migrations are included yet.

## Architecture boundaries

- `src/app` contains routing and presentation entry points.
- `src/server` contains server-only infrastructure such as the Prisma client.
- Future feature, service, and repository directories should be added only when
  the first concrete use case needs them.
- UI code must call feature/service abstractions and must not query Prisma
  directly.

## Quality commands

- `npm run lint`
- `npm run typecheck`
- `npm run format`
- `npm run format:check`
- `npm run build`
- `npm run prisma:validate`
