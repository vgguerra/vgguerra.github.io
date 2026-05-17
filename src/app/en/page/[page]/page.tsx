import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { totalPages } from "@/lib/posts";
import { PostsList } from "@/components/posts-list";

type Params = { page: string };

export function generateStaticParams(): Params[] {
  const pages = totalPages("en");
  // See PT counterpart for rationale on the sentinel param.
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
    title: `Posts · page ${page}`,
    alternates: { canonical: `/en/page/${page}/` },
  };
}

export default async function PaginatedHomeEn({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 2 || n > totalPages("en")) notFound();
  return <PostsList locale="en" page={n} />;
}
