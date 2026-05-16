import type { Locale } from "@/lib/posts";

export const locales = ["pt", "en"] as const;
export const defaultLocale: Locale = "pt";

type Strings = {
  intro: string;
  postsHeading: string;
  empty: string;
  backLink: string;
};

export const t: Record<Locale, Strings> = {
  pt: {
    intro:
      "AI Software Engineer. Construindo sistemas agentic em Python: RAG, multi-agentes, avaliação de LLMs. Notas sobre o que aprendo no caminho.",
    postsHeading: "Posts",
    empty: "Em breve.",
    backLink: "← voltar",
  },
  en: {
    intro:
      "AI Software Engineer. Building agentic systems in Python: RAG, multi-agent, LLM evaluation. Notes on what I learn along the way.",
    postsHeading: "Posts",
    empty: "Coming soon.",
    backLink: "← back",
  },
};

export function formatDate(iso: string, locale: Locale): string {
  if (!iso) return "";
  const tag = locale === "pt" ? "pt-BR" : "en-US";
  return new Date(iso).toLocaleDateString(tag, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function localeFromPathname(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "pt";
}

export function pathFor(locale: Locale, slug?: string): string {
  if (slug) {
    return locale === "pt"
      ? `/blog/${slug}/`
      : `/en/blog/${slug}/`;
  }
  return locale === "pt" ? "/" : "/en/";
}
