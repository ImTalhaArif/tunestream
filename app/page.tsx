"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const categories = ["MOBA", "FPS", "Pop", "EDM", "Chill", "HipHop"];

  const liveStreams = [
    { name: "GhostNinja", image: "/gamer1.jpg" },
    { name: "LyricalJade", image: "/music1.png" },
    { name: "VortexKing", image: "/gamer2.jpg" },
    { name: "NeoBeat", image: "/music2.png" },
  ];

  const contentSections = [
    {
      title: "Top Categories",
      items: [
        { title: "League of Madness", creator: "ShadowZ", image: "/thumb1.jpg" },
        { title: "Epic Clash", creator: "VenomTwist", image: "/thumb2.jpg" },
        { title: "Musical Realms", creator: "EchoNova", image: "/thumb3.jpg" },
        { title: "EDM Surge", creator: "Pulse99", image: "/thumb4.jpg" },
        { title: "Lo-Fi Beats", creator: "Tranquilo", image: "/thumb5.jpg" },
      ],
    },
    {
      title: "Gaming",
      items: [
        { title: "Last Man Wins", creator: "ReaperX", image: "/thumb6.jpg" },
        { title: "FPS Frenzy", creator: "BulletProof", image: "/thumb7.jpg" },
        { title: "Survivor Hunt", creator: "NightFox", image: "/thumb8.jpg" },
        { title: "Pro Arena", creator: "GamerZen", image: "/thumb9.jpg" },
        { title: "Clutch Master", creator: "SneakShot", image: "/thumb10.jpg" },
      ],
    },
    {
      title: "Music",
      items: [
        { title: "Dream Beats", creator: "LunaSoul", image: "/thumb11.jpg" },
        { title: "Bass Drop Live", creator: "CrankitUp", image: "/thumb12.jpg" },
        { title: "Indie Flow", creator: "VelvetNoise", image: "/thumb13.jpg" },
        { title: "Jazz Jungle", creator: "BopBlaster", image: "/thumb14.jpg" },
        { title: "Vinyl Vibes", creator: "DJ Wavemaster", image: "/thumb15.jpg" },
      ],
    },
  ];

  const recommendedCreators = [
    { name: "SnipezYT", image: "/gamer1.jpg" },
    { name: "DJNova", image: "/music1.png" },
    { name: "PixelLord", image: "/gamer2.jpg" },
    { name: "SynthWave", image: "/music2.png" },
  ];

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 min-h-full bg-[#1e1e22] p-6 hidden md:block">
          <nav className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-white">Menu</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-green-400 cursor-pointer">🏠 Home</li>
              <li className="hover:text-green-400 cursor-pointer">🔍 Explore</li>
              <li className="hover:text-green-400 cursor-pointer">⭐ Following</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-white">Recommended</h2>
            <ul className="space-y-3">
              {recommendedCreators.map((creator, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-300 hover:text-green-400 cursor-pointer">
                    {creator.name}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-10 py-8 bg-[#0e0e10] min-h-full">
          {/* Live Carousel */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">🔥 Live Now</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {liveStreams.map((stream, idx) => (
                <div
                  key={idx}
                  className="w-60 flex-shrink-0 bg-[#1e1e22] rounded-lg overflow-hidden shadow hover:scale-105 transition"
                >
                  <img src={stream.image} className="w-full h-36 object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-semibold">{stream.name}</p>
                    <p className="text-xs text-green-400">LIVE</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          {contentSections.map((section, sIdx) => (
            <section key={sIdx} className="mb-12">
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1e1e22] rounded-lg overflow-hidden shadow hover:scale-105 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-400">by {item.creator}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      <Footer />

      {/* Optional MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-[#1e1e22] rounded-xl p-8 shadow-2xl text-center w-96">
            <h3 className="text-2xl font-bold text-white mb-4">Join TuneStream</h3>
            <p className="text-gray-300 mb-6">
              Sign up to continue watching or listening beyond 30 seconds!
            </p>
            <button
              onClick={() => router.push("/join")}
              className="w-full mb-3 py-2 rounded-full bg-green-500 hover:bg-green-400 transition font-semibold"
            >
              Join Now
            </button>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition text-sm text-white"
            >
              Already a user? Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
