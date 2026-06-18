import React, { useState } from "react";
import { 
  Menu, Search, ShoppingBag, Heart, X, Sparkles, MapPin, Phone, 
  ChevronDown, ArrowRight, ShieldAlert, Award, Grid, Star, User, LogOut
} from "lucide-react";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { formatINR } from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  wishlist: Product[];
  cartCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (view: "home" | "catalog" | "cart" | "profile" | "book-appointment", category?: string) => void;
  activeView: string;
}

export default function Header({
  wishlist,
  cartCount,
  searchQuery,
  onSearchChange,
  onNavigate,
  activeView,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // Suggested keywords in search bar
  const quickSearches = ["Polki", "Choker", "Rings", "Laxmi Coin", "Earrings", "Bangles"];

  const categories = [
    { name: "Gold", key: "Gold", desc: "22kt Pure BIS Hallmarked Masterpieces" },
    { name: "Diamond", key: "Diamond", desc: "VVS-EF Certified Solitaires & Rings" },
    { name: "Bridal", key: "Bridal", desc: "Heavy Polki, Kundan & Temple Sets" },
    { name: "Gifts", key: "Gifts", desc: "Platinum Bands & Contemporary Jewelry" },
    { name: "Coins", key: "Coins", desc: "Investment Standard 24kt 999 Fine Gold" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-xl">
      
      {/* Tiny top informational strip */}
      <div className="w-full bg-[#050505] py-1.5 px-4 md:px-8 border-b border-[#D4AF37]/10 hidden sm:flex justify-between items-center text-[10px] sm:text-xs text-[#D4AF37] font-sans tracking-wide">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-gold-400" />
          <span>Gold Rate Today: 22K ₹7,240/g | 24K ₹7,900/g</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gold-400" /> Showroom Sikar Flagship
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-gold-400" /> Support: +91 1572 258800
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            id="btn-hamburger"
            className="p-2 -ml-2 rounded-lg text-gold-400 hover:text-gold-300 hover:bg-stone-900/50 transition-colors"
            title="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo Brand */}
          <div 
            onClick={() => onNavigate("home")} 
            className="cursor-pointer group flex flex-col pt-1"
          >
            <span className="font-display text-lg sm:text-2xl text-white font-normal tracking-[0.15em] select-none group-hover:text-gold-300 transition-colors uppercase">
              Narayani
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#D4AF37] font-bold select-none uppercase -mt-1 block">
              Jewellers
            </span>
          </div>
        </div>

        {/* Center: Search input bar inside header */}
        <div className="flex-grow max-w-md hidden md:block relative">
          <div className="relative">
            <Search className="w-4 h-4 text-gold-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for Gold Rings, Diamond Necklaces, Polki..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeView !== "catalog") {
                  onNavigate("catalog", "all");
                }
              }}
              className="w-full bg-stone-900/60 border border-gold-900/30 focus:border-gold-400 rounded-full py-2 pl-10 pr-4 text-xs font-sans text-stone-100 placeholder-stone-500 outline-none w-full transition-colors"
            />
          </div>
        </div>

        {/* Right Action Icons (Wishlist, Cart count, Call To Actions) */}
        <div className="flex items-center gap-1.5 sm:gap-3 font-sans">
          
          {/* Wishlist Link with dynamic pill badge */}
          <button
            type="button"
            onClick={() => setIsWishlistDrawerOpen(true)}
            className="p-2.5 rounded-full text-gold-400 hover:text-gold-300 hover:bg-stone-900/50 transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-stone-950">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag count trigger */}
          <button
            onClick={() => onNavigate("cart")}
            className="p-2.5 rounded-full text-gold-400 hover:text-gold-300 hover:bg-stone-900/50 transition-colors relative"
            title="Golden Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-stone-950">
                {cartCount}
              </span>
            )}
          </button>

          {/* VIP Booking CTA button */}
          <button
            onClick={() => onNavigate("book-appointment")}
            className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 hover:from-gold-500 hover:to-gold-300 font-bold text-xs uppercase tracking-wide px-4 py-2.5 rounded-full transition-all cursor-pointer shadow-md hover:shadow-gold-500/10 active:scale-95"
          >
            Book Sikar VIP Slot
          </button>
        </div>
      </div>

      {/* Embedded Mobile Search Strip to display directly below logo on small phones */}
      <div className="px-4 pb-3 pt-1 block md:hidden relative">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Rings, Coins, Necklaces..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (activeView !== "catalog") {
                onNavigate("catalog", "all");
              }
            }}
            className="w-full bg-stone-900/60 border border-gold-900/20 focus:border-gold-400 rounded-full py-1.5 pl-9 pr-4 text-xs font-sans text-stone-100 placeholder-stone-500 outline-none w-full transition-colors"
          />
        </div>
        {/* Rapid Suggestion chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-2 font-mono text-[9px]">
          {quickSearches.slice(0, 4).map((word) => (
            <button
              key={word}
              onClick={() => {
                onSearchChange(word);
                if (activeView !== "catalog") onNavigate("catalog", "all");
              }}
              className="px-2 py-0.5 rounded-full bg-stone-950 border border-gold-900/20 text-gold-300/80 active:bg-gold-500 active:text-stone-950 transition-all font-sans whitespace-nowrap"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Mega-Menu header navigation row - highly luxurious Kalyan gold look */}
      <nav className="w-full border-t border-gold-900/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-10 font-sans">
          
          <button
            onClick={() => onNavigate("home")}
            className={`py-3 text-xs tracking-wider uppercase font-semibold border-b-2 transition-all ${
              activeView === "home" ? "border-gold-400 text-gold-300" : "border-transparent text-stone-300 hover:text-white"
            }`}
          >
            Home
          </button>

          {/* Interactive dropdown trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              onClick={() => onNavigate("catalog", "all")}
              className={`py-3 text-xs tracking-wider uppercase font-semibold flex items-center gap-1 transition-all ${
                activeView === "catalog" ? "text-gold-300" : "text-stone-300 hover:text-white"
              }`}
            >
              Imperial Catalog <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Mega Menu container */}
            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 w-[550px] p-6 bg-stone-950 border border-gold-900/30 rounded-2xl shadow-2xl z-50 grid grid-cols-2 gap-4"
                >
                  <div className="space-y-3.5">
                    <p className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Heritage Categories</p>
                    <div className="space-y-2.5 text-xs text-stone-200">
                      {categories.map((cat) => (
                        <div
                          key={cat.key}
                          onClick={() => {
                            setIsMegaMenuOpen(false);
                            onNavigate("catalog", cat.key);
                          }}
                          className="group/item flex flex-col p-1.5 rounded hover:bg-gold-500/10 transition-colors cursor-pointer"
                        >
                          <span className="font-semibold text-white group-hover/item:text-gold-300 flex items-center gap-1.5">
                            {cat.name} <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </span>
                          <span className="text-[10px] text-stone-400 mt-0.5">{cat.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-gold-900/20 flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-0.5 text-[9px] font-bold text-stone-950 bg-gold-400 rounded">Exclusive</span>
                      <h4 className="font-serif text-white font-bold text-base mt-2">Bridal Polki Suite</h4>
                      <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">Book an exclusive consultation slot to explore custom jewelry fitments with Rajasthan's finest artisans.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onNavigate("book-appointment");
                      }}
                      className="w-full py-2 mt-4 text-center text-xs font-bold bg-gold-500 text-stone-950 rounded hover:bg-gold-400"
                    >
                      Book VIP Consultation Session
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onNavigate("catalog", cat.key)}
              className="py-3 text-xs tracking-wider uppercase font-semibold text-stone-300 hover:text-white transition-all hover:text-gold-300"
            >
              {cat.name}
            </button>
          ))}

          <button
            onClick={() => onNavigate("book-appointment")}
            className="py-3 text-xs tracking-wider uppercase font-semibold text-stone-300 hover:text-gold-300 transition-all text-amber-400 font-bold"
          >
            Book Sikar VIP Slot
          </button>
        </div>
      </nav>

      {/* Sliding LEFT Hamburger Menu with Framer Motion (As requested explicitly) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark background modal overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Main drawer body sliding from LEFT */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-[285px] sm:w-[320px] bg-[#0A0A0A] border-r border-[#D4AF37]/35 z-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Header context */}
              <div className="space-y-6 font-sans">
                <div className="flex justify-between items-center pb-4 border-b border-gold-900/20">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl text-white font-extrabold uppercase">Narayani</span>
                    <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase -mt-1 block">Luxury Showroom</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    id="btn-close-hamburger"
                    className="p-1.5 rounded-full border border-gold-900/20 text-gold-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main links */}
                <div className="space-y-1.5 text-sm font-semibold">
                  <p className="text-[10px] text-gold-400 uppercase font-bold tracking-widest mb-2.5">Showroom Map & Navigation</p>
                  
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate("home");
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-gold-500/10 hover:text-gold-300 text-stone-200 transition-colors flex items-center justify-between"
                  >
                    <span>Home Page</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 text-gold-400/40" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate("catalog", "all");
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-gold-500/10 hover:text-gold-300 text-stone-200 transition-colors flex items-center justify-between"
                  >
                    <span>All Heritage Jewelry</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 text-gold-400/40" />
                  </button>

                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate("catalog", c.key);
                      }}
                      className="w-full text-left py-1.5 px-6 rounded hover:text-gold-300 text-stone-400 text-xs hover:bg-stone-900/30 transition-colors flex items-center justify-between"
                    >
                      <span>{c.name} Collection</span>
                      <ArrowRight className="w-3 h-3 text-gold-500/30" />
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate("book-appointment");
                    }}
                    className="w-full text-left py-2.5 mt-2 px-3 rounded-lg bg-gold-500/15 text-amber-200 hover:bg-gold-500/20 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-gold-400" /> Book VIP Appointment
                    </span>
                    <ChevronDown className="w-4 h-4 -rotate-90 text-gold-400" />
                  </button>
                </div>

                {/* Brand Certify metrics */}
                <div className="pt-6 border-t border-gold-900/10 space-y-3 font-sans text-xs text-stone-400">
                  <p className="text-[10px] text-gold-400 uppercase font-bold tracking-widest">Guarantees</p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-400" />
                    <span>BIS Certified Hallmarked Gold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-400" />
                    <span className="line-clamp-1">Sikar Flagship Boutique - Rajasthan</span>
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Footer */}
              <div className="pt-6 border-t border-gold-900/20 text-center font-mono text-[10px] text-gold-500/60 font-medium">
                Royal Narayani Jewellers © 2026
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Wishlist Drawer - elegant slide-out drawer from the right */}
      <AnimatePresence>
        {isWishlistDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 bottom-0 right-0 w-[295px] sm:w-[360px] bg-[#0A0A0A] border-l border-[#D4AF37]/35 z-50 shadow-2xl p-6 flex flex-col justify-between font-sans"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gold-900/20">
                  <div className="flex items-center gap-1.5 text-gold-400">
                    <Heart className="w-5 h-5 fill-gold-400 text-gold-400" />
                    <h3 className="font-serif text-lg text-white font-bold uppercase">My Wishlist</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsWishlistDrawerOpen(false)}
                    className="p-1.5 rounded-full border border-gold-900/20 text-gold-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {wishlist.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <Heart className="w-10 h-10 text-gold-500/20 mx-auto" />
                    <p className="text-sm font-medium text-stone-400">Your wishlist is empty.</p>
                    <p className="text-xs text-stone-500 max-w-xs">Explore our catalog and click the core heart icons on jewelry products to save your favorites.</p>
                    <button
                      onClick={() => {
                        setIsWishlistDrawerOpen(false);
                        onNavigate("catalog", "all");
                      }}
                      className="px-4 py-2 mt-2 bg-gold-500 text-stone-950 font-bold rounded text-xs"
                    >
                      Browse Heritage Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setIsWishlistDrawerOpen(false);
                          onNavigate("catalog", "all");
                          // Route selection handles detail loading globally
                        }}
                        className="flex items-start gap-3.5 p-3 rounded-xl bg-stone-950 border border-gold-900/10 hover:border-gold-500/30 cursor-pointer transition-all"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          referrepolicy="no-referrer"
                          className="w-14 h-14 object-cover rounded-md border border-gold-900/20"
                        />
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-stone-400 font-medium font-sans">{item.purity} • {item.weight}</p>
                          <p className="text-xs font-bold text-gold-300 font-mono">{formatINR(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {wishlist.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-gold-900/20">
                  <button
                    onClick={() => {
                      setIsWishlistDrawerOpen(false);
                      onNavigate("catalog", "all");
                    }}
                    className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                  >
                    Compare All Selected
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
