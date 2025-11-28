import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Item } from "../types/Item";

interface ItemCardProps {
  item: Item;
  mode: "regular" | "permanent"; // received from parent
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, mode }) => {
  const [modeState, setModeState] = useState<"regular" | "permanent">(mode);

  useEffect(() => {
    setModeState(mode); // sync with global mode change
  }, [mode]);

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
    if (rate === "Rising") return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (rate === "Falling") return <TrendingDown className="w-4 h-4 text-red-400" />;
    if (rate === "Overpriced") return <TrendingUp className="w-4 h-4 text-yellow-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getRateColor = (rate: string) => {
    if (rate === "Rising") return "text-green-400";
    if (rate === "Falling") return "text-red-400";
    if (rate === "Overpriced") return "text-yellow-400";
    return "text-gray-300";
  };

  const getStatusColor = (status: string) => {
    if (status === "Unobtainable") return "bg-red-900/70 text-red-200 border-red-700";
    if (status === "Limited") return "bg-yellow-900/70 text-yellow-200 border-yellow-700";
    return "bg-green-900/70 text-green-200 border-green-700";
  };

  const tax = item.gemTax
    ? { label: "Gem Tax", icon: "💎", value: item.gemTax, color: "text-purple-300" }
    : item.goldTax
    ? { label: "Gold Tax", icon: "🪙", value: item.goldTax, color: "text-yellow-300" }
    : { label: "Tax", icon: "💰", value: 0, color: "text-gray-300" };

  const renderIcon = (emoji: string) => {
    if (!emoji || typeof emoji !== "string") return <span className="text-6xl">👹</span>;

    if (emoji.startsWith("/"))
      return (
        <img src={emoji} className="w-24 h-24 mx-auto object-contain pixelated" />
      );

    return <span className="text-6xl">{emoji}</span>;
  };

  return (
    <div className="bg-[#06060A] rounded-2xl border border-gray-800 p-5 shadow-xl hover:border-blue-500 transition-all flex flex-col">

      {/* Name & Status */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-white font-bold text-lg">{item.name}</h2>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-4">{renderIcon(item.emoji)}</div>

      {/* Mode Buttons */}
      <div className="flex bg-gray-900 border border-gray-800 rounded-full w-max mx-auto mb-4">
        <button
          onClick={() => setModeState("regular")}
          className={`px-3 py-1 text-xs rounded-full ${
            modeState === "regular" ? "bg-blue-600 text-white" : "text-gray-300"
          }`}
        >
          Regular
        </button>
        <button
          onClick={() => setModeState("permanent")}
          className={`px-3 py-1 text-xs rounded-full ${
            modeState === "permanent" ? "bg-blue-600 text-white" : "text-gray-300"
          }`}
        >
          Permanent
        </button>
      </div>
      {/* Stats */}
      {/* Stats - CLEAN COSMIC STYLE */}
<div className="bg-black/40 rounded-xl p-4 space-y-3 border border-gray-800">

  {/* VALUE */}
  <div className="flex justify-between text-sm">
    <span className="text-gray-300 font-medium">Value</span>
    <span className="text-white font-bold">
      {item.value >= 1_000_000_000
        ? (item.value / 1_000_000_000).toFixed(2) + "B"
        : item.value >= 1_000_000
        ? (item.value / 1_000_000).toFixed(0) + "M"
        : item.value.toLocaleString()}
    </span>
  </div>

  {/* TREND */}
  <div className="flex justify-between text-sm">
    <span className="text-gray-300 font-medium">Trend</span>
    <span className={`font-bold ${getRateColor(item.rateOfChange)}`}>
      {item.rateOfChange}
    </span>
  </div>

  {/* DEMAND */}
  <div className="flex justify-between text-sm">
    <span className="text-gray-300 font-medium">Demand</span>
    <span className={`font-bold ${getDemandColor(item.demand)}`}>
      {item.demand}/10
    </span>
  </div>

  {/* TAX */}
  <div className="flex justify-between text-sm">
    <span className="text-gray-300 font-medium">{tax.label}</span>
    <span className={`font-bold ${tax.color}`}>
      {tax.value > 0 ? `${tax.icon} ${tax.value.toLocaleString()}` : "None"}
    </span>
  </div>

  {/* PRESTIGE */}
  <div className="flex justify-between text-sm">
    <span className="text-gray-300 font-medium">Prestige</span>
    <span className="text-purple-300 font-bold">
      {item.prestige}
    </span>
  </div>

</div>
    </div>
  );
};
