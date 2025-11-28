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

  const getTax = () => {
    if (item.gemTax && item.gemTax > 0)
      return { icon: "💎", label: "Gem Tax", value: item.gemTax, color: "text-purple-300" };

    if (item.goldTax && item.goldTax > 0)
      return { icon: "🪙", label: "Gold Tax", value: item.goldTax, color: "text-yellow-300" };

    return { icon: "💸", label: "Tax", value: 0, color: "text-gray-300" };
  };

  const tax = getTax();

  const renderItemIcon = (emoji: string) => {
    if (!emoji || typeof emoji !== "string")
      return <span className="text-5xl">👹</span>;

    if (emoji.startsWith("/"))
      return (
        <img
          src={emoji}
          alt={item.name}
          className="w-20 h-20 object-contain mx-auto"
        />
      );

    return <span className="text-5xl">{emoji}</span>;
  };

  return (
    <div className="bg-[#06060A] rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 p-4 flex flex-col">
      
      {/* ITEM HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-bold text-lg">{item.name}</h3>
          <p className="text-xs text-gray-400">{item.category}</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>

      {/* ICON */}
      <div className="flex justify-center mb-4">
        {renderItemIcon(item.emoji)}
      </div>

      {/* MODE SELECTOR */}
      <div className="flex bg-gray-900 border border-gray-800 rounded-full p-1 w-max mx-auto mb-4">
        <button
          onClick={() => setMode("regular")}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            mode === "regular" ? "bg-blue-600 text-white" : "text-gray-300"
          }`}
        >
          Regular
        </button>
        <button
          onClick={() => setMode("permanent")}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            mode === "permanent" ? "bg-blue-600 text-white" : "text-gray-300"
          }`}
        >
          Permanent
        </button>
      </div>

      {/* VALUE */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-center p-4 shadow-lg mb-4">
        <p className="text-xs text-blue-100 mb-1">REGULAR VALUE</p>
        <p className="text-3xl font-extrabold text-white">🔑 {item.value.toLocaleString()}</p>
      </div>

      {/* STATS */}
      <div className="space-y-3 text-sm">
      
        {/* DEMAND */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 flex items-center gap-1">
            📊 Demand
          </span>
          <span className={`font-semibold ${getDemandColor(item.demand)}`}>
            {item.demand}/10
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${getDemandBarColor(item.demand)}`}
            style={{ width: `${(item.demand / 10) * 100}%` }}
          />
        </div>

        {/* TREND */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 flex items-center gap-1">
            📈 Trend
          </span>
          <div className="flex items-center gap-1">
            {getRateIcon(item.rateOfChange)}
            <span className={`font-semibold ${getRateColor(item.rateOfChange)}`}>
              {item.rateOfChange}
            </span>
          </div>
        </div>

        {/* TAX */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 flex items-center gap-1">
            💰 {tax.label}
          </span>
          {tax.value > 0 ? (
            <span className={`font-semibold ${tax.color}`}>
              {tax.icon} {tax.value.toLocaleString()}
            </span>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </div>

        {/* PRESTIGE */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 flex items-center gap-1">
            🏅 Prestige
          </span>
          <span className="text-purple-300 font-semibold">{item.prestige}</span>
        </div>
      </div>
    </div>
  );
});
