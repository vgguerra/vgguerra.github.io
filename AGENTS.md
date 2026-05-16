# AGENTS.md

Notes for AI coding agents working on this blog.

## What this is

Personal technical blog of Victor Guerra (vgguerra). Static site, GitHub Pages.

See [README.md](./README.md) for the full picture.

## Stack

- Next.js 16 · App Router · `output: 'export'` (Static Export)
- TypeScript strict
- Tailwind CSS 4 (CSS-first config via `@theme inline` in `globals.css`)
- MDX via `next-mdx-remote/rsc`
- Syntax highlight: `rehype-pretty-code` + Shiki

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Key paths

- `content/posts/*.mdx`: blog posts (one file per post, slug = filename)
- `src/lib/posts.ts`: reads posts from filesystem, parses frontmatter
- `src/app/page.tsx`: home (post list + intro)
- `src/app/blog/[slug]/page.tsx`: post page (uses `generateStaticParams`)
- `src/app/layout.tsx`: site shell (header, footer, fonts, metadata)
- `src/app/globals.css`: Tailwind 4 theme tokens

## Adding a post

1. Create `content/posts/AAAA-MM-titulo.mdx` with the frontmatter from README.md.
2. `npm run dev` to preview.
3. `npm run build` to verify static export.

## Conventions

- Commits: lowercase imperative, conventional style (`fix:`, `feat:`, `docs:`)
- Do not include `Co-Authored-By` in commits
- Default content language: PT-BR. EN posts welcome but go in `content/posts/en/` (when that path exists).
- Prefer canonical Tailwind classes (`text-muted`) over arbitrary values (`text-(--muted)`); the linter will warn either way.
- Static export only: no Server Actions, no dynamic routes without `generateStaticParams`, no `cookies()`/`headers()`.

## Don't

- Don't introduce runtime data fetching; site must build to fully static HTML.
- Don't add image optimization with the default loader; the static export doesn't support it.
- Don't commit `out/` or `.next/`.

## Deploy

Push to `main` → [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) builds and publishes to GitHub Pages.
