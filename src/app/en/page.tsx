import type { Metadata } from "next";
import { PostsList } from "@/components/posts-list";

export const metadata: Metadata = {
  title: "Victor Guerra · AI Software Engineer",
  description:
    "Notes on AI software engineering: RAG, multi-agent systems, LLM evaluation, day-to-day practice with LLMs.",
  alternates: { languages: { "pt-BR": "/", en: "/en/" } },
  openGraph: {
    locale: "en_US",
    siteName: "Victor Guerra",
  },
};

export default function Home() {
  return <PostsList locale="en" />;
}
