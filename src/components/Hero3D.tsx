import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Award } from "lucide-react";

interface Hero3DProps {
  onNavigate: (view: "home" | "catalog" | "cart" | "profile" | "book-appointment", category?: string) => void;
}

export default function Hero3D({ onNavigate }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom interactive motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth return transitions
  const physicsOptions = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), physicsOptions);
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), physicsOptions);
  
  // Parallax offsets for nested gold jewels
  const jewelX = useSpring(useTransform(x, [-300, 300], [-30, 30]), physicsOptions);
  const jewelY = useSpring(useTransform(y, [-300, 300], [-30, 30]), physicsOptions);
  const shimmerX = useSpring(useTransform(x, [-300, 300], [-100, 100]), physicsOptions);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A1305] to-[#050505] py-10 md:py-20 px-4 md:px-8 border-b border-[#D4AF37]/20">
      {/* Background ambient gold lights */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Brand Lore Column */}
        <div className="col-span-1 md:col-span-6 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-900/40 border border-gold-500/30 text-xs text-gold-300 font-medium tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Imperial Heritage Collection
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.1] tracking-tight">
            Narayani <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 gold-glow">
              Jewellers
            </span>
          </h1>
          
          <p className="text-gold-100/70 text-sm sm:text-base max-w-lg mx-auto md:mx-0 leading-relaxed font-sans">
            Crafting eternal royalty since 1988. Discover our highly coveted 22-karat bridal Polki masterpieces, certified solitaire diamonds, and traditional temple gold crafted to captivate generations.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <button
              onClick={() => onNavigate("catalog", "all")}
              id="btn-hero-explore"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-semibold text-sm hover:from-gold-500 hover:to-gold-300 transition-all shadow-lg hover:shadow-gold-500/20 flex items-center gap-2 active:scale-95 group font-sans cursor-pointer"
            >
              Explore Imperial Catalog
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate("book-appointment")}
              id="btn-hero-consult"
              className="px-6 py-3 rounded-full bg-stone-900 text-gold-300 border border-gold-500/40 font-medium text-sm hover:bg-stone-850 hover:border-gold-300 transition-all cursor-pointer font-sans"
            >
              Book Sikar Showroom VIP Visit
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-6 pt-4 text-xs text-gold-300/60 font-sans">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              BIS Govt Certified 22K/916 Pure
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold-400" />
              Lifetime Assured Exchange Value
            </div>
          </div>
        </div>

        {/* 3D Parallax floating jewelry card column */}
        <div className="col-span-1 md:col-span-6 flex justify-center items-center">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[380px] sm:max-w-[420px] h-[360px] sm:h-[400px] rounded-3xl p-6 flex flex-col justify-between overflow-hidden border border-[#D4AF37]/35 bg-[#0A0A0A]/95 backdrop-blur-md cursor-grab active:cursor-grabbing select-none hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-shadow duration-300"
            style={{ perspective: 1000 }}
          >
            {/* Glossy overlay mimicking a glass reflection */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-300/5 to-transparent pointer-events-none" 
              style={{ x: shimmerX }}
            />
            
            {/* Animated tilt card context */}
            <motion.div
              style={{ rotateX, rotateY }}
              className="w-full h-full flex flex-col justify-between"
            >
              {/* Card Header tag */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono">Bestseller Series</span>
                  <h3 className="text-xl font-serif text-white leading-tight mt-1">Sabyasachi Heritage Collar</h3>
                </div>
                <div className="px-2 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-[11px] text-gold-300 font-medium font-sans">
                  22kt | Polki
                </div>
              </div>

              {/* Floating Center Jewell Object with detailed glowing shadow */}
              <div className="relative flex justify-center items-center my-4 h-[180px]">
                {/* Golden backdrop circular dust effect */}
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-gold-600/10 to-transparent blur-xl animate-pulse" />
                
                {/* The core high-res jewelry floating piece */}
                <motion.div
                  style={{ x: jewelX, y: jewelY }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="relative z-10 w-44 h-44 drop-shadow-[0_20px_40px_rgba(212,175,55,0.35)] cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
                    alt="Polki Heritage Choker"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full border-2 border-gold-500/40 shadow-inner"
                  />
                  
                  {/* Absolute visual marker badges */}
                  <div className="absolute -bottom-1 -right-1 bg-black/80 border border-gold-500 px-2 py-0.5 rounded text-[10px] text-gold-300 font-mono">
                    ₹4,95,000*
                  </div>
                </motion.div>
              </div>

              {/* Card Footer branding notes */}
              <div className="flex justify-between items-center text-xs text-gold-100/60 font-sans">
                <span>Handmade by Royal Karigars</span>
                <span className="text-gold-400 font-mono text-[11px] font-semibold">100% Insured</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
