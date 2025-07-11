'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-10 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#121212] sticky top-0 z-50">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="Tunestream Logo" width={40} height={40} />
        <span className="text-xl font-bold text-black dark:text-white">Tunestream</span>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6 font-medium text-gray-800 dark:text-gray-200">
        <Link href="/">Home</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/streamers">Streamers</Link>
        <Link href="/music">Music</Link>
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </nav>

      {/* Hamburger Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-[#121212] px-6 py-4 flex flex-col gap-4 md:hidden z-40 shadow-lg">
          <Link href="/">Home</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/streamers">Livestreams</Link>
          <Link href="/music">Music</Link>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      )}
    </header>
  );
}
