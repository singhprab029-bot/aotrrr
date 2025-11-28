import React, { memo, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Item } from "../types/Item";

interface ItemFlipCardProps {
  item: Item;
}

export const ItemFlipCard: React.FC<ItemFlipCardProps> = memo(({ item }) => {
  const [mode, setMode] = useState<"regular" | "permanent">("regular");

  const getDemandColor = (demand: number) => {
    if (demand <= 3) return "text-red-400";
    if (demand <= 6) return "text-yellow-400";
    return "text-green-400";
  };

  const getDemandBarColor = (demand: number) => {
    if (demand <= 3) return "bg-red-400";
    if (demand <= 6) return "bg-yellow-400";
    return "bg-green-400";
  };

  const getRateIcon = (rate: string) => {
    switch (rate) {
      case "Rising":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "Falling":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case "Overpriced":
        return <TrendingUp className="w-4 h-4 text-yellow-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRateColor = (rate: string) => {
    switch (rate) {
      case "Rising":
        return "text-green-400";
      case "Falling":
        return "text-red-400";
      case "Overpriced":
        return "text-yellow-400";
      default:
        return "text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Unobtainable":
        return "bg-red-900/70 text-red-200 border-red-700";
      case "Limited":
        return "bg-yellow-900/70 text-yellow-200 border-yellow-700";
      default:
        return "bg-green-900/70 text-green-200 border-green-700";
    }
  };

  const getTaxDisplay = (item: Item) => {
    if (item.gemTax && item.gemTax > 0) {
      return { label: "Gem Tax", emoji: "💎", value: item.gemTax, color: "text-purple-300" };
    } else if (item.goldTax && item.goldTax > 0) {
      return { label: "Gold Tax", emoji: "🪙", value: item.goldTax, color: "text-yellow-300" };
    }
    return { label: "Tax", emoji: "💸", value: 0, color: "text-gray-300" };
  };

  const renderItemIcon = (emoji: string) => {
    if (!emoji || typeof emoji !== "string") {
      return <span className="text-4xl sm:text-5xl">👹</span>;
    }

    if (emoji.startsWith("/")) {
      return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          <img
            src={emoji}
            alt={item.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain pixelated"
            style={{ imageRendering: "pixelated" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <span className="text-4xl sm:text-5xl hidden">👹</span>
        </div>
      );
    }

    return <span className="text-4xl sm:text-5xl">{emoji}</span>;
  };

  const taxInfo = getTaxDisplay(item);

  return (
    <div className="bg-[#050509] rounded-2xl border border-gray-800 hover:border-blue-500/80 transition-all duration-300 overflow-hidden flex flex-col shadow-lg hover:shadow-blue-500/20">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {renderItemIcon(item.emoji)}
          <div className="text-left">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
              {item.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{item.category}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </div>

      {/* Mode Tabs */}
      <div className="px-4 pt-3">
        <div className="inline-flex bg-gray-900 rounded-full border border-gray-800 p-1 text-xs font-medium">
          <button
            onClick={() => setMode("regular")}
            className={`px-3 py-1 rounded-full transition ${
              mode === "regular" ? "bg-blue-600 text-white" : "text-gray-300"
            }`}
          >
            Regular
          </button>
          <button
            onClick={() => setMode("permanent")}
            className={`px-3 py-1 rounded-full transition ${
              mode === "permanent" ? "bg-blue-600 text-white" : "text-gray-300"
            }`}
          >
            Permanent
          </button>
        </div>
      </div>

      {/* Main Value */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 text-center shadow-md">
          <p className="text-xs text-blue-100 mb-1 uppercase tracking-wide">
            {mode === "regular" ? "Regular Value" : "Permanent Value"}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            🔑 {item.value.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 py-4 space-y-3 text-sm">
        {/* Demand */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-gray-300 flex items-center gap-1">
            <span>📊</span>
            <span>Demand</span>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${getDemandColor(item.demand)}`}>
              {item.demand}/10
            </p>
            <div className="w-28 bg-gray-800 rounded-full h-1.5 mt-1 ml-auto">
              <div
                className={`h-1.5 rounded-full ${getDemandBarColor(item.demand)}`}
                style={{ width: `${(item.demand / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Trend */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-gray-300 flex items-center gap-1">
            <span>📈</span>
            <span>Trend</span>
          </div>
          <div className="flex items-center gap-2">
            {getRateIcon(item.rateOfChange)}
            <span className={`font-semibold ${getRateColor(item.rateOfChange)}`}>
              {item.rateOfChange}
            </span>
          </div>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-gray-300 flex items-center gap-1">
            <span>💸</span>
            <span>{taxInfo.label}</span>
          </div>
          <div className="text-right">
            {taxInfo.value > 0 ? (
              <span className={`font-semibold ${taxInfo.color}`}>
                {taxInfo.emoji} {taxInfo.value.toLocaleString()}
              </span>
            ) : (
              <span className="text-gray-400 text-sm">No tax</span>
            )}
          </div>
        </div>

        {/* Prestige */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-gray-300 flex items-center gap-1">
            <span>🏅</span>
            <span>Prestige</span>
          </div>
          <span className="font-semibold text-purple-300">
            {item.prestige ?? 0}
          </span>
        </div>
      </div>

      {/* How to Obtain (small footer section) */}
      <div className="px-4 pb-4">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
          <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <span>📦</span>
            <span>Obtained From</span>
          </p>
          <p className="text-xs text-gray-200 line-clamp-2">
            {item.obtainedFrom || "No info available."}
          </p>
        </div>
      </div>
    </div>
  );
});
