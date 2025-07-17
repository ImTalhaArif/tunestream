"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../header';
import Footer from '../footer';

const categories = ['Gaming', 'Esports', 'IRL', 'Music'];
const fakeUsers = [
  { name: "ShadowHawk", image: "/avatars/u1.jpg" },
  { name: "PixelNinja", image: "/avatars/u2.jpg" },
  { name: "CodeBard", image: "/avatars/u3.jpg" },
  { name: "GigaVibe", image: "/avatars/u4.jpg" },
  { name: "StreamQueen", image: "/avatars/u5.jpg" },
];

const recommendedChannels = ["xQc", "Amouranth", "AdinRoss"];
const followedChannels = ["DrDisrespect", "Myth", "Nadeshot"];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showStory, setShowStory] = useState<string | null>(null);

  const fetchUserData = async (email: string) => {
    try {
      const res = await fetch("https://jkeawlulszxxr42r2uuntuorvq0ieoot.lambda-url.eu-north-1.on.aws/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "fetch",
          payload: { TableName: "tbl_user", Key: { email } },
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const result = await res.json();
      if (result.Item) {
        setUser(result.Item);
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      localStorage.removeItem("tunestream_token");
      router.push("/login");
    }
  };

  useEffect(() => {
    const tokenString = localStorage.getItem("tunestream_token");
    if (!tokenString) return router.push("/login");

    const token = JSON.parse(tokenString);
    const now = Date.now();
    const twelveHours = 12 * 60 * 60 * 1000;

    const isExpired = now - token.timestamp > twelveHours;
    if (isExpired) {
      localStorage.removeItem("tunestream_token");
      return router.push("/login");
    }

    fetchUserData(token.email);
  }, []);

  if (!user) {
    return <div className="text-center text-white p-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] text-white">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-[#1a1a1a] px-6 py-6 space-y-6 border-r border-gray-800">
          <div>
            <h2 className="text-lg font-bold mb-2 text-green-400">Recommended Channels</h2>
            <ul className="space-y-2">
              {recommendedChannels.map((ch, i) => (
                <li key={i} className="hover:text-green-400 transition cursor-pointer">{ch}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2 text-green-400">Followed Channels</h2>
            <ul className="space-y-2">
              {followedChannels.map((ch, i) => (
                <li key={i} className="hover:text-green-400 transition cursor-pointer">{ch}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6 text-white">Welcome, {user.name || user.email} 👋</h1>

          {/* Stories */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Stories</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {['/story1.jpg', '/story2.jpg', '/story3.jpg'].map((src, index) => (
                <div
                  key={index}
                  className="w-20 h-20 rounded-full border-4 border-green-500 cursor-pointer hover:scale-105 transition"
                  onClick={() => setShowStory(src)}
                >
                  <img src={src} alt={`story-${index}`} className="w-full h-full object-cover rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Category Sections */}
          {categories.map((cat, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-white">{cat} Streams</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                {fakeUsers.map((user, idx) => (
                  <div key={idx} className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow hover:scale-105 transition duration-200">
                    <img src={`/thumb${(idx % 4) + 1}.jpg`} alt="stream" className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                        <p className="text-sm font-semibold">{user.name}</p>
                      </div>
                      <p className="text-xs text-gray-400">Live now • 2.3K viewers</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>

      <Footer />

      {/* Story Modal */}
      {showStory && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity">
          <div className="relative w-96 h-96">
            <img src={showStory} alt="Story" className="w-full h-full object-cover rounded-xl" />
            <button
              onClick={() => setShowStory(null)}
              className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full px-3 py-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
