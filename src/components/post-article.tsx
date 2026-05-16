import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getPostBySlug, type Locale } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate, pathFor, t } from "@/lib/i18n";

export function PostArticle({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const post = getPostBySlug(locale, slug);
  if (!post || post.draft) notFound();

  const otherLocale: Locale = locale === "pt" ? "en" : "pt";
  const crossLinkLabel = locale === "pt" ? "read in english →" : "ler em português →";

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between text-sm text-muted">
        <Link
          href={pathFor(locale)}
          className="hover:text-foreground transition"
        >
          {t[locale].backLink}
        </Link>
        {post.translation_slug && (
          <Link
            href={pathFor(otherLocale, post.translation_slug)}
            className="hover:text-foreground transition lowercase"
          >
            {crossLinkLabel}
          </Link>
        )}
      </div>

      <header className="mt-8 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-muted">{post.description}</p>
        <time className="mt-4 block text-xs text-muted uppercase tracking-wider">
          {formatDate(post.date, locale)}
        </time>
      </header>

      <div className="prose max-w-none prose-headings:tracking-tight prose-a:underline-offset-4 prose-pre:p-0 prose-pre:bg-transparent">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: { light: "github-light", dark: "github-dark" },
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
