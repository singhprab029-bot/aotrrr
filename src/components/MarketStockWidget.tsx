import React, { useEffect, useState } from "react";
import { Item } from "../types/Item";

// --- UK Reset Logic ---
function getNextResetTime(): number {
  const now = new Date();
  const ukNow = new Date(now.toLocaleString("en-GB", { timeZone: "Europe/London" }));
  const resetHours = [0, 6, 12, 18];
  const next = new Date(ukNow);

  for (let h of resetHours) {
    next.setHours(h, 0, 0, 0);
    if (next > ukNow) return next.getTime();
  }

  next.setDate(next.getDate() + 1);
  next.setHours(0, 0, 0, 0);

  return next.getTime();
}

interface Props {
  items: Item[];
}

export const MarketStockWidget: React.FC<Props> = ({ items }) => {
  const [stock, setStock] = useState<Item[]>([]);
  const [nextReset, setNextReset] = useState<number>(getNextResetTime());
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const savedStock = localStorage.getItem("market_stock");
    const savedReset = Number(localStorage.getItem("market_reset"));
    const now = Date.now();

    if (savedStock && savedReset && now < savedReset) {
      setStock(JSON.parse(savedStock));
      setNextReset(savedReset);
      return;
    }

    // Filter shop-valid rarity items
    const pool = items.filter(
      (i) =>
        i.status === "Obtainable" &&
        ["Common", "Rare", "Legendary"].includes(i.rarity)
    );

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);

    const resetTime = getNextResetTime();

    setStock(selected);
    setNextReset(resetTime);

    localStorage.setItem("market_stock", JSON.stringify(selected));
    localStorage.setItem("market_reset", String(resetTime));
  }, [items]);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = nextReset - Date.now();
      if (diff <= 0) return window.location.reload();

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setCountdown(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextReset]);

  return (
    <div className="mt-16 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Market Stock</h2>
        <span className="text-blue-400 text-sm">Refreshes in {countdown}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stock.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700 hover:border-blue-500 transition"
          >
            <div className="text-4xl mb-2">{item.emoji}</div>
            <p className="text-white font-semibold text-sm">{item.name}</p>
            <p className="text-gray-400 text-xs mt-1">{item.rarity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
