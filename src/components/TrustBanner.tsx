import React from "react";
import { ShieldCheck, RotateCcw, Truck, Award } from "lucide-react";

export default function TrustBanner() {
  const items = [
    {
      id: "bis",
      icon: <ShieldCheck className="w-6 h-6 text-stone-950 group-hover:scale-110 transition-transform shrink-0" />,
      title: "100% BIS Hallmarked",
      desc: "Guaranteed gold purity with official stamps",
    },
    {
      id: "exchange",
      icon: <RotateCcw className="w-6 h-6 text-stone-950 group-hover:scale-110 transition-transform shrink-0" />,
      title: "Lifetime Exchange",
      desc: "Transparent buyback & upgrade policies",
    },
    {
      id: "delivery",
      icon: <Truck className="w-6 h-6 text-stone-950 group-hover:scale-110 transition-transform shrink-0" />,
      title: "Free Insured Shipping",
      desc: "Safe doorstep delivery with dynamic cover",
    },
    {
      id: "karigar",
      icon: <Award className="w-6 h-6 text-stone-950 group-hover:scale-110 transition-transform shrink-0" />,
      title: "Certified Diamonds",
      desc: "VVS-EF conflict-free certified quality",
    },
  ];

  return (
    <div className="w-full bg-[#D4AF37] text-black flex justify-around items-center py-4 px-4 md:px-8 shadow-xl">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-stone-950/15">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3.5 group ${
                idx > 1 ? "pt-4 md:pt-0" : ""
              } ${idx % 2 === 1 ? "pl-2 md:pl-6" : "md:pl-6"}`}
            >
              {item.icon}
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold leading-tight uppercase tracking-wider font-sans text-stone-950">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-[11.5px] text-stone-900/80 mt-0.5 leading-tight font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
