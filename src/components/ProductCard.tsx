import React from "react";
import { Star, Heart } from "lucide-react";
import { Product } from "../types";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onClick: (prod: Product) => void;
  onAddToWishlist?: (prod: Product) => void;
  isWishlisted?: boolean;
  key?: any;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductCard({
  product,
  onClick,
  onAddToWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0A0A0A] border border-white/5 overflow-hidden cursor-pointer hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300"
    >
      {/* Absolute Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="px-2 py-0.5 rounded bg-amber-600 text-stone-950 text-[10px] font-bold tracking-wider uppercase font-sans">
            Bestseller
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2 py-0.5 rounded bg-gold-500 text-stone-950 text-[10px] font-bold tracking-wider uppercase font-sans">
            New
          </span>
        )}
      </div>

      {/* Wishlist Top-Right Heart */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAddToWishlist?.(product);
        }}
        className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-gold-900/30 text-gold-300 hover:text-red-500 transition-colors"
      >
        <Heart
          className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
        />
      </button>

      {/* Product Image Stage */}
      <div
        onClick={() => onClick(product)}
        className="relative w-full aspect-square bg-[#100b0f] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
      </div>

      {/* Product Details Section */}
      <div onClick={() => onClick(product)} className="p-4 space-y-2 flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gold-400 font-medium font-sans">
            <span>{product.purity}</span>
            <span>•</span>
            <span>{product.weight}</span>
          </div>

          <h3 className="font-serif text-sm sm:text-base text-white font-medium tracking-wide group-hover:text-gold-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        <div className="pt-2 border-t border-gold-900/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-stone-400 text-[10px] font-sans uppercase tracking-wider block">Price</span>
            <span className="text-sm sm:text-base font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">
              {formatINR(product.totalPrice)}
            </span>
          </div>
          
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-gold-400/10 text-gold-300 text-[11px] font-sans">
            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
