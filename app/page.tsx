"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Replace with real auth check
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isSignedIn && (showVideo || playAudio)) {
      timer = setTimeout(() => {
        if (showVideo && videoRef.current) videoRef.current.pause();
        if (playAudio && audioRef.current) audioRef.current.pause();
        setShowModal(true);
      }, 30000); // Stop after 30 seconds
    }

    return () => clearTimeout(timer);
  }, [showVideo, playAudio, isSignedIn]);

  return (
    <div className="bg-gradient-to-b from-[#0f011c] to-[#1a052e] text-white min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 p-8">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Tune in to the Beat of the Game
          </h1>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-lg font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl mb-6 text-pink-400">Categories</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="bg-purple-900 px-6 py-3 rounded-lg hover:bg-purple-700 transition">MOBA</button>
            <button className="bg-purple-900 px-6 py-3 rounded-lg hover:bg-purple-700 transition">FPS</button>
            <button className="bg-purple-900 px-6 py-3 rounded-lg hover:bg-purple-700 transition">Pop</button>
            <button className="bg-purple-900 px-6 py-3 rounded-lg hover:bg-purple-700 transition">EDM</button>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gamer Card */}
          <button
            onClick={() => {
              setShowVideo(true);
              setPlayAudio(false);
              setShowModal(false);
            }}
            className="bg-gradient-to-tr from-[#1a052e] via-purple-800 to-[#0f011c] p-6 rounded-xl flex flex-col items-center transform transition duration-300 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none"
          >
            <img src="/gamer1.jpg" alt="Gamer" className="w-32 h-32 rounded-full mb-4" />
            <p className="text-xl font-bold">Ninja</p>
            <p className="text-sm text-gray-300">Streaming</p>
          </button>

          {/* Music Card */}
          <button
            onClick={() => {
              setPlayAudio(true);
              setShowVideo(false);
              setShowModal(false);
            }}
            className="bg-gradient-to-tr from-[#1a052e] via-purple-800 to-[#0f011c] p-6 rounded-xl flex flex-col items-center transform transition duration-300 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none"
          >
            <img src="/music1.png" alt="Music" className="w-32 h-32 rounded-full mb-4" />
            <p className="text-xl font-bold">Cool Vibes</p>
            <p className="text-sm text-gray-300">Artist: Alan Walker</p>
          </button>
        </section>

        {/* Video Player */}
        {showVideo && (
          <div className="mt-10 flex justify-center">
            <video
              ref={videoRef}
              controls
              autoPlay
              className="rounded-xl shadow-lg max-w-full w-[640px]"
            >
              <source src="/ninja.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Audio Player */}
        {playAudio && (
          <div className="mt-10 flex justify-center">
            <audio
              ref={audioRef}
              controls
              autoPlay
              className="rounded-xl shadow-lg w-full max-w-md"
            >
              <source src="/alanwalker.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </main>
      <Footer />

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-900 via-[#1a052e] to-[#0f011c] rounded-xl p-8 shadow-2xl text-center w-96">
            <h3 className="text-2xl font-bold text-white mb-4">Join TuneStream</h3>
            <p className="text-gray-300 mb-6">
              Sign up to continue watching or listening beyond 30 seconds!
            </p>
            <button
              onClick={() => router.push("/join")}
              className="w-full mb-3 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105 transition font-semibold"
            >
              Join Now
            </button>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-2 rounded-full bg-purple-800 hover:bg-purple-700 transition text-sm text-white"
            >
              Already a user? Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
