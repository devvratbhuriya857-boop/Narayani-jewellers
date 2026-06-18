import React from "react";
import { FilterState } from "../types";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FiltersSidebarProps {
  onClose: () => void;
  isOpen: boolean;
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

export default function FiltersSidebar({
  onClose,
  isOpen,
  filters,
  onChange,
}: FiltersSidebarProps) {
  
  const metals = [
    { value: "all", label: "All Precious Metals" },
    { value: "Gold", label: "22K/24K Yellow Gold" },
    { value: "Rose Gold", label: "18K Luxury Rose Gold" },
    { value: "White Gold", label: "18K Plated White Gold" },
    { value: "Platinum", label: "Elite 950 Platinum" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "under-25k", label: "Under ₹25,000" },
    { value: "25k-50k", label: "₹25,000 - ₹50,000" },
    { value: "50k-1l", label: "₹50,000 - ₹1,000,000" },
    { value: "above-1l", label: "Premium Heirloom (₹1,00,000+)" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Collections" },
    { value: "Gold", label: "Daily/Heavy Gold" },
    { value: "Diamond", label: "Diamonds & Solitaires" },
    { value: "Bridal", label: "Wedding Polki & Bridal Sets" },
    { value: "Gifts", label: "Gifts & Platinum Bands" },
    { value: "Coins", label: "24kt Sovereign Gold Coins" },
  ];

  function resetFilters() {
    onChange({
      priceRange: "all",
      metal: "all",
      category: "all",
      subCategory: "all",
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Modal filter slide outline */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 bottom-0 right-0 w-[295px] sm:w-[350px] bg-[#0A0A0A] border-l border-[#D4AF37]/35 z-50 flex flex-col h-screen max-h-screen font-sans"
          >
            {/* Drawer Header */}
            <div className="p-6 pb-4 border-b border-gold-900/20 shrink-0">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-lg text-white font-bold uppercase tracking-wide">Refine Collections</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full border border-gold-900/20 text-gold-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable filters list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {/* Price filter list */}
              <div className="space-y-2.5">
                <span className="text-[10px] text-gold-400 uppercase font-bold tracking-widest block">Price Range</span>
                <div className="space-y-1.5">
                  {priceRanges.map((pr) => (
                    <button
                      key={pr.value}
                      onClick={() => onChange({ ...filters, priceRange: pr.value as any })}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                        filters.priceRange === pr.value
                          ? "bg-gold-500/15 border border-gold-500/40 text-gold-300"
                          : "bg-stone-900/50 text-stone-300 border border-transparent hover:bg-stone-900"
                      }`}
                    >
                      <span>{pr.label}</span>
                      {filters.priceRange === pr.value && <Check className="w-3.5 h-3.5 text-gold-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal categories filter */}
              <div className="space-y-2.5">
                <span className="text-[10px] text-gold-400 uppercase font-bold tracking-widest block">Precious Metal</span>
                <div className="space-y-1.5">
                  {metals.map((mt) => (
                    <button
                      key={mt.value}
                      onClick={() => onChange({ ...filters, metal: mt.value as any })}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                        filters.metal === mt.value
                          ? "bg-gold-500/15 border border-gold-500/40 text-gold-300"
                          : "bg-stone-900/50 text-stone-300 border border-transparent hover:bg-stone-900"
                      }`}
                    >
                      <span>{mt.label}</span>
                      {filters.metal === mt.value && <Check className="w-3.5 h-3.5 text-gold-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Major categories select */}
              <div className="space-y-2.5">
                <span className="text-[10px] text-gold-400 uppercase font-bold tracking-widest block">Heritage Classification</span>
                <div className="space-y-1.5">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => onChange({ ...filters, category: cat.value as any })}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                        filters.category === cat.value
                          ? "bg-gold-500/15 border border-gold-500/40 text-gold-300"
                          : "bg-stone-900/50 text-stone-300 border border-transparent hover:bg-stone-900"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {filters.category === cat.value && <Check className="w-3.5 h-3.5 text-gold-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Reset Filters */}
            <div className="p-6 pt-4 border-t border-gold-900/20 flex gap-3 text-center shrink-0 bg-[#070707]">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-stone-800 hover:border-gold-900 text-stone-400 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
