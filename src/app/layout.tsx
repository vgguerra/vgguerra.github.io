import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vgguerra.github.io"),
  title: {
    default: "Victor Guerra · AI Software Engineer",
    template: "%s · Victor Guerra",
  },
  description:
    "Notas técnicas sobre engenharia de software com IA: RAG, sistemas multi-agente, avaliação de agentes e prática diária com LLMs.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Victor Guerra",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border">
          <div className="mx-auto max-w-2xl flex items-center justify-between px-6 py-6">
            <Link href="/" className="font-semibold tracking-tight">
              vgguerra
            </Link>
            <nav className="text-sm text-muted flex gap-6">
              <Link href="/" className="hover:text-foreground transition">
                blog
              </Link>
              <Link
                href="https://github.com/vgguerra"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                github
              </Link>
              <Link
                href="https://www.linkedin.com/in/victor-guerra-9597101b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                linkedin
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto max-w-2xl px-6 py-8 text-sm text-muted">
            © {new Date().getFullYear()} Victor Guerra
          </div>
        </footer>
      </body>
    </html>
  );
}
