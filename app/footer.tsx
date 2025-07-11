export default function Footer() {
  return (
    <footer className="w-full text-center py-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-[#121212]">
      © {new Date().getFullYear()} EvoDynamics. All rights reserved.
    </footer>
  );
}
