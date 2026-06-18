import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";
import Hero3D from "./components/Hero3D";
import TrustBanner from "./components/TrustBanner";
import ScrollShowcase from "./components/ScrollShowcase";
import ProductCard, { formatINR } from "./components/ProductCard";
import DetailsPage from "./components/DetailsPage";
import AppointmentForm from "./components/AppointmentForm";
import FiltersSidebar from "./components/FiltersSidebar";
import { PRODUCTS, SHOWROOMS } from "./data";
import { Product, CartItem, BookingDetails, FilterState } from "./types";
import { 
  Sparkles, Filter, SlidersHorizontal, Check, RefreshCw, ShoppingCart, 
  Trash2, Mail, Phone, MapPin, Award, CreditCard, ChevronRight, CornerDownRight, HandPlatter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Navigation states
  const [activeView, setActiveView] = useState<"home" | "catalog" | "cart" | "book-appointment" | "details">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // E-commerce items states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Category chip filters (horizontal scroll list)
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Advanced Filters
  const [filters, setFilters] = useState<FilterState>({
    priceRange: "all",
    metal: "all",
    category: "all",
    subCategory: "all"
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Appointments log (local state persistence)
  const [appointments, setAppointments] = useState<BookingDetails[]>([]);

  // Checkout states for RBI simulation gateway
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "billing" | "processing" | "success">("idle");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");

  // Load cart & wishlist from localStorage if available
  useEffect(() => {
    const savedCart = localStorage.getItem("narayani_cart");
    const savedWish = localStorage.getItem("narayani_wishlist");
    const savedBookings = localStorage.getItem("narayani_bookings");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWish) setWishlist(JSON.parse(savedWish));
    if (savedBookings) setAppointments(JSON.parse(savedBookings));
  }, []);

  function saveCartToStorage(updatedCart: CartItem[]) {
    setCart(updatedCart);
    localStorage.setItem("narayani_cart", JSON.stringify(updatedCart));
  }

  function saveWishToStorage(updatedWish: Product[]) {
    setWishlist(updatedWish);
    localStorage.setItem("narayani_wishlist", JSON.stringify(updatedWish));
  }

  // Cart operations
  function handleAddToCart(product: Product, size?: string) {
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCartToStorage(updated);
    } else {
      const updated = [...cart, { product, quantity: 1, size }];
      saveCartToStorage(updated);
    }
  }

  function handleDecrementCart(item: CartItem) {
    const idx = cart.findIndex(c => c.product.id === item.product.id && c.size === item.size);
    if (idx > -1) {
      const updated = [...cart];
      if (updated[idx].quantity > 1) {
        updated[idx].quantity -= 1;
      } else {
        updated.splice(idx, 1);
      }
      saveCartToStorage(updated);
    }
  }

  function handleRemoveCart(item: CartItem) {
    const updated = cart.filter(c => !(c.product.id === item.product.id && c.size === item.size));
    saveCartToStorage(updated);
  }

  // Wishlist toggle
  function handleToggleWishlist(product: Product) {
    const existingIndex = wishlist.findIndex(w => w.id === product.id);
    if (existingIndex > -1) {
      const updated = wishlist.filter(w => w.id !== product.id);
      saveWishToStorage(updated);
    } else {
      const updated = [...wishlist, product];
      saveWishToStorage(updated);
    }
  }

  // Navigation hub
  function handleNavigate(view: "home" | "catalog" | "cart" | "profile" | "book-appointment", category?: string) {
    if (view === "catalog" && category) {
      // If navigating directly to a metadata category
      setFilters(prev => ({ ...prev, category: category as any }));
    }
    
    // For general compatibility
    if (view === "profile") {
      setActiveView("book-appointment"); // profile acts as VIP bookings center for ease
    } else {
      setActiveView(view as any);
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Detailed PDP navigation
  function handleProductView(product: Product) {
    setSelectedProduct(product);
    setActiveView("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Filters mapping
  const categoryChips = [
    { value: "All", label: "All Precious Collection" },
    { value: "Bridal Polki", label: "Bridal Polki Sets" },
    { value: "Daily Wear Gold", label: "Daily Wear Gold" },
    { value: "Diamond Rings", label: "Diamond Solitaires" },
    { value: "Antique Bangles", label: "Antique Karigari Bangles" }
  ];

  // Dynamic filtration
  const filteredProducts = PRODUCTS.filter((p) => {
    // Search matching
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Horizontal category chips filter
    const matchesChip = selectedCategoryFilter === "All" || p.subCategory === selectedCategoryFilter;

    // Advanced Sidebar checks
    const matchesCategoryFilter = filters.category === "all" || p.category === filters.category;
    const matchesMetalFilter = filters.metal === "all" || p.metal === filters.metal;

    let matchesPrice = true;
    if (filters.priceRange === "under-25k") {
      matchesPrice = p.totalPrice < 25000;
    } else if (filters.priceRange === "25k-50k") {
      matchesPrice = p.totalPrice >= 25000 && p.totalPrice <= 50000;
    } else if (filters.priceRange === "50k-1l") {
      matchesPrice = p.totalPrice > 50000 && p.totalPrice <= 100000;
    } else if (filters.priceRange === "above-1l") {
      matchesPrice = p.totalPrice > 100000;
    }

    return matchesSearch && matchesChip && matchesCategoryFilter && matchesMetalFilter && matchesPrice;
  });

  // Calculate cart sum values
  const cartSubtotal = cart.reduce((accum, item) => accum + (item.product.totalPrice * item.quantity), 0);
  const totalGstIncluded = Math.round(cartSubtotal * 0.03); // For display breakdown

  // Booking storage callback
  function handleBookingSuccess(booking: BookingDetails) {
    const updated = [...appointments, booking];
    setAppointments(updated);
    localStorage.setItem("narayani_bookings", JSON.stringify(updated));
  }

  // SIMULATE SECURE INVOICE TRANSACTION DEPOSIT
  function handlePayCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!billingPhone || !billingAddress || !billingCity) {
      alert("Provide genuine shipping metrics for fully insured dispatch.");
      return;
    }

    setCheckoutStep("processing");
    setTimeout(() => {
      setCheckoutStep("success");
      saveCartToStorage([]); // clear cart
    }, 2200);
  }

  return (
    <div className="min-h-screen text-[#f7e9c1] flex flex-col justify-between selection:bg-gold-500 selection:text-stone-950 pb-16 lg:pb-0">
      
      {/* Upper header */}
      <Header
        wishlist={wishlist}
        cartCount={cart.reduce((cnt, item) => cnt + item.quantity, 0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigate}
        activeView={activeView}
      />

      {/* Main Container Views Switch */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW CONTAINER */}
          {activeView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Floating interactive 3D Hero */}
              <Hero3D onNavigate={handleNavigate} />
              
              {/* Trust facts */}
              <TrustBanner />

              {/* Scroll driven animated showcase */}
              <ScrollShowcase />

              {/* Horizontally scrollable category chips below hero section */}
              <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 font-mono">Curated Selection</span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">Catalog Showcases</h2>
                  </div>
                  <button
                    onClick={() => {
                      setIsFilterOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 border border-gold-900/40 hover:border-gold-400 text-gold-300 text-xs font-semibold cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Special Filters
                  </button>
                </div>

                {/* Horizontal scroll chips */}
                <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar scroll-smooth">
                  {categoryChips.map((chip) => (
                    <button
                      key={chip.value}
                      onClick={() => {
                        setSelectedCategoryFilter(chip.value);
                        // Make sure search or other filters are kept clean
                      }}
                      className={`px-4.5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer hover:border-gold-400 ${
                        selectedCategoryFilter === chip.value
                          ? "bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold border-transparent shadow shadow-gold-500/20"
                          : "bg-stone-900/60 text-[#f7e9c1]/80 border border-gold-900/10"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Showcase Product Catalog Grid (Interactive, 2-col mobile & 4-col desktop) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-4">
                  {filteredProducts.length === 0 ? (
                    <div className="col-span-full py-16 text-center space-y-3 font-sans">
                      <p className="text-stone-400 font-medium">No precious ornaments found matching your parameters.</p>
                      <button
                        onClick={() => {
                          setSelectedCategoryFilter("All");
                          setFilters({ priceRange: "all", metal: "all", category: "all", subCategory: "all" });
                          setSearchQuery("");
                        }}
                        className="px-5 py-2 rounded-full bg-gold-500 text-stone-950 text-xs font-semibold"
                      >
                        Reset Showcase Search
                      </button>
                    </div>
                  ) : (
                    filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onClick={handleProductView}
                        onAddToWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.some(w => w.id === prod.id)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Showroom Spotlights and Sikar VIP scheduling */}
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="rounded-3xl bg-gradient-to-r from-[#1A1305]/95 via-[#050505]/98 to-[#1A1305]/95 border border-[#D4AF37]/30 p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold-400/[0.01] pointer-events-none" />
                  <div className="col-span-1 md:col-span-7 space-y-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] font-mono">Boutique Showroom Presence</p>
                    <h3 className="text-3xl font-serif text-white font-bold leading-tight">Sikar Showroom Flagship Salón</h3>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
                      Visit us at Narayani Tower, Court Road. Experience highly customized client consultation suites loaded with heritage temple jewelry, royal diamond katanas, and dedicated gemologists who can customize raw gems according to your exact structural specifications.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-stone-300 pt-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold-400" /> Kalyan Circle, Court Road, Sikar
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold-400" /> BIS Government Certified
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-5 flex flex-col gap-3 justify-center items-center md:items-end font-sans">
                    <div className="w-full text-center md:text-right">
                      <span className="text-[11px] font-mono text-stone-400 block pb-1">Reservations Online</span>
                      <button
                        onClick={() => handleNavigate("book-appointment")}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gold-500 text-stone-950 font-bold uppercase tracking-wider text-xs hover:bg-gold-400 transition-colors shadow-lg hover:shadow-gold-500/20 active:scale-95 cursor-pointer"
                      >
                        Book VIP Consultation Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* CATALOG VIEW CONTAINER */}
          {activeView === "catalog" && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 py-6 space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-gold-900/15 pb-4">
                <div>
                  <span className="text-xs uppercase text-gold-400 tracking-widest font-mono">Exploring Heritage Catalog</span>
                  <p className="text-stone-400 text-xs sm:text-sm mt-1">{filteredProducts.length} certified masterpieces available online.</p>
                </div>
                
                <div className="flex items-center gap-2 font-sans">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex-grow sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-gold-900/40 hover:border-gold-400 text-gold-300 text-xs font-bold cursor-pointer transition-colors"
                  >
                    <Filter className="w-4 h-4" /> Refine & Sort Ornaments
                  </button>
                </div>
              </div>

              {/* Scrollable category chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {categoryChips.map((chip) => (
                  <button
                    key={chip.value}
                    onClick={() => setSelectedCategoryFilter(chip.value)}
                    className={`px-4.5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                      selectedCategoryFilter === chip.value
                        ? "bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold"
                        : "bg-stone-900/60 text-[#f7e9c1]/80 border border-gold-900/10 hover:border-gold-400"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Catalog Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-2">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <p className="text-stone-400 font-sans">No jewelries found matching your set parameters.</p>
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter("All");
                        setFilters({ priceRange: "all", metal: "all", category: "all", subCategory: "all" });
                        setSearchQuery("");
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold uppercase text-xs rounded-xl"
                    >
                      Clear Selection Filters
                    </button>
                  </div>
                ) : (
                  filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onClick={handleProductView}
                      onAddToWishlist={handleToggleWishlist}
                      isWishlisted={wishlist.some(w => w.id === prod.id)}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* DYNAMIC PRODUCT DETAILS VIEW */}
          {activeView === "details" && selectedProduct && (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DetailsPage
                product={selectedProduct}
                onBack={() => {
                  setActiveView("home");
                }}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {/* APPOINTMENT BOOKING FORM */}
          {activeView === "book-appointment" && (
            <motion.div
              key="booking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 py-8"
            >
              <AppointmentForm onSuccess={handleBookingSuccess} />
            </motion.div>
          )}

          {/* SHOPPING BAG / CART VIEW */}
          {activeView === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 py-8 font-sans"
            >
              <div className="space-y-6">
                <div className="border-b border-gold-900/10 pb-4">
                  <span className="text-xs uppercase text-gold-400 font-mono tracking-widest">Insured Cart Terminal</span>
                  <h2 className="text-3xl font-serif text-white font-bold leading-tight">My Royal Shopping Bag</h2>
                </div>

                {cart.length === 0 && checkoutStep !== "success" ? (
                  <div className="py-24 text-center space-y-4">
                    <ShoppingCart className="w-12 h-12 text-gold-500/25 mx-auto" />
                    <p className="text-stone-400 font-medium">Your shopping bag is presently empty.</p>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">Add pure gold pieces, diamond rings, or investment sovereign Laxmi coins to proceed with insured home transit.</p>
                    <button
                      onClick={() => handleNavigate("catalog")}
                      className="px-6 py-2.5 rounded-full bg-gold-500 text-stone-950 font-bold uppercase text-xs tracking-wider"
                    >
                      Return to Catalog
                    </button>
                  </div>
                ) : checkoutStep === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl mx-auto bg-[#0A0A0A] border-2 border-green-500 p-8 rounded-3xl text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400 border border-green-500">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-green-400 font-mono">Invoice Order Settled Securely</span>
                      <h3 className="text-2xl font-serif text-white font-bold">Transaction Confirmed</h3>
                      <p className="text-xs text-stone-400 max-w-sm mx-auto">
                        Your jewelry selection is officially reserved. We are hand-packing your artifacts in tamper-proof dual lock cases with live insured courier tracking. Updates are sent via SMS.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900 border border-gold-900/10 text-left space-y-2 text-xs">
                      <p className="text-white font-semibold">Home Transit Destination</p>
                      <p className="text-stone-300">{billingAddress}, {billingCity}</p>
                      <p className="text-stone-300 font-mono">Transit ID: TRNS-{Math.floor(200000 + Math.random() * 800000)}</p>
                    </div>

                    <button
                      onClick={() => {
                        setCheckoutStep("idle");
                        handleNavigate("home");
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 font-bold rounded-xl text-xs uppercase cursor-pointer"
                    >
                      Return to Showroom Home
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Cart items details list */}
                    <div className="lg:col-span-7 space-y-4">
                      {cart.map((item, idx) => (
                        <div
                          key={`${item.product.id}-${item.size}-${idx}`}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0A0A0A] border border-white/5"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrepolicy="no-referrer"
                              className="w-16 h-16 object-cover rounded-xl border border-gold-900/20"
                            />
                            <div className="space-y-1">
                              <h3 className="font-serif text-white font-bold text-sm sm:text-base">{item.product.name}</h3>
                              <p className="text-xs text-stone-400">{item.product.purity} • {item.product.weight}</p>
                              {item.size && (
                                <span className="inline-block px-2 py-0.5 rounded bg-gold-900/30 text-gold-300 text-[10px] font-semibold border border-gold-900/20">
                                  Configured option: {item.size}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1c1218]">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleDecrementCart(item)}
                                className="w-8 h-8 rounded-full border border-gold-900/30 text-stone-400 hover:text-white flex items-center justify-center text-sm font-bold"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-white text-sm">{item.quantity}</span>
                              <button
                                onClick={() => handleAddToCart(item.product, item.size)}
                                className="w-8 h-8 rounded-full border border-gold-900/30 text-stone-400 hover:text-white flex items-center justify-center text-sm font-bold"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-right space-y-0.5">
                              <span className="text-xs text-gold-300 font-bold font-mono block">
                                {formatINR(item.product.totalPrice * item.quantity)}
                              </span>
                              <button
                                onClick={() => handleRemoveCart(item)}
                                className="text-[10px] text-stone-500 hover:text-red-400 font-semibold flex items-center gap-1 ml-auto"
                              >
                                <Trash2 className="w-3 h-3" /> Remove Item
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Cart Total summary and Payment check forms */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#D4AF37]/25 space-y-4 font-sans">
                        <h3 className="font-serif text-white font-bold text-lg border-b border-gold-900/10 pb-2 flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-gold-400" /> Transaction Summary
                        </h3>

                        <div className="space-y-2.5 text-sm divider-y divide-[#20151f]">
                          <div className="flex justify-between text-stone-400">
                            <span>Subtotal value ({cart.reduce((s,i) => s+i.quantity, 0)} jewelry items)</span>
                            <span className="font-mono text-stone-200">{formatINR(cartSubtotal - totalGstIncluded)}</span>
                          </div>
                          <div className="flex justify-between text-stone-400">
                            <span>Making Charges Included</span>
                            <span className="text-green-400 font-mono">Bundled</span>
                          </div>
                          <div className="flex justify-between text-stone-400">
                            <span>Central + State GST (3%)</span>
                            <span className="font-mono text-stone-200">{formatINR(totalGstIncluded)}</span>
                          </div>
                          <div className="flex justify-between text-stone-400">
                            <span>Insured Priority Shipping</span>
                            <span className="text-green-400 font-semibold font-sans uppercase text-[10px]">Free and Insured</span>
                          </div>
                          
                          <div className="pt-3 border-t border-gold-900/10 flex justify-between font-bold text-base text-white">
                            <span>Grand Total Ornaments Value</span>
                            <span className="font-mono text-gold-400">{formatINR(cartSubtotal)}</span>
                          </div>
                        </div>

                        {/* Interactive billing checkout details form (No mock inputs, real validation) */}
                        {checkoutStep === "idle" && (
                          <div className="pt-4 border-t border-[#20151f] text-center">
                            <button
                              onClick={() => setCheckoutStep("billing")}
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-lg cursor-pointer hover:from-gold-500 hover:to-gold-300 transition-all"
                            >
                              Proceed to Insured Billing <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {checkoutStep === "billing" && (
                          <form onSubmit={handlePayCheckout} className="pt-4 border-t border-[#20151f] space-y-4 text-left">
                            <h4 className="font-serif text-sm font-semibold text-gold-300">Transit & Secure Billing Registry</h4>
                            
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Mobile Number (For SMS OTP Check)</label>
                              <input
                                type="tel"
                                maxLength={10}
                                placeholder="9876543210"
                                value={billingPhone}
                                required
                                onChange={(e) => setBillingPhone(e.target.value.replace(/\D/g, ""))}
                                className="w-full bg-stone-900 border border-gold-900/30 focus:border-gold-400 text-white px-3 py-2 rounded-lg text-xs font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Insured Doorstep Address</label>
                              <input
                                type="text"
                                placeholder="e.g. Plot No, Street, Ward No"
                                value={billingAddress}
                                required
                                onChange={(e) => setBillingAddress(e.target.value)}
                                className="w-full bg-stone-900 border border-gold-900/30 focus:border-gold-400 text-white px-3 py-2 rounded-lg text-xs"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">City / Town (Rajasthan / India)</label>
                              <input
                                type="text"
                                placeholder="e.g. Sikar"
                                value={billingCity}
                                required
                                onChange={(e) => setBillingCity(e.target.value)}
                                className="w-full bg-stone-900 border border-gold-900/30 focus:border-gold-400 text-white px-3 py-2 rounded-lg text-xs"
                              />
                            </div>

                            <button
                              type="submit"
                              id="btn-confirm-order"
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl shadow-green-500/10 cursor-pointer hover:brightness-110 active:scale-95 transition-all mt-4"
                            >
                              <CreditCard className="w-4 h-4" /> Secure Gateway Settlement
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setCheckoutStep("idle")}
                              className="w-full text-center text-[10px] text-stone-500 hover:text-stone-300 uppercase underline"
                            >
                              Go Back
                            </button>
                          </form>
                        )}

                        {checkoutStep === "processing" && (
                          <div className="py-8 text-center space-y-4">
                            <RefreshCw className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
                            <p className="text-xs text-stone-400">Verifying secure RBI authorized payment token...</p>
                            <span className="text-[10px] text-stone-600 block">Do not refresh or close Sikar terminal session.</span>
                          </div>
                        )}

                      </div>
                    </div>

                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Sikar Showroom Coordinates Strip Details */}
      <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/20 py-8 px-4 md:px-8 mt-12 font-sans relative z-10 text-stone-400 text-xs text-center md:text-left font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="col-span-1 md:col-span-5 space-y-3">
            <h3 className="font-serif text-lg text-white font-extrabold uppercase">Narayani Jewellers</h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Honoring the heritage of Rajasthan since 1988 with exceptional BIS-hallmarked pure golds, meenakari bangles, uncut Polki chokers, and conflict-free diamond wedding bands.
            </p>
            <p className="text-[10px] text-gold-500 font-mono font-medium tracking-wider">
              100% REGULATED INDIAN METALS • BIS NO: HM/C-32864
            </p>
          </div>

          <div className="col-span-1 md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm text-gold-300 font-semibold uppercase">Showroom Boutique</h4>
            <div className="space-y-2 text-stone-400 text-[11px] max-w-xs mx-auto md:mx-0">
              <p className="flex items-start gap-1.5 justify-center md:justify-start">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>Narayani Tower, Court Road, Opp. Kalyan Circle, Sikar, Rajasthan - 332001</span>
              </p>
              <p className="flex items-center gap-1.5 justify-center md:justify-start">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="font-mono text-stone-300">+91 1572 258800</span>
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 space-y-3 text-center md:text-right">
            <h4 className="font-serif text-sm text-gold-300 font-semibold uppercase">Security Certifications</h4>
            <div className="flex justify-center md:justify-end gap-3.5 pt-1.5 opacity-60">
              <span className="px-2 py-1 border border-[#D4AF37] rounded text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold">916 Purity Govt-BIS</span>
              <span className="px-2 py-1 border border-stone-800 rounded text-[9px] uppercase tracking-wider text-stone-400 font-semibold">VVS-Diamond GIA</span>
            </div>
            <p className="text-[9px] text-stone-500 pt-2 font-mono">
              Designed by Elite Full-Stack • Real-time Shimmer v4
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-gold-900/15 text-center mt-6 pt-6 text-[10px] text-stone-600 font-mono flex flex-col sm:flex-row justify-between gap-3">
          <span>© 1988-2026 Narayani Jewellers Royal Group Private Limited. All Rights Reserved.</span>
          <span>Sikar Flagship Registry Lic 332-RAJ-ECOM</span>
        </div>
      </footer>

      {/* Slide-out Filters sidebar menu */}
      <FiltersSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onChange={(updatedFilters) => {
          setFilters(updatedFilters);
          // Auto filter products
        }}
      />

      {/* Fixed Bottom Nav bar only rendering on Mobile screen formats as requested */}
      <BottomNavBar
        activeView={activeView}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((accum, item) => accum + item.quantity, 0)}
      />

    </div>
  );
}
