import type { BlogPost } from "./types";
import { getPostAnswer } from "./answer";
import {
  blogBasePath,
  getCategoryLabel,
  postPathForCategory,
  categoryPath,
  verticalForCategory,
} from "./verticals";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

// "Equipo conagentes" (org byline) is represented as an Organization author;
// any other byline is treated as a named Person. Both carry a description (bio)
// + url for E-E-A-T. LLMs and Google both reward attributable, authoritative
// authorship over anonymous content.
function buildAuthor(post: BlogPost) {
  const isOrg = /equipo\s+conagentes/i.test(post.author_name);
  const vertical = verticalForCategory(post.category);
  return {
    "@type": isOrg ? "Organization" : "Person",
    name: post.author_name,
    url: isOrg ? SITE_URL : `${SITE_URL}${blogBasePath(vertical)}`,
    ...(post.author_bio ? { description: post.author_bio } : {}),
    ...(post.author_avatar_url ? { image: post.author_avatar_url } : {}),
  };
}

export function generateArticleJsonLd(post: BlogPost) {
  const answer = getPostAnswer(post);

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
      "@id": `${SITE_URL}${postPathForCategory(post.category, post.slug)}`,
    },
    articleSection: getCategoryLabel(post.category),
    keywords:
      post.tags && post.tags.length > 0 ? post.tags.join(", ") : undefined,
    wordCount: post.word_count || undefined,
    inLanguage: "es-CO",
    isAccessibleForFree: true,
    // Entity grounding: the category as the subject, the tags as the entities
    // mentioned. Answer engines resolve these to real-world things, which is how
    // an article gets retrieved for "comisión de Booking en Colombia" instead of
    // only for its exact title.
    about: {
      "@type": "Thing",
      name: getCategoryLabel(post.category),
    },
    mentions:
      post.tags && post.tags.length > 0
        ? post.tags.map((t) => ({
            "@type": "Thing",
            name: t.replace(/-/g, " "),
          }))
        : undefined,
    // Every sourced statistic, machine-readable: what we claim and who said it.
    citation:
      post.statistics && post.statistics.length > 0
        ? post.statistics.map((s) => ({
            "@type": "CreativeWork",
            name: s.source,
            ...(s.source_url ? { url: s.source_url } : {}),
            description: s.stat,
          }))
        : undefined,
    // The token-cheap twin of this page, for agents that prefer markdown.
    ...(verticalForCategory(post.category) === "hotel"
      ? {
          encoding: {
            "@type": "MediaObject",
            encodingFormat: "text/markdown",
            contentUrl: `${SITE_URL}/hoteles/blog/${post.slug}/md`,
          },
        }
      : {}),
    // The «En corto» block, exposed the two ways answer engines read a short
    // quotable answer: as the article's abstract and as its speakable span.
    ...(answer
      ? {
          abstract: answer,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".post-answer"],
          },
        }
      : {}),
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
  // Hotel posts hang off /hoteles, so their trail is
  // Inicio › Hoteles › Blog hotelero › Categoría › Artículo.
  const vertical = verticalForCategory(post.category);
  const trail: { name: string; url?: string }[] = [
    { name: "Inicio", url: SITE_URL },
  ];

  if (vertical === "hotel") {
    trail.push({ name: "Hoteles", url: `${SITE_URL}/hoteles` });
    trail.push({ name: "Blog hotelero", url: `${SITE_URL}/hoteles/blog` });
  } else {
    trail.push({ name: "Blog", url: `${SITE_URL}/blog` });
  }

  trail.push({
    name: categoryLabel || getCategoryLabel(post.category),
    url: `${SITE_URL}${categoryPath(vertical, post.category)}`,
  });
  trail.push({ name: post.title });

  return generateBreadcrumbList(trail);
}
