import React from "react";

export default function Footer() {

    const owner = VITE_FOOTER_NAME || "Trisha & Vishesh"
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#0F172A] text-white text-xs sm:text-sm font-semibold z-50 border-t border-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center sm:justify-end">
        <i className="not-italic tracking-wide text-slate-300 hover:text-white transition-colors duration-200">
          © 2026 By {owner}
        </i>
      </div>
    </footer>
  );
}