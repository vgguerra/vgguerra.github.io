import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { PostArticle } from "@/components/post-article";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts("en").map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("en", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: post.translation_slug
      ? {
          languages: {
            "pt-BR": `/blog/${post.translation_slug}/`,
            en: `/en/blog/${slug}/`,
          },
        }
      : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return <PostArticle locale="en" slug={slug} />;
}
