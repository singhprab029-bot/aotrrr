import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Value List", path: "/value-list" },
    { name: "Trade Calculator", path: "/calculator" },
    { name: "Value Changes", path: "/value-changes" },
    { name: "Trade Ads", path: "/trade-ads" },
    { name: "Scam Logs", path: "/scam-logs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="
        sticky top-0 z-50 py-5 backdrop-blur-xl
        bg-black md:bg-transparent
      "
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ⭐ LEFT LOGO WITH STRONGER GLOW */}
        <Link to="/" className="relative flex items-center">
          <div className="
            absolute inset-0 w-16 h-16 
            rounded-full blur-2xl
            bg-[var(--gold-bright)] opacity-30
          "></div>

          <img
            src="/customdiscordlogo.png"
            className="relative h-14 w-auto object-contain"
            alt="AOTR Logo"
          />
        </Link>

        {/* ⭐ DESKTOP NAV — MORE PREMIUM */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <nav
            className="
              flex items-center
              bg-[#0C0C0C]/70
              backdrop-blur-2xl
              rounded-full px-14 py-5 gap-6
              border border-[var(--gold-soft)]/20
              shadow-[0_0_30px_rgba(255,215,100,0.06)]
            "
          >
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`
                  relative px-6 py-3 rounded-full text-[15px] font-medium
                  transition-all duration-200
                  group
                  ${
                    isActive(l.path)
                      ? "text-[var(--gold-bright)] bg-[rgba(255,220,150,0.15)] shadow-[0_0_20px_rgba(255,225,150,0.25)]"
                      : "text-[var(--gold-soft)] hover:text-[var(--gold-bright)] hover:bg-[rgba(255,220,150,0.08)]"
                  }
                `}
              >
                {l.name}

                {/* Underline animation */}
                <span
                  className={`
                    absolute left-1/2 -bottom-1 h-[2px] w-0 
                    bg-[var(--gold-bright)]
                    transition-all duration-300 rounded-full 
                    group-hover:w-3/5 group-hover:left-1/5
                    ${isActive(l.path) ? "w-3/5 left-1/5" : ""}
                  `}
                ></span>
              </Link>
            ))}
          </nav>

        </div>

        {/* ⭐ DISCORD BUTTON WITH MORE DEPTH */}
        <a
          href="https://discord.gg/tradingcorps"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden md:flex items-center justify-center h-16 w-16 
            rounded-full border-[2px]
            border-[var(--gold-bright)]
            text-[var(--gold-bright)]
            hover:bg-[rgba(255,220,150,0.18)]
            transition
            shadow-[0_0_25px_rgba(255,220,150,0.35)]
          "
        >
          <img
            src="/discord-icon.png"
            alt="Discord"
            className="h-9 w-9 object-contain"
          />
        </a>

        {/* ⭐ MOBILE MENU ICON — IMPROVED INTERACTION */}
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden text-[var(--gold-bright)]
            p-2 active:scale-95 transition-transform
          "
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* ⭐ MOBILE DROPDOWN (ANIMATED + PREMIUM) */}
      {open && (
        <div
          className="
            md:hidden mt-4 bg-black/95 backdrop-blur-xl
            border-t border-gray-800
            flex flex-col shadow-lg
            animate-slideDown
          "
        >
          {links.map((l, i) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`
                block px-6 py-4 text-lg 
                border-b border-gray-900/60 
                transition-all
                ${
                  isActive(l.path)
                    ? "text-[var(--gold-bright)] bg-[rgba(255,220,150,0.1)]"
                    : "text-[var(--gold-soft)] hover:text-[var(--gold-bright)]"
                }
              `}
              style={{ animationDelay: `${i * 0.10}s` }}
            >
              {l.name}
            </Link>
          ))}

          {/* Mobile Discord */}
          <a
            href="https://discord.gg/tradingcorps"
            target="_blank"
            rel="noopener noreferrer"
            className="
              block px-6 py-4 text-lg 
              text-[var(--gold-soft)] hover:text-[var(--gold-bright)]
            "
          >
            Discord
          </a>
        </div>
      )}
    </header>
  );
};
