"use client";

import { useState } from "react";
import Header from "../header";
import Footer from "../footer";

export default function CreatorStudio() {
  const [postCaption, setPostCaption] = useState("");
  const [postMedia, setPostMedia] = useState<File | null>(null);
  const [crossPost, setCrossPost] = useState<Record<"facebook" | "instagram" | "x" | "snapchat", boolean>>({
    facebook: false,
    instagram: false,
    x: false,
    snapchat: false,
  });

  const [storyMedia, setStoryMedia] = useState<File | null>(null);
  const [storyText, setStoryText] = useState("");

  const [livestream, setLivestream] = useState({
    mode: "screen", // 'screen', 'both', 'camera'
    title: "",
    description: "",
  });

  const [music, setMusic] = useState({
    type: "song", // 'song' or 'album'
    title: "",
    banner: null as File | null,
    tracks: [] as File[],
  });

  // TODO: Implement these with API logic
  const onPost = () => {
    console.log("Post submitted:", postCaption, postMedia, crossPost);
  };

  const onPublishStory = () => {
    console.log("Story submitted:", storyMedia, storyText);
  };

  const onStartLivestream = () => {
    console.log("Livestream started:", livestream);
  };

  const onPublishMusic = () => {
    console.log("Music published:", music);
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex-1 p-6 space-y-12">
        {/* 📝 Create a Post */}
        <section className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
          <textarea
            placeholder="Write your caption..."
            className="w-full bg-[#111] p-3 rounded-md text-white mb-3"
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)}
          />
          <label className="block mb-3">
            <span className="text-gray-400">Attach Media</span>
            <input
              type="file"
              accept="image/*,video/*"
              className="mt-1"
              onChange={(e) => setPostMedia(e.target.files?.[0] || null)}
            />
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {(["facebook", "instagram", "x", "snapchat"] as const).map((platform) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={crossPost[platform]}
                  onChange={() =>
                    setCrossPost((prev) => ({
                      ...prev,
                      [platform]: !prev[platform],
                    }))
                  }
                />
                <span className="capitalize">{platform}</span>
              </label>
            ))}
          </div>
          <button
            className="px-6 py-2 bg-[#00ff80] rounded-full font-semibold text-black hover:opacity-90"
            onClick={onPost}
          >
            Publish Post
          </button>
        </section>

        {/* 📸 Add to Story */}
        <section className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Add to Story</h2>
          <input
            type="file"
            accept="image/*,video/*"
            className="block mb-3"
            onChange={(e) => setStoryMedia(e.target.files?.[0] || null)}
          />
          <input
            type="text"
            placeholder="Overlay text..."
            className="w-full bg-[#111] p-3 rounded-md mb-3"
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-[#00ff80] rounded-full font-semibold text-black hover:opacity-90"
            onClick={onPublishStory}
          >
            Publish Story
          </button>
        </section>

        {/* 🎥 Livestream Setup */}
        <section className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Start Livestream</h2>
          <select
            className="bg-[#111] p-3 rounded-md mb-3 w-full"
            value={livestream.mode}
            onChange={(e) => setLivestream((l) => ({ ...l, mode: e.target.value }))}
          >
            <option value="screen">Screen Only</option>
            <option value="camera">Cam Only</option>
            <option value="both">Screen + Cam</option>
          </select>
          <input
            type="text"
            placeholder="Stream Title"
            className="w-full bg-[#111] p-3 rounded-md mb-3"
            value={livestream.title}
            onChange={(e) => setLivestream((l) => ({ ...l, title: e.target.value }))}
          />
          <textarea
            placeholder="Stream Description"
            className="w-full bg-[#111] p-3 rounded-md mb-3"
            value={livestream.description}
            onChange={(e) => setLivestream((l) => ({ ...l, description: e.target.value }))}
          />
          <button
            className="px-6 py-2 bg-[#00ff80] rounded-full font-semibold text-black hover:opacity-90"
            onClick={onStartLivestream}
          >
            Start Stream
          </button>
        </section>

        {/* 🎵 Upload Song / Album */}
        <section className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Upload Music or Album</h2>
          <div className="flex items-center mb-3 space-x-4">
            {(["song", "album"] as const).map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="musicType"
                  checked={music.type === type}
                  onChange={() => setMusic((m) => ({ ...m, type }))}
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
          <input
            type="text"
            placeholder="Title / Album Name"
            className="w-full bg-[#111] p-3 rounded-md mb-3"
            value={music.title}
            onChange={(e) => setMusic((m) => ({ ...m, title: e.target.value }))}
          />
          <label className="block mb-3">
            <span className="text-gray-400">Banner / Cover Image</span>
            <input
              type="file"
              accept="image/*"
              className="mt-1"
              onChange={(e) => setMusic((m) => ({ ...m, banner: e.target.files?.[0] || null }))}
            />
          </label>
          {music.type === "song" ? (
            <label className="block mb-3">
              <span className="text-gray-400">Song File</span>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  setMusic((m) => ({
                    ...m,
                    tracks: e.target.files ? [e.target.files[0]] : [],
                  }))
                }
              />
            </label>
          ) : (
            <label className="block mb-3">
              <span className="text-gray-400">Album Tracks (multiple)</span>
              <input
                type="file"
                accept="audio/*"
                multiple
                onChange={(e) =>
                  setMusic((m) => ({
                    ...m,
                    tracks: e.target.files ? Array.from(e.target.files) : [],
                  }))
                }
              />
            </label>
          )}
          <button
            className="px-6 py-2 bg-[#00ff80] rounded-full font-semibold text-black hover:opacity-90"
            onClick={onPublishMusic}
          >
            Publish {music.type === "song" ? "Song" : "Album"}
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
