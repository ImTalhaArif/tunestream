"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-800 via-blue-700 to-red-700 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">TUNESTREAM</Link>
      <nav className="flex space-x-6 text-lg">
        <Link href="/live-streams" className="hover:text-pink-400 transition">Live Streams</Link>
        <Link href="/music" className="hover:text-pink-400 transition">Music</Link>
        <Link href="/about" className="hover:text-pink-400 transition">About</Link>
        <Link href="/support" className="hover:text-pink-400 transition">Support</Link>
      </nav>
    </header>
  );
}