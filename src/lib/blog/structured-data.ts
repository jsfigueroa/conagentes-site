import type { BlogPost } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export function generateArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.cover_image_url || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "conagentes",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    wordCount: post.word_count,
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
