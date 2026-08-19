"use client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export function ShareButtons({
  path,
  title,
}: {
  /** Path of the post inside its hub, e.g. /hoteles/blog/mi-articulo */
  path: string;
  title: string;
}) {
  const url = `${SITE_URL}${path}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const channels = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      icon: "💬",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      icon: "💼",
    },
    {
      label: "X",
      href: `https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      icon: "𝕏",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">
        Compartir:
      </span>
      {channels.map((ch) => (
        <a
          key={ch.label}
          href={ch.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-neon-soft text-sm transition-colors"
          aria-label={`Compartir en ${ch.label}`}
        >
          {ch.icon}
        </a>
      ))}
    </div>
  );
}
