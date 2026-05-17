# vgguerra.github.io

Blog técnico de Victor Guerra. Notas práticas sobre AI Software Engineering: RAG, sistemas multi-agente, avaliação de LLMs.

## Stack

- Next.js 16 (App Router · Static Export)
- TypeScript
- Tailwind CSS 4 + `@tailwindcss/typography`
- MDX via `next-mdx-remote`
- `rehype-pretty-code` + Shiki para syntax highlight
- Deploy: GitHub Pages via GitHub Actions

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Adicionar um post

1. Criar arquivo em `content/posts/AAAA-MM-titulo.mdx`
2. Frontmatter mínimo:
   ```yaml
   ---
   title: "Título do post"
   description: "Resumo de uma linha que aparece na home."
   date: "2026-05-16"
   tags: ["tag-1", "tag-2"]
   draft: false
   ---
   ```
3. Escrever em MDX (Markdown com componentes React).
4. `npm run build` para gerar `out/`.

Posts com `draft: true` ficam fora da listagem e do build.

## Analytics (opcional)

Pageviews via [GoatCounter](https://www.goatcounter.com) (free, sem cookies). Para ativar:

1. Criar conta em [goatcounter.com](https://www.goatcounter.com) e escolher um subdomínio (ex.: `vgguerra.goatcounter.com`).
2. Adicionar uma **GitHub repository variable** chamada `GOATCOUNTER_ENDPOINT` com valor `https://vgguerra.goatcounter.com/count` em **Settings → Secrets and variables → Actions → Variables**.
3. Próximo push pra `main` injeta o script automaticamente.

Pra dev local: `cp .env.local.example .env.local` e preencher `NEXT_PUBLIC_GOATCOUNTER_ENDPOINT`.

Quando a variável está vazia, o script de tracking não é renderizado.

## Paginação

Configurada em [src/lib/posts.ts](src/lib/posts.ts) via constante `POSTS_PER_PAGE = 10`. Página 1 é sempre a raiz (`/` ou `/en/`); páginas 2+ ficam em `/page/N/` e `/en/page/N/`. O componente de paginação desaparece sozinho quando só há uma página.

## Build estático

```bash
npm run build
```

Saída em `out/`. Pode ser servido por qualquer host estático.

## Deploy

Push na `main` dispara o workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) que publica no GitHub Pages.

Pré-requisito no repo: **Settings → Pages → Source = GitHub Actions**.
