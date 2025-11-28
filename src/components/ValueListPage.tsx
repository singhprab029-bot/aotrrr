import React, { useState } from "react";
import { ItemFlipGrid } from "./ItemFlipGrid";
import { Item } from "../types/Item";

interface ValueListPageProps {
  items: Item[];
}

export const ValueListPage: React.FC<ValueListPageProps> = ({ items }) => {
  const [viewMode, setViewMode] = useState<"regular" | "permanent">("regular");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">

      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
        AOT:R Value List
      </h1>

      {/* ⚠️ Warning Banner */}
<div className="bg-yellow-500/10 border border-yellow-400/30 text-yellow-300 text-sm md:text-base px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
  <span className="text-xl">⚠️</span>
  <span>
    Values may be slightly outdated. For the most accurate trading help, join the Discord.
  </span>
</div>

{/* Subtitle */}
<p className="text-gray-400 max-w-2xl mx-auto mb-6 text-sm md:text-base">
  Browse our full AOT:R item value list with {items.length}+ items.
</p>

{/* Discord Join Button */}
<div className="flex justify-center mb-12">
  <a
    href="https://discord.gg/tradingcorps"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center gap-2"
  >
    <span>Join Discord</span>
    <img src="/discord-icon.png" className="w-5 h-5 opacity-80" />
  </a>
</div>


      <div className="mb-12">
        <h3 className="text-white font-semibold mb-3">Default View Mode</h3>

        <div className="inline-flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("regular")}
            className={`px-6 py-2 font-medium ${
              viewMode === "regular"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Keys
          </button>

          <button
            onClick={() => setViewMode("permanent")}
            className={`px-6 py-2 font-medium ${
              viewMode === "permanent"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Vizard
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Sets the default display mode for all items.
        </p>
      </div>

      <ItemFlipGrid items={items} mode={viewMode} />
    </div>
  );
};
