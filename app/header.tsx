"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("tunestream_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tunestream_token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-800 via-blue-700 to-red-700 text-white p-4 flex items-center justify-between relative">
      <Link
        href="/"
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
      >
        Poplir
      </Link>

      {/* Mobile Menu Icon */}
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </div>

      {/* Nav Links */}
      <nav
        className={`space-y-4 md:space-y-0 md:space-x-8 md:flex md:static absolute top-16 right-4 bg-purple-900 md:bg-transparent p-4 rounded-lg ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <Link href="/live-streams" className="hover:text-pink-400 block">
          Live Streams
        </Link>
        <Link href="/music" className="hover:text-pink-400 block">
          Music
        </Link>
        <Link href="/about" className="hover:text-pink-400 block">
          About
        </Link>
        <Link href="/support" className="hover:text-pink-400 block">
          Support
        </Link>

        {!isLoggedIn ? (
          <Link href="/join" className="hover:text-pink-400 block">
            Join
          </Link>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="hover:text-red-300 block focus:outline-none" style={{marginTop: "-17px"}}
            >
              Logout
            </button>
            {/* Profile Icon with Dropdown */}
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="ml-2 w-10 h-10 rounded-full bg-gray-300 text-black flex items-center justify-center hover:scale-105 transition focus:outline-none"
              >
                <User className="w-5 h-5" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/followers"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Followers
                  </Link>
                  <Link
                    href="/following"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Following
                  </Link>
                  <Link
                    href="/new-post"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    New Post
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
