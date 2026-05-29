import type { BlogPost } from "@/lib/blog/types";
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

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          {post.author_name}
        </span>
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
  return (
    <div
      className="prose-blog max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
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
