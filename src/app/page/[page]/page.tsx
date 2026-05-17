import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { totalPages } from "@/lib/posts";
import { PostsList } from "@/components/posts-list";

type Params = { page: string };

export function generateStaticParams(): Params[] {
  const pages = totalPages("pt");
  // Static export requires at least one param even when there are no extra
  // pages yet. The handler below 404s when n is out of range, so the
  // sentinel emits /page/2/ as a 404 until real pagination kicks in.
  if (pages <= 1) return [{ page: "2" }];
  return Array.from({ length: pages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Posts · página ${page}`,
    alternates: { canonical: `/page/${page}/` },
  };
}

export default async function PaginatedHome({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 2 || n > totalPages("pt")) notFound();
  return <PostsList locale="pt" page={n} />;
}
