import React, { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Item } from "../types/Item";

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [mode, setMode] = useState<"regular" | "permanent">("regular");

  // Trend Color
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Rising":
        return "text-green-400";
      case "Falling":
        return "text-red-400";
      case "Overpaid":
      case "Overpriced":
        return "text-yellow-400";
      default:
        return "text-blue-300";
    }
  };

  // Demand Color
  const getDemandColor = (demand: number) => {
    if (demand <= 3) return "text-red-400";
    if (demand <= 6) return "text-yellow-400";
    return "text-green-400";
  };

  // Trend Icon
  const getTrendIcon = (rate: string) => {
    switch (rate) {
      case "Rising":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "Falling":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  // Status Badge (top right)
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Unobtainable":
        return "bg-red-900 text-red-200 border-red-700";
      case "Limited":
        return "bg-yellow-900 text-yellow-200 border-yellow-700";
      default:
        return "bg-green-900 text-green-200 border-green-700";
    }
  };

  // Tax
  const tax = item.gemTax
    ? { label: "Gem Tax", emoji: "💎", value: item.gemTax, color: "text-purple-400" }
    : item.goldTax
    ? { label: "Gold Tax", emoji: "🪙", value: item.goldTax, color: "text-yellow-400" }
    : { label: "Tax", emoji: "💰", value: 0, color: "text-gray-400" };

  // Emoji Renderer
  const renderEmoji = (emoji: string) => {
    if (!emoji || typeof emoji !== "string") return <span>👹</span>;
    if (emoji.startsWith("/"))
      return (
        <img
          src={emoji}
          alt={item.name}
          className="w-24 h-24 object-contain pixelated mx-auto"
          style={{ imageRendering: "pixelated" }}
        />
      );
    return <span className="text-6xl">{emoji}</span>;
  };

  return (
    <div className="bg-black border border-gray-800 rounded-2xl p-5 shadow-lg hover:border-blue-500 transition-all w-full">
      
      {/* Status Badge */}
      <div className="flex justify-end">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-3">{renderEmoji(item.emoji)}</div>

      {/* Name */}
      <h2 className="text-xl font-bold text-white text-center mb-4">{item.name}</h2>

      {/* Regular / Permanent Tabs */}
      <div className="flex justify-center space-x-3 mb-4">
        <button
          onClick={() => setMode("regular")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            mode === "regular"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          Regular
        </button>

        <button
          onClick={() => setMode("permanent")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            mode === "permanent"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          Permanent
        </button>
      </div>

      {/* Value Box */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-center mb-5">
        <p className="text-sm text-blue-100 mb-1">
          {mode === "regular" ? "REGULAR VALUE" : "PERMANENT VALUE"}
        </p>
        <p className="text-3xl font-bold text-white">🔑 {item.value.toLocaleString()}</p>
      </div>

      {/* Stats */}
      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-300">📊 Demand</span>
          <span className={`font-bold ${getDemandColor(item.demand)}`}>
            {item.demand}/10
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">📈 Trend</span>
          <span className={`font-bold flex items-center space-x-1 ${getTrendColor(item.rateOfChange)}`}>
            {getTrendIcon(item.rateOfChange)}
            <span>{item.rateOfChange}</span>
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">{tax.label}</span>
          <span className={`font-bold ${tax.color}`}>
            {tax.value > 0 ? `${tax.emoji} ${tax.value.toLocaleString()}` : "None"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">🏅 Prestige</span>
          <span className="text-purple-400 font-bold">{item.prestige}</span>
        </div>

      </div>
    </div>
  );
};
