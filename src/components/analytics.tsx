import Script from "next/script";

/**
 * Lightweight pageview tracking via GoatCounter.
 *
 * Activation requires NEXT_PUBLIC_GOATCOUNTER_ENDPOINT to be set at build
 * time (for example, https://vgguerra.goatcounter.com/count). When the var
 * is empty, the script is skipped entirely.
 */
export function Analytics() {
  const endpoint = process.env.NEXT_PUBLIC_GOATCOUNTER_ENDPOINT;
  if (!endpoint) return null;

  return (
    <Script
      src="//gc.zgo.at/count.js"
      data-goatcounter={endpoint}
      strategy="afterInteractive"
      async
    />
  );
}
