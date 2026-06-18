import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Compass, Shield, Award } from "lucide-react";

interface ShowcaseItem {
  title: string;
  subTitle: string;
  description: string;
  image: string;
  highlights: string[];
}

const ITEMS: ShowcaseItem[] = [
  {
    title: "The Royal Jadau Legacy",
    subTitle: "BRIDAL POLKI COLLECTION",
    description: "Crafted deep within the royal workshops of Jaipur. Features precious raw, uncut diamonds safely seated inside gold foil cavities, supported by intricate multi-hued meenakari hand-enameling on the reverse facade.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
    highlights: ["22kt Antique Finish", "Natural Uncut Diamonds", "Heritage Jadau Style"]
  },
  {
    title: "Sovereign Basra Chokers",
    subTitle: "SOUTH SEA PEARL EMBELLISHMENT",
    description: "Delicate rows of hand-selected Basra micro-pearl strings paired with a central meenakari medallion. Each certified pearl evokes the tranquil depth of warm Persian Gulf waters, glistening dynamically in high light.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
    highlights: ["Natural Basra Pearls", "Burmese Rubies Accents", "18kt Royal Foundation"]
  },
  {
    title: "Solitaire Constellations",
    subTitle: "VVS-EF HIGH DIAMOND PARALLELS",
    description: "An astronomical matrix of custom marquise and baguette-cut diamonds calibrated dynamically to trap and disperse light. Secured in scratch-resistant pure 950 platinum crowns with lifetime guarantee seals.",
    image: "https://images.unsplash.com/photo-1596568307830-a5ea06c3ac9c?auto=format&fit=crop&w=1000&q=85",
    highlights: ["Ultra Rare VVS-EF Grade", "Solid PT950 Hallmark", "Dual-lock Safety Clasp"]
  }
];

export default function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate relative scroll position of the section inside viewport
      const start = rect.top;
      const range = elementHeight - viewportHeight;
      if (range <= 0) return;

      const progress = Math.max(0, Math.min(1, -start / range));
      setScrollProgress(progress);

      // Determine active index based on thresholds
      if (progress < 0.35) {
        setActiveIndex(0);
      } else if (progress < 0.70) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[140vh] sm:min-h-[180vh] py-16 px-4 md:px-8 bg-gradient-to-b from-[#050505] via-[#120D0A] to-[#050505] overflow-hidden"
    >
      {/* Dynamic ambient golden glow orbiting background */}
      <div 
        className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[#D4AF37]/5 blur-[120px] transition-all duration-700 pointer-events-none"
        style={{
          top: `${30 + scrollProgress * 40}%`,
          left: `${20 + (activeIndex % 2 === 0 ? 10 : 30)}%`
        }}
      />

      <div className="max-w-7xl mx-auto h-full flex flex-col justify-between relative z-10">
        
        {/* Luxury Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> The Royal Heritage Showcase
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif text-white tracking-wide font-normal max-w-3xl mx-auto leading-normal">
            Precious Crafts <span className="italic text-[#D4AF37]">Unveiled on Scroll</span>
          </h2>
          <p className="text-stone-400 font-sans text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            As you journey through our heritage archives, watch how our signature pieces transform, illustrating different eras of grand Indian dynasties.
          </p>
        </div>

        {/* Dynamic Interactive Splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Narrative Details */}
          <div className="col-span-1 lg:col-span-5 h-full flex flex-col justify-center space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              
              {/* Dynamic Step indicator */}
              <div className="flex items-center gap-3">
                {ITEMS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      // Allow clicking as an alternative interaction fallback
                      const element = containerRef.current;
                      if (element) {
                        const targetScroll = element.offsetTop + (idx * (element.offsetHeight * 0.45));
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }
                    }}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      idx === activeIndex 
                        ? "w-10 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]" 
                        : "w-2.5 bg-stone-800"
                    }`}
                    title={`Step ${idx + 1}`}
                  />
                ))}
                <span className="text-xs uppercase font-mono text-stone-500 tracking-wider ml-2">
                  Chapter {activeIndex + 1} of 3
                </span>
              </div>

              {/* Animating the Content Card carefully */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <span className="text-[10px] uppercase font-mono font-bold tracking-[0.25em] text-[#D4AF37] block">
                    {ITEMS[activeIndex].subTitle}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-serif text-white font-normal leading-tight">
                    {ITEMS[activeIndex].title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans font-light">
                    {ITEMS[activeIndex].description}
                  </p>

                  {/* Highlights section with custom vector icons inside pills */}
                  <div className="flex flex-wrap gap-2.5 pt-4">
                    {ITEMS[activeIndex].highlights.map((highlight, hIdx) => (
                      <span 
                        key={hIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] border border-white/5 rounded-full text-xs font-sans text-stone-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Micro Scroll progress details widget - looks exceptionally high end */}
            <div className="pt-8 border-t border-white/5 flex items-center justify-between text-stone-500 font-mono text-[10px]">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} /> 
                SCROLL PROGRESSION: {Math.round(scrollProgress * 100)}%
              </span>
              <span className="text-[#D4AF37]">
                NARAYANI JEWEL CABINET
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: The Luxury Rotating Lens & Image Spotlight */}
          <div className="col-span-1 lg:col-span-7 flex justify-center items-center order-1 lg:order-2 relative py-8">
            
            {/* The Majestic Luxury Rotating Outer Dial */}
            <div 
              className="absolute w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-[#D4AF37]/30 flex items-center justify-center pointer-events-none"
              style={{
                transform: `rotate(${scrollProgress * 230}deg)`,
                transition: "transform 0.15s cubic-bezier(0.1, 0.8, 0.3, 1)"
              }}
            >
              {/* Outer decorative golden compass nodes */}
              <div className="absolute top-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
              <div className="absolute right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
              <div className="absolute bottom-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
              <div className="absolute left-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="absolute text-[8px] font-mono uppercase tracking-[0.3em] text-[#D4AF37]/60 -top-6 transform -rotate-90">
                Heritage Masterworks
              </span>
            </div>

            {/* Inner elegant gold octagon framing container */}
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full p-4 bg-black/40 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden shadow-[#D4AF37]/5 flex items-center justify-center">
              
              {/* Back subtle radial gradient */}
              <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/10 to-transparent pointer-events-none" />

              {/* Shifting Display Ornaments with framer-motion */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1.02, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={ITEMS[activeIndex].image}
                    alt={ITEMS[activeIndex].title}
                    className="w-full h-full object-cover rounded-full filter brightness-95 hover:brightness-105 transition-all duration-700 hover:scale-110"
                  />
                  
                  {/* Subtle luxury glass sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none rounded-full" />
                </motion.div>
              </AnimatePresence>

              {/* Tiny absolute label floating at the bottom */}
              <div className="absolute bottom-4 bg-[#0A0A0A]/90 px-3.5 py-1 rounded-full border border-[#D4AF37]/35 shadow-lg text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">
                Cabinet Room {activeIndex + 1}
              </div>
            </div>

            {/* Absolute tiny decorative elements framing the image lens */}
            <div className="absolute bottom-12 right-12 bg-[#D4AF37]/10 backdrop-blur-md rounded-xl p-3 border border-[#D4AF37]/25 font-sans hidden sm:block">
              <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-white tracking-widest">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Lifetime Exchange Guarantee Included
              </div>
            </div>
            
          </div>

        </div>

      </div>
    </div>
  );
}
