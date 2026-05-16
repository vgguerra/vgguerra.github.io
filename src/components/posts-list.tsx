import Link from "next/link";
import { getAllPosts, type Locale } from "@/lib/posts";
import { formatDate, pathFor, t } from "@/lib/i18n";

export function PostsList({ locale }: { locale: Locale }) {
  const posts = getAllPosts(locale);
  const strings = t[locale];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <section className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Victor Guerra
        </h1>
        <p className="text-muted leading-relaxed">{strings.intro}</p>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wider text-muted mb-6">
          {strings.postsHeading}
        </h2>
        {posts.length === 0 ? (
          <p className="text-muted">{strings.empty}</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={pathFor(locale, post.slug)}
                  className="group block"
                >
                  <h3 className="font-medium group-hover:underline underline-offset-4 decoration-muted">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    {post.description}
                  </p>
                  <time className="text-xs text-muted mt-2 block">
                    {formatDate(post.date, locale)}
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
