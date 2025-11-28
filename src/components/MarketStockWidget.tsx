import React, { useEffect, useState } from "react";
import { Item } from "../types/Item";

export const MarketStockWidget: React.FC<{ items: Item[] }> = ({ items }) => {
  // Choose 4 obtainable items
  const obtainable = items.filter((i) => i.status !== "Unobtainable");

  const randomStock = obtainable.sort(() => 0.5 - Math.random()).slice(0, 4);

  const [stock] = useState(randomStock);
  const [countdown, setCountdown] = useState("Loading...");

  // --------------------------------------
  // FIXED: Get next reset time every 6 hours
  // 00:00, 06:00, 12:00, 18:00 LONDON TIME
  // --------------------------------------
  const getNextReset = () => {
    const now = new Date();

    const londonNow = new Date(
      now.toLocaleString("en-GB", { timeZone: "Europe/London" })
    );

    const hour = londonNow.getHours();
    const nextHour =
      hour < 6 ? 6 :
      hour < 12 ? 12 :
      hour < 18 ? 18 :
      24;

    const next = new Date(londonNow);
    next.setHours(nextHour, 0, 0, 0);

    return next;
  };

  const [nextReset, setNextReset] = useState<Date | null>(null);

  // --------------------------------------
  // FIXED COUNTDOWN CALCULATOR — NO NAN EVER
  // --------------------------------------
  const updateCountdown = () => {
    if (!nextReset) return setCountdown("Loading...");

    const now = new Date();
    const diff = nextReset.getTime() - now.getTime();

    if (diff <= 0) {
      // Regenerate next reset time
      const newReset = getNextReset();
      setNextReset(newReset);
      return setCountdown("0h 0m 0s");
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    setCountdown(`${h}h ${m}m ${s}s`);
  };

  // --------------------------------------
  // START TIMER
  // --------------------------------------
  useEffect(() => {
    setNextReset(getNextReset());

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextReset]);

  // --------------------------------------
  // FIX: Proper Emoji Renderer for Item Icons
  // --------------------------------------
  const renderEmoji = (emoji: string) => {
    if (!emoji) return <span className="text-3xl">❓</span>;

    if (emoji.startsWith("/"))
      return (
        <img
          src={emoji}
          className="w-16 h-16 mx-auto object-contain"
          alt="icon"
        />
      );

    return <span className="text-4xl">{emoji}</span>;
  };

  return (
    <div className="bg-[#0C111C] border border-gray-800 rounded-2xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-bold text-lg">Market Stock</h2>
        <p className="text-blue-400 text-sm">Refreshes in {countdown}</p>
      </div>

      {/* Stock items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stock.map((item) => (
          <div
            key={item.id}
            className="bg-[#111827] border border-gray-700 rounded-xl p-4 text-
