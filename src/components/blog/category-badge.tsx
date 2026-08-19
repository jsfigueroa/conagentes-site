import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  categoryPath,
  getCategoryLabel,
  verticalForCategory,
} from "@/lib/blog/verticals";

// Re-exported so existing importers keep working; the label map itself now
// lives in lib/blog/verticals.ts alongside the category taxonomy.
export { getCategoryLabel };

export function CategoryBadge({
  category,
  size = "sm",
  interactive = true,
  className,
}: {
  category: string;
  size?: "sm" | "md";
  interactive?: boolean;
  className?: string;
}) {
  const label = getCategoryLabel(category);
  const classes = cn(
    "inline-block rounded-full font-medium",
    size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1",
    "bg-neon-soft text-ink",
    interactive && "hover:bg-neon hover:text-ink transition-colors",
    className
  );

  if (interactive) {
    // The hub is derived from the category, so a badge always links inside its
    // own blog (a hotel category never points into the pymes archive).
    return (
      <Link
        href={categoryPath(verticalForCategory(category), category)}
        className={classes}
      >
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
