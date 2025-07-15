"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../header';
import Footer from '../footer';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showStory, setShowStory] = useState<string | null>(null);

  const fetchUserData = async (email: string) => {
    try {
      const res = await fetch("https://jkeawlulszxxr42r2uuntuorvq0ieoot.lambda-url.eu-north-1.on.aws/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "fetch",
          payload: {
            TableName: "tbl_user",
            Key: { email },
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f011c] to-[#1a052e] text-white">
      <Header />

      <main className="flex-1 px-4 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome, {user.name || user.email} 👋</h1>

        {/* Stories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Stories</h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {['/story1.jpg', '/story2.jpg', '/story3.jpg', '/story4.jpg'].map((src, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-full border-4 border-pink-500 cursor-pointer hover:scale-105 transition"
                onClick={() => setShowStory(src)}
              >
                <img src={src} alt={`story-${index}`} className="w-full h-full object-cover rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Videos */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="bg-[#1a052e] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
                <img src={`/video${(idx % 4) + 1}.jpg`} alt="Video" className="w-full h-36 object-cover" />
                <div className="p-3">
                  <p className="text-sm font-semibold mb-1">Cool Video {idx + 1}</p>
                  <p className="text-xs text-gray-400">by Creator {idx + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
