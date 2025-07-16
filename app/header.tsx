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
    <header className="bg-[#0e0e10] text-white p-4 flex items-center justify-between shadow-lg relative z-50">
      <Link
        href="/"
        className="text-3xl font-bold text-[#00ff99] hover:opacity-90 transition"
      >
        Poplir
      </Link>

      {/* Mobile Menu Icon */}
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex absolute md:static top-16 right-4 md:right-0 bg-[#1a1a1a] md:bg-transparent p-4 md:p-0 rounded-lg space-y-4 md:space-y-0 md:space-x-8 transition-all`}
      >
        {["/live-streams", "/music", "/about", "/support"].map((path, idx) => (
          <Link
            key={idx}
            href={path}
            className="block text-white hover:text-[#00ff99] transition font-medium"
          >
            {path.replace("/", "").replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
        ))}

        {!isLoggedIn ? (
          <Link
            href="/join"
            className="block text-white hover:text-[#00ff99] transition font-semibold"
          >
            Join
          </Link>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="block text-red-400 hover:text-red-300 font-medium focus:outline-none"
              style={{ marginTop: "-17px" }}
            >
              Logout
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="ml-2 w-10 h-10 rounded-full bg-[#2b2b2b] text-[#00ff99] flex items-center justify-center hover:scale-105 transition focus:outline-none"
              >
                <User className="w-5 h-5" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] text-white rounded shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-[#2a2a2a] transition"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/followers"
                    className="block px-4 py-2 hover:bg-[#2a2a2a] transition"
                  >
                    Followers
                  </Link>
                  <Link
                    href="/following"
                    className="block px-4 py-2 hover:bg-[#2a2a2a] transition"
                  >
                    Following
                  </Link>
                  <Link
                    href="/new-post"
                    className="block px-4 py-2 hover:bg-[#2a2a2a] transition"
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
