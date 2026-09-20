"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { useVoiceCall } from "./voice-call-context";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";
import { track } from "@/lib/analytics/client";
import { callInviteCopy } from "./call-invite-copy";

/**
 * The call invitation (CON-293).
 *
 * One second after the page loads, the visitor is offered the only thing on
 * this site that is not a claim about the product: the product itself, talking.
 * Reading the page is the slow path to believing us; hearing the agent answer a
 * question about their own hotel is the fast one, and it costs them one click.
 *
 * THREE DECISIONS WORTH KEEPING
 *
 * 1. **It is a sheet on a phone, not an interstitial.** Below 768px the card
 *    docks to the bottom edge with no dimming backdrop and no scroll lock, so
 *    it never covers the content a visitor arrived from Google to read. A
 *    full-screen overlay on a mobile search landing is the exact pattern
 *    Google's intrusive-interstitial guidance penalises, and organic + GEO is
 *    the whole acquisition strategy — so the one surface where an aggressive
 *    popup would pay is the one surface where it would quietly cost rankings.
 *    On desktop, where that rule does not apply, it is a real modal dialog.
 *
 * 2. **It remembers.** A popup with no memory is a popup that fires on every
 *    visit, and the second firing converts nobody while annoying everybody. A
 *    dismissal buys silence for a week; taking the call buys a month.
 *
 * 3. **It never lands on top of something else.** If the visitor already opened
 *    the call panel or the demo form inside that first second, the timer finds
 *    them busy and stands down permanently for the page load.
 */

/** Sebastián's spec, verbatim: one second after the page loads. */
const DELAY_MS = 1000;

const STORAGE_KEY = "cga_call_invite";
const DISMISS_DAYS = 7;
const CONVERTED_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Below this the card docks to the bottom edge instead of taking over. */
const COMPACT_QUERY = "(max-width: 767px)";

function suppressedUntil(): number {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    // Safari in private mode throws on localStorage. A visitor whose browser
    // refuses to remember gets the popup again — that is the failure we want,
    // not a crash on the marketing site's most-visited route.
    return 0;
  }
}

function suppressFor(days: number): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + days * DAY_MS));
  } catch {
    /* see above */
  }
}

type DismissReason = "cerrar" | "escape" | "fondo" | "secundario";

