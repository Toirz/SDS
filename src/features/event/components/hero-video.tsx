"use client";

import { useEffect, useRef, useState } from "react";

// Autoplays muted on loop unless the visitor prefers reduced motion; the toggle satisfies WCAG 2.2.2.
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => setPlaying(false));
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return (
    <figure className="hero-media">
      <div className="hero-media-frame">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
        <button type="button" className="hero-media-toggle" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />}
          </svg>
        </button>
      </div>
    </figure>
  );
}
