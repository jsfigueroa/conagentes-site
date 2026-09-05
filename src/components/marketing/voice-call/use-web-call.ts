"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives one browser call with the conagentes sales agent (CON-260).
 *
 * `livekit-client` is imported DYNAMICALLY, inside `start()`. It is a large
 * dependency and every visitor to the hotel pages would otherwise download it
 * to render a button most of them never press — so it loads on the click, in
 * parallel with the network round-trip that mints the room.
 *
 * Everything the browser needs comes from `/api/web-call` on the app domain:
 * a realtime URL and a room-scoped join token. The site holds no LiveKit
 * credentials, and the token it receives can only join the one room it was
 * minted for.
 */

export type CallPhase =
  | "idle"
  | "requesting-mic"
  | "connecting"
  | "live"
  | "ended"
  | "error";

/** What the visitor is told when something goes wrong. Never a stack trace. */
const MIC_DENIED =
  "Necesitamos el micrófono para hablar. Actívelo en su navegador y vuelva a intentar.";
const GENERIC_ERROR =
  "No pudimos conectar la llamada. Intente de nuevo en un momento.";

interface RoomLike {
  connect: (url: string, token: string) => Promise<void>;
  disconnect: () => Promise<void> | void;
  on: (event: string, cb: (...args: unknown[]) => void) => void;
  localParticipant: {
    setMicrophoneEnabled: (enabled: boolean) => Promise<unknown>;
  };
}

export function useWebCall(appUrl: string) {
  const [phase, setPhase] = useState<CallPhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const roomRef = useRef<RoomLike | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  // Call timer. Also how the visitor sees that a silent call is still alive.
  useEffect(() => {
    if (phase !== "live") return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  const cleanup = useCallback(() => {
    try {
      roomRef.current?.disconnect();
    } catch {
      // Disconnecting a room that already dropped is not an error worth showing.
    }
    roomRef.current = null;
    if (audioElRef.current) {
      audioElRef.current.srcObject = null;
      audioElRef.current.remove();
      audioElRef.current = null;
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const hangUp = useCallback(() => {
    cleanup();
    setPhase("ended");
    setAgentSpeaking(false);
  }, [cleanup]);

  const start = useCallback(async () => {
    setError(null);
    setSeconds(0);
    setMuted(false);
    setPhase("requesting-mic");

    // Ask for the microphone FIRST. If the visitor declines, we have not spent
    // a cent and no agent is left sitting in an empty room.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setError(MIC_DENIED);
      setPhase("error");
      return;
    }

    setPhase("connecting");

    try {
      const [{ Room, RoomEvent, Track }, res] = await Promise.all([
        import("livekit-client"),
        fetch(`${appUrl.replace(/\/$/, "")}/api/web-call`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }),
      ]);

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || GENERIC_ERROR);
        setPhase("error");
        return;
      }

      const { ws_url, token } = (await res.json()) as { ws_url: string; token: string };

      const room = new Room({ adaptiveStream: false, dynacast: false });
      roomRef.current = room as unknown as RoomLike;

      // The agent's voice. Appended to the document because some mobile browsers
      // will not play a detached element.
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioEl.style.display = "none";
      document.body.appendChild(audioEl);
      audioElRef.current = audioEl;

      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === Track.Kind.Audio && audioElRef.current) {
          track.attach(audioElRef.current);
        }
      });

      room.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
        // Anyone speaking who is not us is the agent — it is the only other
        // participant a web-rep room ever has.
        setAgentSpeaking(speakers.some((s) => !s.isLocal));
      });

      room.on(RoomEvent.Disconnected, () => {
        // The agent hangs up its own end when the conversation is over, so this
        // is a normal ending, not a failure.
        cleanup();
        setPhase("ended");
        setAgentSpeaking(false);
      });

      await room.connect(ws_url, token);
      await room.localParticipant.setMicrophoneEnabled(true);
      setPhase("live");
    } catch (err) {
      console.error("[web-call] connect failed:", err);
      cleanup();
      setError(GENERIC_ERROR);
      setPhase("error");
    }
  }, [appUrl, cleanup]);

  const toggleMute = useCallback(async () => {
    const room = roomRef.current;
    if (!room) return;
    const next = !muted;
    try {
      await room.localParticipant.setMicrophoneEnabled(!next);
      setMuted(next);
    } catch {
      // Leave the button where it was rather than lying about the mic state.
    }
  }, [muted]);

  const reset = useCallback(() => {
    cleanup();
    setPhase("idle");
    setError(null);
    setSeconds(0);
    setAgentSpeaking(false);
  }, [cleanup]);

  return { phase, error, muted, agentSpeaking, seconds, start, hangUp, toggleMute, reset };
}
