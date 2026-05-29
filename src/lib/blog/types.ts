export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  content: string;
  content_markdown: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category: string;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  key_takeaways: string[];
  statistics: StatisticEntry[];
  faq: FaqEntry[];
  structured_data: Record<string, unknown> | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  scheduled_for: string | null;
  reading_time_minutes: number | null;
  word_count: number | null;
  author_name: string;
  author_avatar_url: string | null;
  author_bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface StatisticEntry {
  stat: string;
  source: string;
  source_url?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface BlogPostCard {
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category: string;
  published_at: string | null;
  reading_time_minutes: number | null;
  author_name: string;
}

export interface CategoryCount {
  category: string;
  count: number;
}
