import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, allPageParams } from "@/content/pages";
import { MarketingPageView } from "@/components/marketing/templates/marketing-page";

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return allPageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: "/" + page.slug },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: "/" + page.slug,
      type: "website",
    },
  };
}

export default async function CatchAllMarketingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();
  return <MarketingPageView page={page} />;
}
