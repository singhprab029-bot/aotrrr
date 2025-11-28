import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "../types/Item";
import { FAQSection } from "./FAQSection";

interface HomeProps {
  items: Item[];
}

export const Home: React.FC<HomeProps> = ({ items }) => {
  const heroImages = [
    "/hero1.png",
    "/hero2.png",
    "/hero3.png",
  ];

  const [index, setIndex] = useState(0);

  // Rotate background images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white min-h-screen">

      {/* Background slideshow with fade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] 
              ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* White overlay for temporary BG */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10">

        {/* -------------------------------------- */}
        {/* HERO SECTION */}
        {/* -------------------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="text-black">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              AOT:R <span className="text-blue-500">Values</span>
            </h1>

            <p className="text-gray-700 text-lg md:text-xl max-w-lg mt-6">
              The ultimate hub for Attack on Titan Revolution trading.
              Get live values, trade analysis, and community-posted trade offers.
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
                className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition border border-gray-400 flex items-center gap-2"
              >
                Values ★
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-300 bg-white/60 backdrop-blur">
              <img
                src="/hero.png"
                alt="AOTR Hero"
                className="w-full max-w-md h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------- */}
        {/* FEATURES */}
        {/* -------------------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-black mb-6">
            AOTR Values Features
          </h2>
          <p className="text-gray-700 mb-10">
            Everything you need for successful Attack on Titan Revolution trading.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Real-Time Values",
                desc: "Updated trading values with accurate market trends.",
                link: "/value-list",
              },
              {
                title: "Trade Ads",
                desc: "Browse active trade offers from players.",
                link: "/trade-ads",
              },
              {
                title: "Smart Calculator",
                desc: "Analyze trades instantly and avoid overpaying.",
                link: "/calculator",
              },
              {
                title: "Safe Trading",
                desc: "Stay safe with verified scam logs.",
                link: "/scam-logs",
              },
            ].map((feature, i) => (
              <Link
                to={feature.link}
                key={i}
                className="
                  block bg-white shadow-md border border-gray-300 
                  rounded-2xl p-6 transition
                  hover:border-blue-500 hover:shadow-blue-300/40 hover:-translate-y-1
                "
              >
                <h3 className="text-xl font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{feature.desc}</p>
                <span className="text-blue-500 font-medium">Explore →</span>
              </Link>
            ))}
          </div>
        </section>

        import { MarketStockWidget } from "./MarketStockWidget";

export const Home: React.FC<HomeProps> = ({ items }) => {
  return (
    <div className="relative">

      {/* HERO... */}

      {/* FEATURES... */}

      {/* ⭐ MARKET STOCK WIDGET HERE ⭐ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <MarketStockWidget items={items} />
      </section>

      {/* FAQ... */}

    </div>
  );
};


        {/* -------------------------------------- */}
        {/* FAQ SECTION */}
        {/* -------------------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <FAQSection />
        </section>

      </div>
    </div>
  );
};
