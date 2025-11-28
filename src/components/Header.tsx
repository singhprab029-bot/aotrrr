import React, { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <header className="backdrop-blur-xl bg-black/70 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/customdiscordlogo.png"
              alt="AOTR Values"
              className="h-12 w-auto object-contain hover:scale-105 transition"
            />
            <span className="hidden sm:block text-lg font-semibold text-white">
              AOT:R Values
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Trade Calculator", path: "/calculator" },
              { label: "Value List", path: "/value-list" },
              { label: "Value Changes", path: "/value-changes" },
              { label: "Trade Ads", path: "/trade-ads" },
              { label: "Scam Logs", path: "/scam-logs" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition
                  ${
                    isActive(item.path)
                      ? "text-blue-400 bg-gray-800 shadow-sm"
                      : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* DISCORD BUTTON */}
            <a
              href="https://discord.gg/tradingcorps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition"
            >
              Discord <ExternalLink className="w-4 h-4" />
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-gray-800 py-3 animate-fade-in">
            <div className="flex flex-col gap-1">

              {[
                { label: "Home", path: "/" },
                { label: "Trade Calculator", path: "/calculator" },
                { label: "Value List", path: "/value-list" },
                { label: "Value Changes", path: "/value-changes" },
                { label: "Trade Ads", path: "/trade-ads" },
                { label: "Scam Logs", path: "/scam-logs" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium
                    ${
                      isActive(item.path)
                        ? "text-blue-400 bg-gray-800"
                        : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}

              {/* Discord */}
              <a
                href="https://discord.gg/tradingcorps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-blue-400"
              >
                Discord <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
