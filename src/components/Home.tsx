import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "../types/Item";
import { FAQSection } from "./FAQSection";
import { MarketStockWidget } from "./MarketStockWidget";

interface HomeProps {
  items: Item[];
}

export const Home: React.FC<HomeProps> = ({ items }) => {
  const heroImages = ["/hero1.png", "/hero2.png", "/hero3.png"];
  const [index, setIndex] = useState(0);

  // Rotate images every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-black min-h-screen">

      {/* Background slideshow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-[1200ms]
            ${i === index ? "opacity-30" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">

        {/* --------------------------- */}
        {/* HERO SECTION */}
        {/* --------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE TEXT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              AOT:R <span className="text-blue-400">Values</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-lg mt-6">
              The ultimate hub for Attack on Titan Revolution trading.
              Get live values, trade analysis, and community trade offers.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/trade-ads"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
              >
                Start Trading →
              </Link>

              <Link
                to="/value-list"
                className="px-6 py-3 rounded-xl bg-gray-800 text-gray-200 font-medium hover:bg-gray-700 transition border border-gray-700 flex items-center gap-2"
              >
                Values ★
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-800 bg-black/40 backdrop-blur">
              <img
                src="/hero.png"
                alt="AOTR Hero"
                className="w-full max-w-md h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* --------------------------- */}
        {/* FEATURES SECTION */}
        {/* --------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-white mb-6">AOTR Features</h2>
          <p className="text-gray-400 mb-10">
            Everything you need for successful trading.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Real-Time Values", desc: "Accurate values with market trends.", link: "/value-list" },
              { title: "Trade Ads", desc: "Browse community-posted offers.", link: "/trade-ads" },
              { title: "Trade Calculator", desc: "Analyze trades instantly.", link: "/calculator" },
              { title: "Scam Logs", desc: "Stay safe and avoid scammers.", link: "/scam-logs" },
            ].map((feature, i) => (
              <Link
                to={feature.link}
                key={i}
                className="
                  block bg-gray-900/40 border border-gray-700 
                  rounded-2xl p-6 shadow-lg transition
                  hover:border-blue-500 hover:bg-gray-900/60 hover:-translate-y-1
                "
              >
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.desc}</p>
                <span className="text-blue-400 font-medium">Explore →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* --------------------------- */}
        {/* ⭐ MARKET STOCK SECTION ⭐ */}
        {/* --------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <MarketStockWidget items={items} />
        </section>

        {/* --------------------------- */}
        {/* FAQ SECTION */}
        {/* --------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <FAQSection />
        </section>
      </div>
    </div>
  );
};
