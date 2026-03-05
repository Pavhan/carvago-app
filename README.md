This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Lint

```bash
npm run lint
```
