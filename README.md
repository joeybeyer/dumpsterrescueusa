# Dumpster Rescue USA — Next.js Static Export

## Quick start
- `npm install`
- `npm run build` (runs static file generation and creates `out/`)

## Key routes
- `/services/` + `/services/[serviceSlug]/`
- `/locations/` + `/locations/[citySlug]/`
- `/about/`, `/contact/`, `/pricing/`, `/gallery/`

## SEO assets
- `public/sitemap.xml`
- `public/robots.txt`
- `public/llms.txt`
- `deploy/redirects.conf`

## Deployment
- Use `scripts/deploy.sh` on the server (builds and syncs `out/`).
- Configure Nginx using `deploy/nginx.conf`.
