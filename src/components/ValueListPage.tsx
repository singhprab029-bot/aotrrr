import React, { useState } from "react";
import { ItemFlipGrid } from "./ItemFlipGrid";
import { Item } from "../types/Item";

interface ValueListPageProps {
  items: Item[];
}

export const ValueListPage: React.FC<ValueListPageProps> = ({ items }) => {
  const [viewMode, setViewMode] = useState<"regular" | "permanent">("regular");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* PAGE TITLE */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--gold-bright)] text-center drop-shadow-lg">
        AOT:R Value List
      </h1>

      <p className="text-gray-400 max-w-3xl mx-auto text-center mt-3 mb-12">
        Browse all current AOT:R items ({items.length}+ total).  
        <span className="text-[var(--gold-soft)] font-semibold">  
          Values may be slightly outdated — join our Discord for accurate updates.
        </span>
      </p>

      {/* MODE SWITCHER */}
      <div className="mb-12 text-center">
        <h3 className="text-[var(--gold-bright)] font-semibold mb-3">
          Display Mode
        </h3>

        <div className="inline-flex rounded-xl overflow-hidden border border-[rgba(255,220,150,0.15)] bg-[#111]/60 backdrop-blur-md shadow-lg">
          <button
            onClick={() => setViewMode("regular")}
            className={`px-6 py-2 font-medium transition-all ${
              viewMode === "regular"
                ? "bg-[var(--gold-bright)] text-black shadow-inner"
                : "text-[var(--gold-soft)] hover:bg-[#1c1c1c]"
            }`}
          >
            Keys
          </button>

          <button
            onClick={() => setViewMode("permanent")}
            className={`px-6 py-2 font-medium transition-all ${
              viewMode === "permanent"
                ? "bg-[var(--gold-bright)] text-black shadow-inner"
                : "text-[var(--gold-soft)] hover:bg-[#1c1c1c]"
            }`}
          >
            Vizard
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Switch how item values are displayed across the list.
        </p>
      </div>

      {/* ITEM GRID */}
      <div className="mt-10">
        <ItemFlipGrid items={items} mode={viewMode} />
      </div>
    </div>
  );
};
