import Link from "next/link";
import type { Locale } from "@/lib/posts";

type Props = {
  locale: Locale;
  page: number;
  totalPages: number;
};

function pageHref(locale: Locale, page: number): string {
  if (page <= 1) return locale === "pt" ? "/" : "/en/";
  return locale === "pt" ? `/page/${page}/` : `/en/page/${page}/`;
}

export function Pagination({ locale, page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const prevHref = pageHref(locale, page - 1);
  const nextHref = pageHref(locale, page + 1);
  const labelPrev = locale === "pt" ? "← anterior" : "← previous";
  const labelNext = locale === "pt" ? "próximo →" : "next →";
  const ofWord = locale === "pt" ? "de" : "of";

  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <nav className="mt-12 flex items-center justify-between text-sm text-muted">
      {isFirst ? (
        <span className="opacity-40 select-none">{labelPrev}</span>
      ) : (
        <Link href={prevHref} className="hover:text-foreground transition">
          {labelPrev}
        </Link>
      )}

      <span className="text-xs uppercase tracking-wider">
        {page} {ofWord} {totalPages}
      </span>

      {isLast ? (
        <span className="opacity-40 select-none">{labelNext}</span>
      ) : (
        <Link href={nextHref} className="hover:text-foreground transition">
          {labelNext}
        </Link>
      )}
    </nav>
  );
}
