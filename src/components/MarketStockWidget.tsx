import React, { useEffect, useState } from "react";
import { Item } from "../types/Item";

export const MarketStockWidget: React.FC<{ items: Item[] }> = ({ items }) => {
  // Pick 4 random obtainable items
  const obtainableItems = items.filter((i) => i.status !== "Unobtainable");
  const stock = obtainableItems.slice(0, 4); // temporary

  // ------------------------------
  // 🚨 FIXED RESET TIME FUNCTION
  // ------------------------------
  const getNextResetTime = () => {
    const now = new Date();

    // Get time in LONDON (handles DST automatically)
    const londonNow = new Date(
      now.toLocaleString("en-GB", { timeZone: "Europe/London" })
    );

    const hour = londonNow.getHours();

    // Next shop refresh hour (00, 06, 12, 18)
    const nextHour =
      hour < 6 ? 6 :
      hour < 12 ? 12 :
      hour < 18 ? 18 :
      24;

    const next = new Date(londonNow);
    next.setHours(nextHour, 0, 0, 0);

    return next;
  };

  // ------------------------------
  // 🚨 FIXED COUNTDOWN CALCULATION
  // ------------------------------
  const formatCountdown = (target: Date) => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return "0h 0m 0s";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [nextReset, setNextReset] = useState<Date>(getNextResetTime());
  const [countdown, setCountdown] = useState<string>("");

  // ------------------------------
  // 🚨 FIXED LIVE TIMER
  // ------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = formatCountdown(nextReset);
      setCountdown(timeLeft);

      // If reset reached → generate next one
      if (timeLeft === "0h 0m 0s") {
        const newReset = getNextResetTime();
        setNextReset(newReset);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextReset]);

  return (
    <div className="bg-[#101522] border border-gray-700 rounded-2xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-bold">Market Stock</h2>

        <p className="text-blue-400 text-sm">
          Refreshes in {countdown}
        </p>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stock.map((item) => (
          <div
            key={item.id}
            className="bg-[#0D111A] border border-gray-700 rounded-xl p-3 text-center"
          >
            <div className="text-3xl mb-2">
              {item.emoji}
            </div>
            <p className="text-white text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
