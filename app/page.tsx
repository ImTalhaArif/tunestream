"use client";

import { useState } from "react";

function Button({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "destructive" }) {
  const base = "px-4 py-2 rounded-xl text-sm font-medium transition-colors";
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  return <button className={`${base} ${variants[variant]}`}>{children}</button>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border bg-white shadow-xl p-6 space-y-4">{children}</div>;
}

// Demo data
const demoStream = {
  title: "Live Coding Session",
  status: "LIVE",
  hlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
};

const demoTrack = {
  title: "Demo Track",
  artist: "Poplir Artist",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

const demoPost = {
  body: "This is a demo cross-post to multiple platforms.",
  platforms: ["Facebook", "YouTube", "Twitter"],
};

export default function HomePage() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Poplir V2 – Demo Experience</h1>

      {/* Live Streaming */}
      <Card>
        <h2 className="text-xl font-semibold text-red-600">🎥 Live Streaming</h2>
        <p className="text-sm text-gray-500">{demoStream.title}</p>
        <video src={demoStream.hlsUrl} controls className="w-full rounded-xl border" />
        <div className="flex justify-end">
          <Button variant="destructive">{demoStream.status}</Button>
        </div>
      </Card>

      {/* Music Streaming */}
      <Card>
        <h2 className="text-xl font-semibold text-green-600">🎵 Music Streaming</h2>
        <p className="text-sm text-gray-500">
          {demoTrack.title} – {demoTrack.artist}
        </p>
        <audio
          src={demoTrack.audioUrl}
          controls
          className="w-full rounded-xl"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <p className="text-xs text-gray-400">Status: {playing ? "Playing" : "Paused"}</p>
      </Card>

      {/* Social Media Center */}
      <Card>
        <h2 className="text-xl font-semibold text-blue-600">🌐 Social Media Center</h2>
        <p className="text-sm text-gray-500">{demoPost.body}</p>
        <div className="flex gap-2 flex-wrap">
          {demoPost.platforms.map((platform) => (
            <Button key={platform} variant="secondary">
              {platform}
            </Button>
          ))}
        </div>
      </Card>

      {/* Calendar / Schedule */}
      <Card>
        <h2 className="text-xl font-semibold text-purple-600">📅 Calendar & Scheduling</h2>
        <p className="text-sm text-gray-500">Demo stream scheduled: Sept 10, 2025 at 7 PM</p>
        <Button>View Calendar</Button>
      </Card>
    </div>
  );
}