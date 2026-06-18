export interface Product {
  id: string;
  name: string;
  category: "Gold" | "Diamond" | "Bridal" | "Gifts" | "Coins";
  subCategory: string;
  image: string;
  images: string[];
  weight: string;
  purity: string;
  goldRate: number;
  makingCharges: number;
  basePrice: number;
  gstPercent: number;
  totalPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  metal: "Gold" | "Rose Gold" | "White Gold" | "Platinum";
  purityBadge: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface BookingDetails {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  showroom: string;
  assistanceType: "Bridal Consultation" | "Custom Designing" | "Gold Exchange" | "Valuation & Investment";
  message?: string;
}

export interface FilterState {
  priceRange: "all" | "under-25k" | "25k-50k" | "50k-1l" | "above-1l";
  metal: "all" | "Gold" | "Rose Gold" | "White Gold" | "Platinum";
  category: "all" | "Gold" | "Diamond" | "Bridal" | "Gifts" | "Coins";
  subCategory: "all" | "Bridal Polki" | "Daily Wear Gold" | "Diamond Rings" | "Antique Bangles";
}
