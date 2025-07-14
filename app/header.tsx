"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-800 via-blue-700 to-red-700 text-white p-4 flex items-center justify-between">
      <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">TUNESTREAM</Link>
      <nav className="space-x-8 text-lg">
        <Link href="/live-streams" className="hover:text-pink-400">Live Streams</Link>
        <Link href="/music" className="hover:text-pink-400">Music</Link>
        <Link href="/about" className="hover:text-pink-400">About</Link>
        <Link href="/support" className="hover:text-pink-400">Support</Link>
      </nav>
    </header>
  );
}