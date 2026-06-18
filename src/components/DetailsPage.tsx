import React, { useState } from "react";
import { 
  ArrowLeft, Star, Heart, ShieldCheck, RefreshCw, Truck, 
  ChevronRight, Calendar, Sparkles, MessageCircle, Info, Grid, ShoppingBag
} from "lucide-react";
import { Product } from "../types";
import { formatINR } from "./ProductCard";
import { motion } from "motion/react";

interface DetailsPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (prod: Product, size?: string) => void;
  onAddToWishlist: (prod: Product) => void;
  isWishlisted: boolean;
  onNavigate: (view: "home" | "catalog" | "cart" | "profile" | "book-appointment") => void;
}

export default function DetailsPage({
  product,
  onBack,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  onNavigate
}: DetailsPageProps) {
  const [activeImage, setActiveImage] = useState(product.images[0] || product.image);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "exchange">("specs");
  const [ringSize, setRingSize] = useState("12 (Standard)");
  
  // Custom sizes depending on whether item is a ring, coin, earrings
  const isRing = product.name.toLowerCase().includes("ring");
  const isCoin = product.name.toLowerCase().includes("coin");
  const sizeOptions = isRing 
    ? ["10 - Daily", "12 (Standard)", "14 - Comfort", "16 - Grand"] 
    : isCoin ? ["10 Grams standard"] : ["One Size Standard"];

  return (
    <div className="w-full min-h-screen bg-[#050505] pb-24">
      {/* Back Button Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <button
          onClick={onBack}
          id="btn-back-catalog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 border border-gold-900/30 hover:border-gold-400 text-gold-300 font-medium text-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Imperial Catalog
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Interactive Image Stage */}
        <div className="col-span-1 md:col-span-6 space-y-4">
          <div className="relative aspect-square ring-1 ring-gold-500/20 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Absolute badge anchors */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1 text-[11px] font-bold bg-stone-900/90 border border-gold-400 text-gold-300 rounded-full font-sans shadow">
                {product.purityBadge}
              </span>
            </div>
            
            <button
              onClick={() => onAddToWishlist(product)}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-gold-300 hover:text-red-500 transition-colors border border-gold-900/30 shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>

          {/* Sub Gallery Row */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((imgUrl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                className={`aspect-square overflow-hidden rounded-xl border-2 transition-all bg-black ${
                  activeImage === imgUrl ? "border-gold-400 scale-95" : "border-gold-900/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={imgUrl} alt="Thumbnail view" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Info and Financial Breakdowns */}
        <div className="col-span-1 md:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">Premium {product.category} Series</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-xs font-mono text-gold-300 font-semibold">{product.weight} ({product.metal})</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif text-white tracking-wide font-bold">
              {product.name}
            </h1>

            {/* Ratings & Certifications */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-sm font-sans">
              <div className="flex items-center gap-1 text-gold-400">
                <Star className="w-4 h-4 fill-gold-400" />
                <span className="font-semibold text-white">{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-stone-700">|</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Insured Delivery
              </span>
            </div>
          </div>

          {/* Core Price Section */}
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/30 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-stone-400 text-xs font-sans uppercase tracking-wider block">Estimated Retail Price</span>
                <span className="text-2xl md:text-3xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-400">
                  {formatINR(product.totalPrice)}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">(Tax Inclusive of 3% GST & Insured Care-Pack)</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                Transparent Pricing
              </div>
            </div>

            {/* Detailed price breakdown list */}
            <div className="border-t border-gold-900/10 pt-4 mt-2 space-y-2 text-xs md:text-sm font-sans">
              <h3 className="font-serif text-gold-300 font-semibold mb-2 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-gold-400" /> Complete Billing Breakdown
              </h3>
              
              <div className="flex justify-between items-center text-stone-300">
                <span>Gold/Material Value ({product.weight})</span>
                <span className="font-mono text-stone-100">{formatINR(product.basePrice)}</span>
              </div>
              
              <div className="flex justify-between items-center text-stone-300">
                <span>Royal Karigar Making Charges</span>
                <span className="font-mono text-stone-100">{formatINR(product.makingCharges)}</span>
              </div>

              <div className="flex justify-between items-center text-stone-300">
                <span>Central + State GST (3%)</span>
                <span className="font-mono text-stone-100">
                  {formatINR(Math.round((product.basePrice + product.makingCharges) * 0.03))}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-gold-900/10 font-bold text-white text-sm">
                <span>Total Invoice Value</span>
                <span className="font-mono text-gold-300">{formatINR(product.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Size or Weight selection settings */}
          <div className="space-y-3 font-sans">
            <label className="text-xs font-bold text-gold-400 uppercase tracking-widest block">
              Configure Metal Size / Specifications:
            </label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRingSize(opt)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                    ringSize === opt
                      ? "bg-gold-500 text-stone-950 border-gold-400 font-bold shadow-lg"
                      : "bg-stone-900/60 border-gold-900/30 text-stone-300 hover:border-gold-500/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Tabs - Product Details, Shipping Info, Return Policy */}
          <div className="border border-gold-900/20 rounded-xl overflow-hidden font-sans">
            <div className="flex border-b border-[#D4AF37]/20 bg-[#0A0A0A]/40">
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "specs"
                    ? "text-[#D4AF37] border-b-2 border-[#D4AF37] bg-[#1A1A1A]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Specification Log
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "shipping"
                    ? "text-[#D4AF37] border-b-2 border-[#D4AF37] bg-[#1A1A1A]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Shipping Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("exchange")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "exchange"
                    ? "text-[#D4AF37] border-b-2 border-[#D4AF37] bg-[#1A1A1A]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Lifetime Upgrade
              </button>
            </div>

            <div className="p-4 bg-[#0A0A0A]/40 min-h-[140px] text-xs sm:text-sm leading-relaxed text-stone-300">
              {activeTab === "specs" && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <table className="w-full text-[11px] text-stone-400 divide-y divide-gold-900/10">
                    <tbody>
                      <tr className="py-2 flex justify-between">
                        <td className="font-semibold text-stone-300">Metal Purity</td>
                        <td>{product.purity}</td>
                      </tr>
                      <tr className="py-2 flex justify-between">
                        <td className="font-semibold text-stone-300">Metal Color</td>
                        <td>{product.metal}</td>
                      </tr>
                      <tr className="py-2 flex justify-between">
                        <td className="font-semibold text-stone-300">Net Weight</td>
                        <td>{product.weight}</td>
                      </tr>
                      <tr className="py-2 flex justify-between">
                        <td className="font-semibold text-stone-300">Purity Hallmark Stamp</td>
                        <td>BIS Govt Certified 916 Stamped</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-2">
                  <p className="font-semibold text-gold-300">100% Insured Priority Shipping</p>
                  <p>All Narayani shipments are dispatched via secured luxury transit courier vans with dedicated guards. Transit takes 2 to 5 working days across major Indian metros.</p>
                  <p>In-transit theft or damage is thoroughly covered and insured directly by our corporate policies.</p>
                </div>
              )}

              {activeTab === "exchange" && (
                <div className="space-y-2">
                  <p className="font-semibold text-gold-300">Lifetime Upgrade Guarantee</p>
                  <p>Exchange or buyback your jewelry at any time at Sikar flagship store. Get 100% value of the original metal content based on live market pricing on the day of exchange.</p>
                  <p>Deductions are only applied on making charges and gemstone weights to guarantee true transparency.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sikar Showroom Promo Info */}
          <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
            <div>
              <p className="font-bold text-white flex items-center gap-1.5 font-serif text-sm">
                <Sparkles className="w-4 h-4 text-gold-400" />
                Want to view this masterpiece in Sikar?
              </p>
              <p className="text-stone-400 mt-0.5">Book a custom VIP suite consult, select this item, and speak with a heritage adviser.</p>
            </div>
            <button
              onClick={() => onNavigate("book-appointment")}
              className="px-4 py-2 rounded bg-gold-500 text-stone-950 font-semibold cursor-pointer align-middle transition-colors hover:bg-gold-400 whitespace-nowrap"
            >
              Book Sikar Showroom Tour
            </button>
          </div>
        </div>
      </div>

      {/* Sticky bottom buy row on mobile/desktop - highly luxurious */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t border-[#D4AF37]/20 px-4 py-3 md:py-4 flex items-center justify-between gap-4 max-w-7xl mx-auto shadow-2xl">
        <div className="hidden sm:flex flex-col">
          <span className="text-[10px] uppercase text-stone-400 tracking-widest font-mono">Total Price</span>
          <span className="text-xl font-bold text-gold-400 font-sans tracking-wide">
            {formatINR(product.totalPrice)}
          </span>
        </div>
        
        <div className="flex-1 sm:flex-initial flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              onAddToCart(product, ringSize);
            }}
            id="btn-sticky-add-cart"
            className="flex-1 sm:px-8 py-3.5 rounded-xl bg-stone-900 border border-gold-500 text-gold-300 text-sm font-bold tracking-wide hover:bg-stone-850 active:scale-95 transition-all text-center cursor-pointer font-sans"
          >
            Add to Bridal Cart
          </button>
          <button
            onClick={() => {
              onAddToCart(product, ringSize);
              onNavigate("cart");
            }}
            id="btn-sticky-buy-now"
            className="flex-1 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-stone-950 text-sm font-bold tracking-wide active:scale-95 transition-all text-center cursor-pointer font-sans"
          >
            Buy Heritage Now
          </button>
        </div>
      </div>
    </div>
  );
}
