"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const targetLang = isEn ? "pt-BR" : "en";
  const fallback = isEn ? "/" : "/en/";

  const [alternateHref, setAlternateHref] = useState<string | null>(null);

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${targetLang}"]`
    );
    if (link) {
      const url = new URL(link.href);
      setAlternateHref(url.pathname);
    } else {
      setAlternateHref(null);
    }
  }, [pathname, targetLang]);

  return (
    <Link
      href={alternateHref ?? fallback}
      className="hover:text-foreground transition uppercase text-xs tracking-wider"
      aria-label={isEn ? "Mudar para português" : "Switch to English"}
    >
      {isEn ? "pt" : "en"}
    </Link>
  );
}
