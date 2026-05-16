import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <section className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Victor Guerra
        </h1>
        <p className="text-muted leading-relaxed">
          AI Software Engineer. Construindo sistemas agentic em Python: RAG,
          multi-agentes, avaliação de LLMs. Notas sobre o que aprendo no caminho.
        </p>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-muted mb-6">
          Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-muted">Em breve.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}/`} className="group block">
                  <h3 className="font-medium group-hover:underline underline-offset-4 decoration-muted">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    {post.description}
                  </p>
                  <time className="text-xs text-muted mt-2 block">
                    {formatDate(post.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
