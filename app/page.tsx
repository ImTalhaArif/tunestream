"use client";

import { useState } from "react";
import Header from "./Header"; // your Poplir header
import Footer from "./Footer"; // your Poplir footer

function Button({
  children,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "secondary" | "destructive";
}) {
  const base = "px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer";
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border bg-white shadow-xl p-6 space-y-4">{children}</div>;
}

// Demo data
const demoStream = {
  title: "Live Coding Session",
  status: "LIVE",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <main className="flex-grow p-6 space-y-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Poplir V2 – Demo Experience</h1>

        {/* Live Streaming */}
        <Card>
          <h2 className="text-xl font-semibold text-red-600">🎥 Live Streaming</h2>
          <p className="text-sm text-gray-500">{demoStream.title}</p>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-black">
            <video
              src={demoStream.videoUrl}
              controls
              className="w-full h-full object-cover"
              poster="https://dummyimage.com/1280x720/000/fff&text=Poplir+Stream"
            />
          </div>
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
          <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl">
            <button
              onClick={() => setPlaying(!playing)}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>
            <audio
              src={demoTrack.audioUrl}
              autoPlay={playing}
              controls
              className="hidden"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            <span className="text-sm text-gray-600">
              Status: {playing ? "Playing" : "Stopped"}
            </span>
          </div>
        </Card>

        {/* Social Media Center */}
        <Card>
          <h2 className="text-xl font-semibold text-blue-600">🌐 Social Media Center</h2>
          <p className="text-sm text-gray-500">{demoPost.body}</p>
          <div className="flex gap-2 flex-wrap">
            {demoPost.platforms.map((platform) => (
              <Button
                key={platform}
                variant="secondary"
                onClick={() => setMessage(`Posted to ${platform} ✅`)}
              >
                {platform}
              </Button>
            ))}
          </div>
          {message && <p className="text-xs text-green-600 mt-2">{message}</p>}
        </Card>

        {/* Calendar / Schedule */}
        <Card>
          <h2 className="text-xl font-semibold text-purple-600">📅 Calendar & Scheduling</h2>
          <p className="text-sm text-gray-500">Demo stream scheduled: Sept 10, 2025 at 7 PM</p>
          <Button onClick={() => setCalendarOpen(true)}>View Calendar</Button>

          {calendarOpen && (
            <div className="mt-4 p-4 rounded-xl bg-gray-100 border">
              <h3 className="font-semibold">Upcoming Events</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Sept 10, 2025 – Live Coding Stream</li>
                <li>Sept 15, 2025 – Music Release Party</li>
              </ul>
              <div className="mt-3">
                <Button variant="secondary" onClick={() => setCalendarOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}