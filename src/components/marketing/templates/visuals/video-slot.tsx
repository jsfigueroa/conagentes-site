import type { Section } from "@/content/pages";

type VideoSection = Extract<Section, { type: "video" }>;

const ASPECT: Record<string, string> = {
  "16/9": "aspect-video",
  "9/16": "aspect-[9/16] max-w-[340px] mx-auto",
  "1/1": "aspect-square max-w-[560px] mx-auto",
};

/**
 * Video slot. Renders NOTHING until `src` is filled, so the content registry can
 * declare where a film goes before the film exists — no placeholder ever ships
 * to a visitor. When a src IS present, the caption below is not decoration: it
 * is what an assistant reads instead of the pixels, so it must state what the
 * video demonstrates in a full sentence.
 *
 * Files live in /public/video/. Always ship a poster so there is no layout
 * shift and something meaningful renders before play.
 */
export function VideoSlot({ s }: { s: VideoSection }) {
  if (!s.src) return null;
  return (
    <figure className="mx-auto max-w-4xl">
      <div
        className={`overflow-hidden rounded-3xl border border-border bg-ink ${
          ASPECT[s.aspect ?? "16/9"]
        }`}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="h-full w-full object-cover"
          src={s.src}
          poster={s.poster}
          controls
          playsInline
          preload="metadata"
        />
      </div>
      {s.caption && (
        <figcaption className="mt-4 text-center text-[13px] leading-relaxed text-muted-foreground">
          {s.caption}
        </figcaption>
      )}
    </figure>
  );
}
