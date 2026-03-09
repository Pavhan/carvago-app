This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Coding conventions

- Internal components in `src/components/**` use named exports and named imports.
- Next.js route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) use default exports as required by Next.
- React components prefer `function` declarations; use arrow functions for callbacks/helpers.

## PostgreSQL + Drizzle ORM setup

Aplikace používá PostgreSQL přes Drizzle ORM.

### 1) Lokální databáze

```bash
docker compose up -d
cp .env.example .env.local
# (volitelné) proměnné pro Vercel najdeš v .env.vercel.example
```

Lokální `DATABASE_URL` je nastavená na DB `cars`.

### 2) Vercel databáze

Na Vercelu nastav proměnnou `DATABASE_URL` (nebo `POSTGRES_URL`).
Doporučený přehled proměnných je v `.env.vercel.example`.
Aplikace automaticky použije dostupnou URL.

### 3) Vytvoření tabulek a seed

```bash
npm run db:push
npm run db:seed
```

Seed vloží 2 auta.

## Run app

```bash
npm run dev
```

Auta:
- Výpis: `/cars`
- Detail: `/cars/[slug]`
- Vytvoření nového auta: `/cars/new`

## Image thumbnails

Skript vytvoří zmenšené kopie obrázků (`-vf scale=20:-1`) do podsložky `thumbs` se stejným názvem souboru.

Výchozí cesta je `public/images/cars`:

```bash
npm run images:small
```

Vlastní cestu předáš jako argument:

```bash
npm run images:small -- public/images/cars
```

## Lint

```bash
npm run lint
```

## E2E tests (Playwright)

Run a single test with trace enabled:

```bash
npm run test:e2e -- tests/e2e/car-detail-back.spec.ts --trace on
```

Open the trace viewer:

```bash
npx playwright show-trace test-results/**/trace.zip
```
