import React, { useEffect, useState } from "react";
import { Item } from "../types/Item";

// Calculates next shop reset (00:00 / 06:00 / 12:00 / 18:00 London time)
const getNextResetTime = () => {
  const now = new Date();

  // London timezone (handles DST)
  const londonNow = new Date(
    now.toLocaleString("en-GB", { timeZone: "Europe/London" })
  );

  const hour = londonNow.getHours();
  const nextResetHour =
    hour < 6 ? 6 :
    hour < 12 ? 12 :
    hour < 18 ? 18 :
    24; // midnight

  const next = new Date(londonNow);
  next.setHours(nextResetHour, 0, 0, 0);

  return next;
};

const getRemainingTimeString = (target: Date) => {
  const now = new Date();

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return "0h 0m 0s";

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  return `${h}h ${m}m ${s}s`;
};


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
