import React from "react";
import { Home, Grid, ShoppingBag, Calendar, User, Search } from "lucide-react";

interface BottomNavBarProps {
  activeView: string;
  onNavigate: (view: "home" | "catalog" | "cart" | "profile" | "book-appointment") => void;
  cartCount: number;
}

export default function BottomNavBar({
  activeView,
  onNavigate,
  cartCount,
}: BottomNavBarProps) {
  const items = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      action: () => onNavigate("home"),
    },
    {
      id: "catalog",
      label: "Catalog",
      icon: <Grid className="w-5 h-5" />,
      action: () => onNavigate("catalog"),
    },
    {
      id: "cart",
      label: "Bag",
      icon: <ShoppingBag className="w-5 h-5" />,
      action: () => onNavigate("cart"),
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: "book-appointment",
      label: "Book Slot",
      icon: <Calendar className="w-5 h-5" />,
      action: () => onNavigate("book-appointment"),
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[390px] h-16 z-40 bg-[#1A1A1A]/95 backdrop-blur-md rounded-2xl border border-[#D4AF37]/40 flex items-center justify-around shadow-2xl px-2 block lg:hidden">
      <div className="w-full flex justify-around items-center font-sans">
        {items.map((item) => {
          const isActive = activeView === item.id || (item.id === "catalog" && activeView === "details");
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center gap-1.5 py-1 px-3.5 rounded-xl transition-all relative ${
                isActive
                  ? "text-[#D4AF37] font-bold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-[#D4AF37]/10 rounded-xl blur-xs -z-10" />
              )}
              
              <div className="relative">
                {item.icon}
                
                {/* Cart or interactive numeric indicator count */}
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-stone-950 font-sans">
                    {item.badge}
                  </span>
                )}
              </div>
              
              <span className="text-[9px] tracking-wide uppercase font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
