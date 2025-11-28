import React, { useState } from "react";
import { ItemFlipGrid } from "./ItemFlipGrid";
import { Item } from "../types/Item";
import { Star, TrendingUp, BarChart2, Filter } from "lucide-react";

interface ValueListPageProps {
  items: Item[];
}

export const ValueListPage: React.FC<ValueListPageProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"regular" | "permanent">("regular");

  const categories = [
    { label: "All", count: items.length },
    { label: "Gamepasses", count: items.filter(i => i.category === "Gamepass").length },
    { label: "Souls", count: items.filter(i => i.category === "Soul").length },
    { label: "Limiteds", count: items.filter(i => i.category === "Limited").length },
  ];

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(i => i.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">

      {/* Updated Daily Badge */}
      <div className="inline-block px-4 py-1 mb-6 rounded-full bg-purple-600/20 border border-purple-500 text-purple-300 text-sm">
        🔄 Updated Daily
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
        AOT:R Value List
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 max-w-2xl mx-auto mb-8">
        Browse and track accurate trading values for items in Attack on Titan Revolution.
        Updated frequently based on real market activity and community demand.
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/70 text-gray-300 text-sm">
          <Star className="w-4 h-4" /> 3 rarities
        </span>
        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/70 text-gray-300 text-sm">
          <TrendingUp className="w-4 h-4" /> Price trends
        </span>
        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/70 text-gray-300 text-sm">
          <BarChart2 className="w-4 h-4" /> Demand ratings
        </span>
        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/70 text-gray-300 text-sm">
          <Filter className="w-4 h-4" /> Advanced filters
        </span>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat.label)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition 
              ${selectedCategory === cat.label
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
            `}
          >
            {cat.label} {cat.count}
          </button>
        ))}
      </div>

      {/* Default View Mode Toggle */}
      <div className="mb-12">
        <h3 className="text-white font-semibold mb-3">Default View Mode</h3>

        <div className="inline-flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("regular")}
            className={`px-6 py-2 font-medium transition ${
              viewMode === "regular"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Regular
          </button>

          <button
            onClick={() => setViewMode("permanent")}
            className={`px-6 py-2 font-medium transition ${
              viewMode === "permanent"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Permanent
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Sets the default display mode for all items.  
          You can still toggle modes individually on each card.
        </p>
      </div>

      {/* Item Grid */}
      <ItemFlipGrid items={filteredItems} mode={viewMode} />
    </div>
  );
};
