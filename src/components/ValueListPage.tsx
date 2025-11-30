import React, { useState } from "react";
import { ItemFlipGrid } from "./ItemFlipGrid";
import { Item } from "../types/Item";

interface ValueListPageProps {
  items: Item[];
}

export const ValueListPage: React.FC<ValueListPageProps> = ({ items }) => {
  const [viewMode, setViewMode] = useState<"regular" | "permanent">("regular");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">
        AOT:R Value List
      </h1>

      {/* Description */}
      <p className="text-gray-400 max-w-lg sm:max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base px-2">
        Browse our complete AOT:R value list ({items.length}+ items).  
        <span className="block sm:inline text-yellow-400 font-semibold mt-1 sm:mt-0">
          ⚠ Values are temporarily outdated — join Discord for verified prices.
        </span>
      </p>

      {/* Toggle */}
      <div className="mb-10 sm:mb-12">
        <h3 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
          Default View Mode
        </h3>

        <div className="inline-flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden w-full max-w-xs sm:max-w-none">
          <button
            onClick={() => setViewMode("regular")}
            className={`flex-1 px-4 py-2 sm:px-6 sm:py-2 font-medium text-sm sm:text-base ${
              viewMode === "regular"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Keys
          </button>

          <button
            onClick={() => setViewMode("permanent")}
            className={`flex-1 px-4 py-2 sm:px-6 sm:py-2 font-medium text-sm sm:text-base ${
              viewMode === "permanent"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Vizard
          </button>
        </div>

        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          Sets the default display mode for all items.
        </p>
      </div>

      {/* Items Grid */}
      <div className="mt-2">
        <ItemFlipGrid items={items} mode={viewMode} />
      </div>
    </div>
  );
};
