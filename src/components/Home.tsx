import React from "react";
import { Link } from "react-router-dom";
import { Item } from "../types/Item";
import { FAQSection } from "./FAQSection";
import { VideoSlider } from "./VideoSlider";
import { StockRestocker } from "../components/StockRestocker";
import { LineChart, Sparkles, Calculator, Shield } from "lucide-react";

interface HomeProps {
  items: Item[];
}

export const Home: React.FC<HomeProps> = ({ items }) => {
  return (
    <div className="relative">

      {/* GLOBAL WHITE GRID */}
      <div className="absolute inset-0 bg-[url('/gridd.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

      <div className="relative z-10">

        {/* ============================== */}
        {/* HERO SECTION */}
        {/* ============================== */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT SECTION */}
          <div className="text-center lg:text-left space-y-7">

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--gold-soft)]">
              AOT:R Trading Hub
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--gold-bright)] drop-shadow-md leading-tight">
              AOT:R <span className="text-[var(--gold-soft)]">Values</span>
            </h1>

            <div className="h-0.5 w-24 bg-gradient-to-r from-[var(--gold-soft)] to-[var(--gold-bright)] mx-auto lg:mx-0" />

            <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto lg:mx-0">
              The ultimate hub for Attack on Titan Revolution trading — values,
              trade ads, calculators, and more in one clean platform.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <Link
                to="/trade-ads"
                className="px-6 py-3 rounded-xl 
                bg-[var(--gold-bright)] text-black font-semibold 
                hover:bg-[var(--gold-soft)] transition transform hover:-translate-y-0.5"
              >
                Start Trading →
              </Link>

              <Link
                to="/value-list"
                className="px-6 py-3 rounded-xl 
                bg-[#111] text-[var(--gold-soft)] font-medium 
                border border-gray-700 hover:border-[var(--gold-bright)]
                hover:bg-[#1a1a1a] transition transform hover:-translate-y-0.5"
              >
                View Values ★
              </Link>
            </div>

            {/* BADGES */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
              <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gray-800 text-xs text-gray-300">
                Updated Daily
              </div>
              <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gray-800 text-xs text-gray-300">
                Safe • Accurate • Community Trusted
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mx-auto w-full max-w-sm md:max-w-md lg:max-w-full">
            <div className="absolute -inset-6 rounded-3xl bg-[var(--gold-bright)] opacity-10 blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[rgba(255,220,150,0.15)] bg-black/40 backdrop-blur">
              <img src="/hero.png" alt="AOTR Hero" className="w-full object-cover" />
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <Divider />

        {/* ============================== */}
        {/* VIDEO HIGHLIGHTS */}
        {/* ============================== */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--gold-bright)]">
                Popular Highlights
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                Clips, updates, and top community moments.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Side fades */}
            <GradientFadeLeft />
            <GradientFadeRight />

            <VideoSlider />
          </div>
        </section>

        {/* DIVIDER */}
        <Divider />

        {/* ============================== */}
        {/* STOCK RESTOCKER */}
        {/* ============================== */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
          <SectionHeader
            title="Stock Restocker"
            desc="Track limited-time shop items so you never miss a restock."
            badge="Live Updates"
            icon={<Sparkles className="w-4 h-4 text-[var(--gold-bright)]" />}
          />

          <div className="rounded-2xl bg-[#050509]/80 border border-[rgba(255,220,150,0.18)] shadow-lg p-4 md:p-5">
            <StockRestocker />
          </div>
        </section>

        {/* DIVIDER */}
        <Divider />

        {/* ============================== */}
        {/* FEATURES */}
        {/* ============================== */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
          <h2 className="text-3xl font-bold text-[var(--gold-bright)] mb-3">
            Website Features
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl text-sm md:text-base">
            Tools and systems designed to make AOT:R trading faster, smarter and safer.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {featureCards.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </section>

        {/* ============================== */}
        {/* FAQ */}
        {/* ============================== */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-16">
          <h2 className="text-3xl font-bold text-[var(--gold-bright)] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl text-sm md:text-base">
            New to the site or trading? Start here.
          </p>

          <FAQSection />
        </section>
      </div>
    </div>
  );
};

/* ============================== */
/* COMPONENTS USED ABOVE */
/* ============================== */

const Divider = () => (
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-soft)] to-transparent opacity-20 mb-12" />
  </div>
);

const GradientFadeLeft = () => (
  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#090A0F] to-transparent" />
);
const GradientFadeRight = () => (
  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#090A0F] to-transparent" />
);

const featureCards = [
  {
    title: "Real-Time Values",
    desc: "Curated values updated based on demand and real trades.",
    icon: <LineChart className="w-8 h-8 text-[var(--gold-bright)]" />,
    link: "/value-list",
  },
  {
    title: "Trade Ads",
    desc: "Post offers and find matching traders instantly.",
    icon: <Sparkles className="w-8 h-8 text-[var(--gold-bright)]" />,
    link: "/trade-ads",
  },
  {
    title: "Smart Calculator",
    desc: "Compare two trades & avoid losing value.",
    icon: <Calculator className="w-8 h-8 text-[var(--gold-bright)]" />,
    link: "/calculator",
  },
  {
    title: "Scam Logs",
    desc: "Stay safe by checking flagged users before you trade.",
    icon: <Shield className="w-8 h-8 text-[var(--gold-bright)]" />,
    link: "/scam-logs",
  },
];

const FeatureCard = ({ icon, title, desc, link }: any) => (
  <Link
    to={link}
    className="group block bg-[#111]/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-5 md:p-6 
      shadow-lg transition-transform duration-200 hover:border-[var(--gold-bright)] hover:bg-[#1a1a1a] hover:-translate-y-1"
  >
    <div className="flex items-center justify-between mb-3">
      {icon}
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold-soft)]">
        {title.includes("Value") ? "Values" : title.includes("Trade") ? "Trading" : "Tools"}
      </span>
    </div>
    <h3 className="text-xl font-semibold text-[var(--gold-bright)] mb-1">
      {title}
    </h3>
    <p className="text-gray-400 text-sm mb-3">{desc}</p>
    <span className="text-[var(--gold-soft)] text-sm group-hover:text-[var(--gold-bright)]">
      Open →
    </span>
  </Link>
);

