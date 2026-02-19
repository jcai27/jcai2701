# Portfolio Website

This is a React + Vite portfolio site.

## Development

```sh
npm install
npm run dev
```

Open `http://localhost:8080/admin` to edit content from the admin panel.

## Supabase Server Persistence

1. Create `.env` from `.env.example` and set:
`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
2. Run `supabase/schema.sql` in your Supabase SQL editor.
3. Restart `npm run dev`.

When configured, admin edits are saved to Supabase and shared across devices.
Without env vars, the app falls back to browser-local storage.

Important: never expose your Postgres password in frontend code. Use only the Supabase anon key in `VITE_` variables.

## Build

```sh
npm run build
npm run preview
```
