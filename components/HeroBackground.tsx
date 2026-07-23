"use client";

import { useState } from "react";
import SnookerBackground from "@/components/SnookerBackground";

const VIDEO_SRC = "/videos/hero-bg.mp4";

export default function HeroBackground() {
  const [videoFailed, setVideoFailed] = useState(false);

  if (videoFailed) {
    return <SnookerBackground />;
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setVideoFailed(true)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-felt-dark/80 via-felt-dark/60 to-felt-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-felt-dark/90 via-transparent to-felt-dark/20" />
    </div>
  );
}
