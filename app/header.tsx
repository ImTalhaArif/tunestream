"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-800 via-blue-700 to-red-700 text-white p-4 flex items-center justify-between">
      <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">TUNESTREAM</Link>

      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </div>

      <nav className={`space-y-4 md:space-y-0 md:space-x-8 md:flex md:static absolute top-16 right-4 bg-purple-900 md:bg-transparent p-4 rounded-lg ${isOpen ? 'block' : 'hidden'} md:block`}>
        <Link href="/live-streams" className="hover:text-pink-400 block">Live Streams</Link>
        <Link href="/music" className="hover:text-pink-400 block">Music</Link>
        <Link href="/about" className="hover:text-pink-400 block">About</Link>
        <Link href="/support" className="hover:text-pink-400 block">Support</Link>
      </nav>
    </header>
  );
}
