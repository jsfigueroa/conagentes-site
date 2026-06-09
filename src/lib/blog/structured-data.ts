import type { BlogPost } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

// "Equipo conagentes" (org byline) is represented as an Organization author;
// any other byline is treated as a named Person. Both carry a description (bio)
// + url for E-E-A-T. LLMs and Google both reward attributable, authoritative
// authorship over anonymous content.
function buildAuthor(post: BlogPost) {
  const isOrg = /equipo\s+conagentes/i.test(post.author_name);
  return {
    "@type": isOrg ? "Organization" : "Person",
    name: post.author_name,
    url: isOrg ? SITE_URL : `${SITE_URL}/blog`,
    ...(post.author_bio ? { description: post.author_bio } : {}),
    ...(post.author_avatar_url ? { image: post.author_avatar_url } : {}),
  };
}

export function generateArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: buildAuthor(post),
    publisher: {
      "@type": "Organization",
      name: "conagentes",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords:
      post.tags && post.tags.length > 0 ? post.tags.join(", ") : undefined,
    wordCount: post.word_count || undefined,
    inLanguage: "es-CO",
  };
}

export function generateFaqJsonLd(post: BlogPost) {
  if (!post.faq || post.faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generic BreadcrumbList builder. Pass ordered crumbs; the last one typically
 * omits `url` (it's the current page). Used by the blog list + category pages.
 */
export function generateBreadcrumbList(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function generateBreadcrumbJsonLd(
  post: BlogPost,
  categoryLabel?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel || post.category,
        item: `${SITE_URL}/blog/categoria/${post.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
      },
    ],
  };
}
