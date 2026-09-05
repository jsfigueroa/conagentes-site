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
  /** 0..1 input level, so the visitor can SEE that we are hearing them. */
  const [micLevel, setMicLevel] = useState(0);
  /** True once the call has run a while with a mic that never made a sound. */
  const [micSeemsDead, setMicSeemsDead] = useState(false);

  const roomRef = useRef<RoomLike | null>(null);
  /**
   * ONE <audio> element PER remote track, never one shared element.
   *
   * The agent publishes TWO audio tracks: its speech, and a background ambience
   * bed. `track.attach(el)` points that element's srcObject at the given track,
   * so attaching the second track to the same element silently REPLACES the
   * first. That is exactly what happened on the first live call (CON-260):
   * the server logs showed five turns of ElevenLabs audio produced and
   * published, and the caller heard only the office ambience, because the
   * ambience track was subscribed last and took the element.
   *
   * Calling `attach()` with no argument lets livekit-client mint a dedicated
   * element per track, which is what its docs prescribe and what lets both
   * tracks play at once.
   */
  const audioElsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const micStreamRef = useRef<MediaStream | null>(null);
  const meterRef = useRef<{ ctx: AudioContext; raf: number } | null>(null);

  // Call timer. Also how the visitor sees that a silent call is still alive.
  useEffect(() => {
    if (phase !== "live") return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  /**
   * Watch the visitor's own input level.
   *
   * A voice widget that cannot show you whether it is hearing you turns a
   * dead microphone into a mystery — the caller talks, nothing happens, and
   * neither side knows why. This makes the failure visible: the meter moves, or
   * it does not, and after a while the panel says so in words.
   */
  const startLevelMeter = useCallback((stream: MediaStream) => {
    try {
      const ctx = new AudioContext();
      // Created after an `await`, so the click's activation may no longer apply
      // and the context starts suspended — in which case the analyser reads a
      // flat line forever. Left unresumed this does not merely break the meter:
      // it would tell a visitor with a perfectly good microphone that we cannot
      // hear them, which is worse than showing nothing.
      void ctx.resume().catch(() => {});
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      let peakSeen = 0;
      let runningSince: number | null = null;

      const tick = () => {
        // Only judge the input once the context is actually running; otherwise
        // "silent" means "we are not listening yet", not "your mic is dead".
        if (ctx.state === "running") {
          if (runningSince === null) runningSince = Date.now();
          analyser.getByteTimeDomainData(buf);
          let peak = 0;
          for (const v of buf) peak = Math.max(peak, Math.abs(v - 128) / 128);
          peakSeen = Math.max(peakSeen, peak);
          setMicLevel(peak);
          // Speech peaks well above this within a couple of seconds; a muted or
          // wrong input sits at essentially zero forever.
          if (Date.now() - runningSince > 8000) setMicSeemsDead(peakSeen < 0.02);
        }
        const raf = requestAnimationFrame(tick);
        if (meterRef.current) meterRef.current.raf = raf;
      };
      meterRef.current = { ctx, raf: requestAnimationFrame(tick) };
    } catch {
      // A missing AudioContext costs us the meter, never the call.
    }
  }, []);

  const stopLevelMeter = useCallback(() => {
    if (!meterRef.current) return;
    cancelAnimationFrame(meterRef.current.raf);
    void meterRef.current.ctx.close().catch(() => {});
    meterRef.current = null;
    setMicLevel(0);
    setMicSeemsDead(false);
  }, []);

  const cleanup = useCallback(() => {
    try {
      roomRef.current?.disconnect();
    } catch {
      // Disconnecting a room that already dropped is not an error worth showing.
    }
    roomRef.current = null;
    for (const el of audioElsRef.current.values()) {
      el.srcObject = null;
      el.remove();
    }
    audioElsRef.current.clear();
    stopLevelMeter();
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
  }, [stopLevelMeter]);

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
    //
    // The stream we get here is KEPT and handed to LiveKit below. The first
    // version acquired a stream, stopped its tracks, and let LiveKit acquire a
    // second one — two grabs of the same device, where the second can silently
    // land on a different default input. On the first real call the agent's
    // speech-to-text received a continuous stream but never completed a single
    // utterance, which is what a live-but-empty input track looks like from the
    // server. One acquisition removes that whole class of failure.
    let micStream: MediaStream;
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError(MIC_DENIED);
      setPhase("error");
      return;
    }
    micStreamRef.current = micStream;
    startLevelMeter(micStream);

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

      room.on(RoomEvent.TrackSubscribed, (track, publication) => {
        if (track.kind !== Track.Kind.Audio) return;
        // No argument: livekit-client creates an element dedicated to THIS
        // track, so the speech and the ambience bed can play simultaneously.
        const el = track.attach() as HTMLAudioElement;
        el.autoplay = true;
        el.style.display = "none";
        // Appended to the document because some mobile browsers refuse to play
        // a detached media element.
        document.body.appendChild(el);
        audioElsRef.current.set(publication.trackSid, el);
      });

      room.on(RoomEvent.TrackUnsubscribed, (track, publication) => {
        if (track.kind !== Track.Kind.Audio) return;
        track.detach();
        const el = audioElsRef.current.get(publication.trackSid);
        if (el) {
          el.srcObject = null;
          el.remove();
          audioElsRef.current.delete(publication.trackSid);
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
      // Publish the EXACT track the visitor granted, rather than asking the SDK
      // to acquire the device a second time.
      const micTrack = micStream.getAudioTracks()[0];
      if (micTrack) {
        await room.localParticipant.publishTrack(micTrack, { source: Track.Source.Microphone });
      } else {
        await room.localParticipant.setMicrophoneEnabled(true);
      }
      setPhase("live");
    } catch (err) {
      console.error("[web-call] connect failed:", err);
      cleanup();
      setError(GENERIC_ERROR);
      setPhase("error");
    }
  }, [appUrl, cleanup]);

  const toggleMute = useCallback(() => {
    // Toggle the granted track itself. Now that we publish that exact track
    // rather than letting the SDK acquire its own, `setMicrophoneEnabled` is no
    // longer the thing that governs it — and a mute button that does not
    // actually mute is worse than no mute button.
    const track = micStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    const next = !muted;
    track.enabled = !next;
    setMuted(next);
    if (next) setMicLevel(0);
  }, [muted]);

  const reset = useCallback(() => {
    cleanup();
    setPhase("idle");
    setError(null);
    setSeconds(0);
    setAgentSpeaking(false);
  }, [cleanup]);

  return {
    phase,
    error,
    muted,
    agentSpeaking,
    seconds,
    micLevel,
    micSeemsDead,
    start,
    hangUp,
    toggleMute,
    reset,
  };
}
