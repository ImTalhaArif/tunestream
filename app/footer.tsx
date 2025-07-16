export default function Footer() {
  return (
    <footer className="bg-[#1c1c2b] text-gray-400 text-center py-6 mt-8 border-t border-gray-700">
      <div className="mb-2 text-sm">
        &copy; 2025 <span className="text-white font-semibold">EvoDynamics</span>. All rights reserved.
      </div>
      <div className="text-xs">
        Powered by{" "}
        <a
          href="https://evodyna.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 transition"
        >
          EvoDynamics Creative Studio
        </a>
      </div>
    </footer>
  );
}
