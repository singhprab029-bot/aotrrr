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

      {/* SEARCH + FILTER BAR */}
<div className="w-full mb-10">
  <div className="
    flex flex-col md:flex-row items-center gap-4 
    bg-[#0A0A0A]/70 backdrop-blur-xl 
    border border-[rgba(255,220,150,0.12)] 
    rounded-2xl p-4 shadow-lg
  ">

    {/* SEARCH INPUT */}
    <div className="flex items-center gap-2 flex-1 
      bg-[#111]/60 border border-[rgba(255,220,150,0.15)]
      rounded-xl px-4 py-2
      focus-within:border-[var(--gold-bright)]
      transition">
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-[var(--gold-soft)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 12.65z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search items..."
        className="
          bg-transparent w-full outline-none text-[var(--gold-bright)]
          placeholder-[var(--gold-soft)]
        "
      />
    </div>

    {/* CATEGORY FILTER */}
    <select
      className="
        bg-[#111]/70 text-[var(--gold-soft)] 
        border border-[rgba(255,220,150,0.15)]
        rounded-xl px-4 py-2 w-full md:w-auto
        hover:border-[var(--gold-bright)]
        transition
      "
    >
      <option>All Categories</option>
      <option>Souls</option>
      <option>Gamepasses</option>
      <option>Cosmetics</option>
      <option>Special</option>
    </select>

    {/* SORT BUTTON */}
    <button
      className="
        flex items-center gap-2
        bg-[#111]/70 text-[var(--gold-soft)]
        border border-[rgba(255,220,150,0.15)]
        rounded-xl px-4 py-2 w-full md:w-auto
        hover:border-[var(--gold-bright)]
        transition
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-[var(--gold-bright)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6h16M4 12h10M4 18h6"
        />
      </svg>
      High to Low
    </button>

  </div>
</div>

    </div>
  );
};
