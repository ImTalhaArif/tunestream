"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Music, Share2, Video } from "lucide-react";

// Demo data (replace later with API integration)
const demoStream = {
  title: "Live Coding Session",
  status: "LIVE",
  hlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
};

const demoTrack = {
  title: "Demo Track",
  artist: "Poplir Artist",
  audioUrl:
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

const demoPost = {
  body: "This is a demo cross-post to multiple platforms.",
  platforms: ["Facebook", "YouTube", "Twitter"],
};

export default function PoplirDemo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center"
      >
        Poplir V2 – Demo Experience
      </motion.h1>

      {/* Live Streaming Section */}
      <Card className="shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Video className="text-red-500" />
            <h2 className="text-xl font-semibold">Live Streaming</h2>
          </div>
          <p className="text-sm text-gray-500">{demoStream.title}</p>
          <video
            src={demoStream.hlsUrl}
            controls
            className="w-full rounded-xl border"
          />
          <div className="flex justify-end">
            <Button variant="destructive">{demoStream.status}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Music Streaming Section */}
      <Card className="shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Music className="text-green-500" />
            <h2 className="text-xl font-semibold">Music Streaming</h2>
          </div>
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
          <p className="text-xs text-gray-400">
            Status: {playing ? "Playing" : "Paused"}
          </p>
        </CardContent>
      </Card>

      {/* Social Media Center Section */}
      <Card className="shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Share2 className="text-blue-500" />
            <h2 className="text-xl font-semibold">Social Media Center</h2>
          </div>
          <p className="text-sm text-gray-500">{demoPost.body}</p>
          <div className="flex gap-2 flex-wrap">
            {demoPost.platforms.map((platform) => (
              <Button key={platform} variant="secondary">
                {platform}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar / Schedule Section */}
      <Card className="shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-purple-500" />
            <h2 className="text-xl font-semibold">Calendar & Scheduling</h2>
          </div>
          <p className="text-sm text-gray-500">
            Demo stream scheduled: Sept 10, 2025 at 7 PM
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            View Calendar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}