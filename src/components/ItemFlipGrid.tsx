import React, { useState, memo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Item } from "../types/Item";

interface ItemFlipCardProps {
  item: Item;
  mode?: "regular" | "permanent";
}

export const ItemFlipCard: React.FC<ItemFlipCardProps> = memo(({ item, mode: externalMode }) => {
  const [mode, setMode] = useState<"regular" | "permanent">(externalMode || "regular");

  // Demand Color
  const getDemandColor = (demand: number) => {
    if (demand <= 3) return "text-red-400";
    if (demand <= 6) return "text-yellow-400";
    return "text-green-400";
  };

  const getDemandBar = (demand: number) => {
    if (demand <= 3) return "bg-red-400";
    if (demand <= 6) return "bg-yellow-400";
    return "bg-green-400";
  };

  // Trend Icon + Color
  const getTrendIcon = (rate: string) => {
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

  const getTrendColor = (rate: string) => {
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

  // Status badge
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

  // Tax
  const getTax = () => {
    if (item.gemTax)
      return {
        label: "Gem Tax",
        icon: "💎",
        value: item.gemTax,
        color: "text-purple-300"
      };

    if (item.goldTax)
      return {
        label: "Gold Tax",
        icon: "🪙",
        value: item.goldTax,
        color: "text-yellow-300"
      };

    return {
      label: "Tax",
      icon: "💰",
      value: 0,
      color: "text-gray-300"
    };
  };

  const tax = getTax();

  // Emoji renderer
  const renderEmoji = (emoji: string) => {
    if (!emoji || typeof emoji !== "string") return <span className="text-6xl">👹</span>;

    if (emoji.startsWith("/"))
      return (
        <img
          src={emoji}
          alt={item.name}
          className="w-24 h-24 object-contain mx-auto pixelated"
          style={{ imageRendering: "pixelated" }}
        />
      );

    return <span className="text-6xl">{emoji}</span>;
  };

  return (
    <div className="bg-[#0a0a0f] rounded-2xl border border-gray-800 p-5 shadow-lg hover:border-blue-500 transition-all flex flex-col">

      {/* Item Icon */}
      <div className="flex justify-center mb-3">
        {renderEmoji(item.emoji)}
      </div>

      {/* Status Badge BELOW ICON (Your desired A layout) */}
      <div className="flex justify-center mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)}`}
        >
          {item.status}
        </span>
      </div>

      {/* Item Name */}
      <h2 className="text-xl font-bold text-white text-center mb-4">
        {item.name}
      </h2>

      {/* Regular / Permanent Toggle */}
      <div className="flex justify-center space-x-3 mb-4">
        <button
          onClick={() => setMode("regular")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            mode === "regular" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
          }`}
        >
          Regular
        </button>

        <button
          onClick={() => setMode("permanent")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            mode === "permanent" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
          }`}
        >
          Permanent
        </button>
      </div>

      {/* VALUE BOX (Perfect cosmic style) */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-center shadow-lg mb-5">
        <p className="text-xs text-blue-100 mb-1">
          {mode === "regular" ? "REGULAR VALUE" : "PERMANENT VALUE"}
        </p>
        <p className="text-3xl font-extrabold text-white">
          🔑 {item.value.toLocaleString()}
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-4 text-sm">

        {/* Demand */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-300">📊 Demand</span>
            <span className={`font-bold ${getDemandColor(item.demand)}`}>
              {item.demand}/10
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${getDemandBar(item.demand)}`}
              style={{ width: `${item.demand * 10}%` }}
            />
          </div>
        </div>

        {/* Trend */}
        <div className="flex justify-between">
          <span className="text-gray-300">📈 Trend</span>
          <span className={`flex items-center gap-1 ${getTrendColor(item.rateOfChange)}`}>
            {getTrendIcon(item.rateOfChange)}
            {item.rateOfChange}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between">
          <span className="text-gray-300">💰 {tax.label}</span>
          <span className={`font-bold ${tax.color}`}>
            {tax.value > 0 ? `${tax.icon} ${tax.value.toLocaleString()}` : "None"}
          </span>
        </div>

        {/* Prestige */}
        <div className="flex justify-between">
          <span className="text-gray-300">🏅 Prestige</span>
          <span className="text-purple-300 font-semibold">
            {item.prestige}
          </span>
        </div>

      </div>
    </div>
  );
});