export function CallInvitePopup() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { open, isOpen: callOpen } = useVoiceCall();
  const { isOpen: formOpen } = useDemoForm();

  const [visible, setVisible] = useState(false);
  const [compact, setCompact] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const shownAt = useRef(0);
  // Read inside the timeout callback, which would otherwise close over the
  // `false` these had at mount and open the popup on top of a live call.
  const busyRef = useRef(false);
  busyRef.current = callOpen || formOpen;

  const copy = callInviteCopy(pathname || "/");

  // --- when to appear ------------------------------------------------------

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CALL_POPUP_ENABLED === "false") return;
    if (Date.now() < suppressedUntil()) return;

    const timer = window.setTimeout(() => {
      if (busyRef.current) return;
      setVisible(true);
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
    // Deliberately mount-only. The marketing layout survives client-side
    // navigation, so re-running this per route would re-invite somebody who is
    // already three pages deep and has clearly not needed inviting.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Media query in state rather than CSS: the modal SEMANTICS differ, not just
  // the looks, and `aria-modal` cannot be set from a stylesheet. Safe from
  // hydration mismatch because nothing renders until the timer fires.
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY);
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!visible) return;
    shownAt.current = Date.now();
    track("promo_view", { promo: copy.promo, compact });
    // `compact` omitted: the impression is one sighting, not one per resize.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // --- leaving -------------------------------------------------------------

  const dismiss = useCallback(
    (how: DismissReason) => {
      setVisible(false);
      suppressFor(DISMISS_DAYS);
      track("promo_dismiss", {
        promo: copy.promo,
        how,
        // How long it was on screen separates a reflex swat from a read and a
        // considered no — which have opposite fixes (move it later vs rewrite
        // the punchline).
        seconds: Math.round((Date.now() - shownAt.current) / 1000),
      });
    },
    [copy.promo]
  );

  const accept = useCallback(() => {
    setVisible(false);
    suppressFor(CONVERTED_DAYS);
    track("promo_click", {
      promo: copy.promo,
      seconds: Math.round((Date.now() - shownAt.current) / 1000),
    });
    // `open` raises `voice_open`, so the existing voice funnel picks the
    // visitor up from here with no special-casing.
    open(copy.source);
  }, [copy.promo, copy.source, open]);

  // Escape always closes. On desktop the dialog is modal, so Tab is also kept
  // inside it — an uninvited overlay that leaves keyboard focus wandering over
  // the page behind it is worse than no overlay.
  useEffect(() => {
    if (!visible) return;

    const previous = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    // Focus the dialog itself, not the primary button: this appeared without
    // being asked for, and parking focus on «Llamar» turns a stray Enter into
    // a microphone prompt.
    if (!compact) node?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss("escape");
        return;
      }
      if (e.key !== "Tab" || compact || !node) return;
      const items = node.querySelectorAll<HTMLElement>("button:not([disabled])");
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (!compact) previous?.focus?.();
    };
  }, [visible, compact, dismiss]);

  // Scroll lock on desktop only — the sheet does not take the page over, so
  // freezing the page under it would just break reading.
  useEffect(() => {
    if (!visible || compact) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible, compact]);

  // --- render --------------------------------------------------------------

  const enter = reduce
    ? { opacity: 1 }
    : compact
      ? { opacity: 1, y: 0 }
      : { opacity: 1, y: 0, scale: 1 };
  const from = reduce
    ? { opacity: 0 }
    : compact
      ? { opacity: 0, y: 24 }
      : { opacity: 0, y: 16, scale: 0.97 };

  // NO AnimatePresence here, and that is deliberate — read before adding one.
  //
  // Wrapping this in AnimatePresence to get an exit fade left the overlay
  // mounted indefinitely after dismissal: the exit animation ran to completion
  // (opacity 0) and the node was never removed. Reproduced in a PRODUCTION
  // build, so it is not a StrictMode artifact; `elementFromPoint` at the centre
  // of the viewport then returned the invisible card, i.e. the entire page had
  // stopped accepting clicks. The sibling `VoiceCallModal` does unmount
  // correctly with the same library, so this is some interaction specific to
  // this tree rather than a plain misuse — which is exactly why it is not worth
  // depending on. A plain conditional is removed by React synchronously and
  // cannot fail this way. The cost is that dismissal is instant instead of
  // fading, which for a popup somebody is swatting away is not a cost at all.
  return (
    <>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0.12 : 0.2 }}
          className={
            compact
              ? "fixed inset-x-0 bottom-0 z-[95] p-3"
              : "fixed inset-0 z-[95] flex items-center justify-center p-4"
          }
          style={compact ? { paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" } : undefined}
          onClick={(e) => {
            if (!compact && e.target === e.currentTarget) dismiss("fondo");
          }}
        >
          {!compact && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[oklch(0.08_0.01_95/0.72)] backdrop-blur-[2px]"
            />
          )}

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal={compact ? undefined : true}
            aria-labelledby="call-invite-title"
            aria-describedby="call-invite-body"
            tabIndex={-1}
            initial={from}
            animate={enter}
            transition={{ duration: reduce ? 0.12 : 0.26, ease: [0.16, 1, 0.3, 1] }}
            className={`relative border border-border bg-card text-card-foreground shadow-2xl outline-none ${
              compact
                ? "mx-auto w-full max-w-lg rounded-3xl p-5"
                : "w-full max-w-lg rounded-3xl p-8"
            }`}
          >
            <button
              type="button"
              onClick={() => dismiss("cerrar")}
              aria-label="Cerrar la invitación"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className={compact ? "flex items-start gap-4 pr-10" : ""}>
              {/* Same avatar the call panel opens with, so the popup reads as
                  the front door of that panel rather than as a second thing.
                  The WRAPPER carries the size, not the disc: the ring below is
                  `inset-0`, and on a block-level parent that made it a bar the
                  full width of the card. */}
              <div
                className={`relative shrink-0 ${compact ? "h-12 w-12 text-lg" : "h-16 w-16 text-2xl"}`}
              >
                {/* CSS, not framer-motion, and the reason is load-bearing:
                    AnimatePresence will not unmount an exiting subtree until
                    every animation inside it has finished, and an infinitely
                    repeating one never finishes. As a motion component this
                    ring pinned the whole full-screen overlay in the DOM
                    permanently after a dismissal — invisible at opacity 0, and
                    swallowing every click on the page behind it. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full bg-[var(--orange)]/25 [animation-duration:2s] motion-reduce:hidden"
                />
                <div
                  className="relative grid h-full w-full place-items-center rounded-full font-extrabold text-white"
                  style={{ backgroundImage: "var(--brand-gradient-strong)" }}
                >
                  V
                </div>
              </div>

              <div className={compact ? "min-w-0" : "mt-5"}>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-tint-soft px-3 py-1 text-xs font-semibold tracking-wide text-[var(--orange-deep)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" aria-hidden="true" />
                  Demostración en vivo
                </span>

                <h2
                  id="call-invite-title"
                  className={`mt-3 font-extrabold tracking-tight text-balance ${
                    compact ? "text-lg leading-snug" : "text-2xl leading-tight"
                  }`}
                >
                  {copy.title}
                </h2>

                {/* The phone gets the short body. Every line here is a line of
                    the page it is sitting on top of, and the sheet has to stay
                    a banner rather than become the interstitial this component
                    exists to avoid. */}
                <p id="call-invite-body" className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">{copy.lead}</strong>{" "}
                  {compact ? copy.bodyShort : copy.body}
                </p>
              </div>
            </div>

            <div className={`flex gap-3 ${compact ? "mt-4" : "mt-7 flex-col sm:flex-row"}`}>
              <button
                type="button"
                onClick={accept}
                className={`btn-brand inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full py-4 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)] ${
                  compact ? "px-4" : "px-7"
                }`}
              >
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                Llamar a Valentina
              </button>
              {/* No «Ahora no» on the sheet. Side by side at 375px it forced
                  the primary label onto two lines, and stacked it pushed the
                  sheet past half the screen — for a second way to do what the
                  44px × at the top right already does, one thumb-reach away. */}
              {!compact && (
                <button
                  type="button"
                  onClick={() => dismiss("secundario")}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-border px-7 py-4 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
                >
                  Ahora no
                </button>
              )}
            </div>

            {!compact && (
              <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                Se habla desde el navegador, sin instalar nada. Usamos su micrófono solo mientras dure
                la llamada.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
