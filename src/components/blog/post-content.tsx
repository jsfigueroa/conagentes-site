import type { BlogPost } from "@/lib/blog/types";
import Image from "next/image";
import { CategoryBadge } from "./category-badge";
import { Clock, Calendar } from "lucide-react";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <CategoryBadge category={post.category} size="md" />
        {post.reading_time_minutes && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} />
            {post.reading_time_minutes} min de lectura
          </span>
        )}
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-foreground mb-3">
        {post.title}
      </h1>

      {post.subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          {post.subtitle}
        </p>
      )}

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        {post.author_avatar_url && (
          <Image
            src={post.author_avatar_url}
            alt={post.author_name}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        )}
        <span className="font-medium text-foreground">{post.author_name}</span>
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          <time dateTime={post.published_at ?? undefined}>
            {formatDate(post.published_at)}
          </time>
        </span>
      </div>
    </header>
  );
}

// «En corto» — the self-contained answer, first thing in the article. Rendered
// as real DOM text (never behind a click) and mirrored as schema `abstract` +
// `speakable`, so an answer engine can lift it verbatim. See lib/blog/answer.ts.
export function PostAnswer({ answer }: { answer: string | null }) {
  if (!answer) return null;

  return (
    <section className="post-answer mb-8 rounded-[var(--r-lg)] border border-border bg-card p-6">
      <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        En corto
      </h2>
      <p className="text-base leading-relaxed text-foreground">{answer}</p>
    </section>
  );
}

// Cited statistics — sourced numbers are exactly what LLM answer engines quote
// and what builds E-E-A-T. Renders each stat with a linked source. (CON-025, B2.4)
export function PostStatistics({ stats }: { stats: BlogPost["statistics"] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="my-8 grid gap-4 sm:grid-cols-2">
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-[var(--r-lg)] border border-border bg-card p-5"
        >
          <p className="text-base font-semibold leading-snug text-foreground">
            {s.stat}
          </p>
          {s.source && (
            <p className="mt-2 text-xs text-muted-foreground">
              Fuente:{" "}
              {s.source_url ? (
                <a
                  href={s.source_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="underline hover:text-foreground"
                >
                  {s.source}
                </a>
              ) : (
                s.source
              )}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}

// Author box — visible authorship/attribution at the end of the article (E-E-A-T).
export function AuthorBox({ post }: { post: BlogPost }) {
  if (!post.author_bio) return null;

  return (
    <section className="mt-10 flex gap-4 rounded-[var(--r-lg)] border border-border bg-card p-6">
      {post.author_avatar_url && (
        <Image
          src={post.author_avatar_url}
          alt={post.author_name}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
      )}
      <div>
        <p className="font-semibold text-foreground">{post.author_name}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {post.author_bio}
        </p>
      </div>
    </section>
  );
}

export function KeyTakeaways({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div className="bg-neon-soft/50 border border-neon/20 rounded-[var(--r-lg)] p-6 mb-8">
      <h2 className="text-sm font-bold uppercase tracking-wider text-neon-deep mb-3">
        Puntos clave
      </h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground">
            <span className="text-neon-deep font-bold mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PostBody({ html }: { html: string }) {
  // Wrap tables so a wide comparison table scrolls inside its own container
  // instead of pushing the page sideways on a phone. The generated HTML always
  // uses bare <table> tags (see docs/blog-hotel-playbook.md §9).
  const withScrollableTables = html
    .replace(/<table(\s|>)/g, '<div class="prose-table"><table$1')
    .replace(/<\/table>/g, "</table></div>");

  return (
    <div
      className="prose-blog max-w-none"
      dangerouslySetInnerHTML={{ __html: withScrollableTables }}
    />
  );
}

export function PostFaq({ faq }: { faq: BlogPost["faq"] }) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Preguntas frecuentes
      </h2>
      <div className="space-y-5">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group bg-card border border-border rounded-[var(--r-md)] overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-medium text-foreground hover:bg-muted/50 transition-colors">
              {item.question}
              <span className="text-muted-foreground group-open:rotate-45 transition-transform text-xl leading-none">
                +
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
