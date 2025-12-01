import React, { useEffect, useState } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { supabase } from "../lib/supabase";
import { getNextReset } from "../types/getNextReset";

export const StockRestocker: React.FC = () => {
  const [stock, setStock] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [loading, setLoading] = useState(true);

  // Auto-load stock
  useEffect(() => {
    loadStock();
    const interval = setInterval(loadStock, 60000);
    return () => clearInterval(interval);
  }, []);

  async function loadStock() {
    try {
      setLoading(true);
      // Check if expired
      const { data } = await supabase
        .from("stock_rotation")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (!data) {
        setLoading(false);
        return;
      }

    const now = new Date();
    const expiry = new Date(data.expires_at);

    // If expired → reset
    if (now >= expiry) {
      const next = getNextReset();
      await supabase
        .from("stock_rotation")
        .update({
          slot1: null,
          slot2: null,
          slot3: null,
          slot4: null,
          updated_for_cycle: false,
          expires_at: next
        })
        .eq("id", 1);

      setStock({
        slot1: null,
        slot2: null,
        slot3: null,
        slot4: null,
        expires_at: next
      });

      setTimer(next);
      return;
    }

      setStock(data);
      setTimer(data.expires_at);
      setLoading(false);
    } catch (error) {
      console.error("Error loading stock:", error);
      setLoading(false);
    }
  }

  // Countdown Timer
  function setTimer(expiresAt: string) {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();

      const diff = expiry - now;
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(
          2,
          "0"
        )}:${String(s).padStart(2, "0")}`
      );
    }, 1000);
  }

  if (!stock && !loading) return null;

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Stock Restocker
          </h2>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-yellow-400" />
          <p className="text-gray-300 text-sm md:text-base">
            Next restock in: <span className="font-mono font-bold text-blue-400">{timeLeft}</span>
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:p-6 flex justify-center items-center animate-pulse"
              >
                <div className="w-full h-12 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[stock.slot1, stock.slot2, stock.slot3, stock.slot4].map(
              (item, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 border border-gray-700 hover:border-blue-500 rounded-lg p-4 md:p-6 flex justify-center items-center text-white text-lg md:text-xl font-bold transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {item ? (
                    <span className="text-center break-words">{item}</span>
                  ) : (
                    <span className="text-gray-500">?</span>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};
