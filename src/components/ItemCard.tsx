import React, { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Item } from "../types/Item";

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [mode, setMode] = useState<"regular" | "permanent">("regular");

  // Demand Color
  const getDemandColor = (demand: number) => {
    if (demand <= 3) return "text-red-400";
    if (demand <= 6) return "text-yellow-400";
    return "text-green-400";
  };

  // Trend Color
  const getTrendColor = (trend: string) => {
    if (trend === "Rising") return "text-green-400";
    if (trend === "Falling") return "text-red-400";
    if (trend === "Overpriced") return "text-yellow-400";
    return "text-gray-300";
  };

  // Trend Icon
  const getTrendIcon = (trend: string) => {
    if (trend === "Rising") return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === "Falling") return <TrendingDown className="w-4 h-4 text-red-400" />;
    if (trend === "Overpriced") return <TrendingUp className="w-4 h-4 text-yellow-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  // Status Badge
  const getStatusBadge = (status: string) => {
    if (status === "Unobtainable")
      return "bg-red-900/70 text-red-200 border-red-700";
    if (status === "Limited")
      return "bg-yellow-900/70 text-yellow-200 border-yellow-700";
    return "bg-green-900/70 text-green-200 border-green-700";
  };

  // Tax
  const tax = item.gemTax
    ? { label: "Gem Tax", emoji: "💎", color: "text-purple-300", value: item.gemTax }
    : item.goldTax
    ? { label: "Gold Tax", emoji: "🪙", color: "text-yellow-300", value: item.goldTax }
    : { label: "Tax", emoji: "💰", color: "text-gray-400", value: 0 };

  // Icon
  const renderIcon = () => {
    if (!item.emoji || typeof item.emoji !== "string")
      return <span className="text-6xl">👹</span>;
    if (item.emoji.startsWith("/"))
      return (
        <img
          src={item.emoji}
          alt={item.name}
          className="w-24 h-24 mx-auto object-contain pixelated"
          style={{ imageRendering: "pixelated" }}
        />
      );
    return <span className="text-6xl">{item.emoji}</span>;
  };

  return (
    <div className="bg-[#06060A] border border-gray-800 rounded-2xl p-5 shadow-lg hover:border-blue-500 transition-all">
      
      {/* STATUS BADGE */}
      <div className="flex justify-end">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.status)}`}>
          {item.status}
        </span>
      </div>

      {/* ICON */}
      <div className="flex justify-center mt-2 mb-3">{renderIcon()}</div>

      {/* NAME */}
      <h2 className="text-xl font-bold text-white text-center">{item.name}</h2>

      {/* MODE */}
      <div className="flex justify-center space-x-3 my-4">
        <button
          onClick={() => setMode("regular")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            mode === "regular" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
          }`}>
          Regular
        </button>
        <button
          onClick={() => setMode("permanent")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            mode === "permanent" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
          }`}>
          Permanent
        </button>
      </div>

      {/* VALUE BOX – BFV STYLE */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 text-center shadow-lg mb-6">
        <p className="text-xs text-blue-100 tracking-wide mb-1">
          {mode === "regular" ? "REGULAR VALUE" : "PERMANENT VALUE"}
        </p>
        <div className="flex justify-center items-center space-x-2">
          <span className="text-3xl">🔑</span>
          <span className="text-4xl font-extrabold text-white">
            {item.value.toLocaleString()}
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="space-y-4 text-sm">

        {/* DEMAND */}
        <div className="flex justify-between">
          <span className="text-gray-300">📊 Demand</span>
          <span className={`font-bold ${getDemandColor(item.demand)}`}>
            {item.demand}/10
          </span>
        </div>

        {/* TREND */}
        <div className="flex justify-between">
          <span className="text-gray-300">📈 Trend</span>
          <span className={`flex items-center gap-1 font-bold ${getTrendColor(item.rateOfChange)}`}>
            {getTrendIcon(item.rateOfChange)}
            {item.rateOfChange}
          </span>
        </div>

        {/* TAX */}
        <div className="flex justify-between">
          <span className="text-gray-300">{tax.label}</span>
          <span className={`font-bold ${tax.color}`}>
            {tax.value > 0 ? `${tax.emoji} ${tax.value.toLocaleString()}` : "None"}
          </span>
        </div>

        {/* PRESTIGE */}
        <div className="flex justify-between">
          <span className="text-gray-300">🏅 Prestige</span>
          <span className="text-purple-300 font-bold">{item.prestige}</span>
        </div>

      </div>
    </div>
  );
};
