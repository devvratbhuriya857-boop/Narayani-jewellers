import { Product } from "./types";

export const GOLD_RATE_22K_PER_GRAM = 7240; // in INR
export const GOLD_RATE_24K_PER_GRAM = 7900; // in INR
export const PLATINUM_RATE_PER_GRAM = 4120; // in INR

const RAW_PRODUCTS = [
  {
    id: "prod-1",
    name: "Royal Polki Kundan Choker",
    category: "Bridal",
    subCategory: "Bridal Polki",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "48.5g",
    purity: "22kt | Hallmarked",
    metal: "Gold",
    purityBadge: "22K BIS Hallmarked",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 42000,
    basePrice: Math.round(48.5 * GOLD_RATE_22K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0, // Will compute immediately
    rating: 4.9,
    reviewsCount: 42,
    isBestSeller: true,
    description: "An absolute masterpiece of craftsmanship. Handcrafted in Rajasthan, this stunning Polki throat-hugging choker features natural uncut diamonds embedded in pure 22kt gold foil, paired with premium hand-strung South Sea pearls and rich green enameled meenakari detailing on the reverse side."
  },
  {
    id: "prod-2",
    name: "Aura Solitaire Diamond Ring",
    category: "Diamond",
    subCategory: "Diamond Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "4.2g",
    purity: "18kt VVS-EF Diamond",
    metal: "Rose Gold",
    purityBadge: "18K Gold & Certified VVS-EF Diamond",
    goldRate: GOLD_RATE_22K_PER_GRAM, // uses diamond rate setup
    makingCharges: 14500,
    basePrice: 84000, // Diamond base value
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.8,
    reviewsCount: 19,
    isBestSeller: true,
    description: "A breathtaking brilliant-cut 1.2 carat primary lab-certified VVS diamond clustered on an 18kt rose gold band, adorned with channel-set micro pavé accent diamonds. Symbolizes eternal devotion with infinite sparkle."
  },
  {
    id: "prod-3",
    name: "Devi Antique Filigree Bangles (Pair)",
    category: "Gold",
    subCategory: "Antique Bangles",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "32.0g",
    purity: "22kt | Antique Polish",
    metal: "Gold",
    purityBadge: "22K BIS Hallmarked Antique",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 22000,
    basePrice: Math.round(32.0 * GOLD_RATE_22K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.7,
    reviewsCount: 28,
    isNewArrival: true,
    description: "Evoke the grandeur of ancient times with these beautiful antique-finished bangles. Adorned with delicate filigree scrollwork, hand-carved floral patterns, and a screw-clamp lock style that ensures perfect wrist configuration."
  },
  {
    id: "prod-4",
    name: "Veda Gold Hoop Earrings",
    category: "Gold",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "6.8g",
    purity: "22kt | Daily Glamour",
    metal: "Gold",
    purityBadge: "22K BIS Certified Gold",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 4800,
    basePrice: Math.round(6.8 * GOLD_RATE_22K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.6,
    reviewsCount: 56,
    description: "Add a pinch of royal sophistication to your daily wear. These micro-sculpted golden hoops feature a modern geometry mixed with classic Indian line details, providing both extreme light weight and absolute structural sturdiness."
  },
  {
    id: "prod-5",
    name: "Mayura Peacock Gold Haar",
    category: "Bridal",
    subCategory: "Bridal Polki",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "62.4g",
    purity: "22kt Temple Style",
    metal: "Gold",
    purityBadge: "22K Pure Hallmark Temple Jewelry",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 55000,
    basePrice: Math.round(62.4 * GOLD_RATE_22K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 5.0,
    reviewsCount: 15,
    isBestSeller: true,
    description: "An elaborate multi-layered bridal Haar featuring dual majestic peacocks in full plumage. Set with custom rubies, round-cut emeralds, and finished in royal antique yellow matte gold. Perfect as the centerpiece of bridal heritage ensembles."
  },
  {
    id: "prod-6",
    name: "Celestial Diamond Drops",
    category: "Diamond",
    subCategory: "Diamond Rings", // Drop category but fits search
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "9.5g",
    purity: "18kt | VVS clarity",
    metal: "White Gold",
    purityBadge: "18K Gold Premium Certified Diamonds",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 18500,
    basePrice: 165000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.8,
    reviewsCount: 22,
    isNewArrival: true,
    description: "Cascading platinum-polished 18kt white gold drop earrings. Embedded with pristine EF color graded baguette and marquise cut diamonds that filter light into brilliant rainbow flares with every tilt of the head."
  },
  {
    id: "prod-7",
    name: "Pure Laxmi Gold Coin - 10 Gram",
    category: "Coins",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1610375461262-e18df2249701?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "10.0g",
    purity: "24kt | 999 Purity",
    metal: "Gold",
    purityBadge: "24K 999 Fine Gold Coin",
    goldRate: GOLD_RATE_24K_PER_GRAM,
    makingCharges: 1200,
    basePrice: Math.round(10 * GOLD_RATE_24K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.9,
    reviewsCount: 88,
    description: "A supreme investment standard. This pure 99.9% 24K yellow gold coin features an embossed goddess Laxmi sitting on a lotus, representing unlimited wealth and prosperity. Enclosed in a certified tamper-proof card."
  },
  {
    id: "prod-8",
    name: "Nouveau Diamond Bracelet",
    category: "Gifts",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "14.2g",
    purity: "18kt Rose Gold",
    metal: "Platinum",
    purityBadge: "Premium 950 Platinum",
    goldRate: PLATINUM_RATE_PER_GRAM,
    makingCharges: 16200,
    basePrice: Math.round(14.2 * PLATINUM_RATE_PER_GRAM) + 68000, 
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.7,
    reviewsCount: 14,
    description: "Ultra sleek styling for a contemporary look. Made with 95% pure platinum, this line bracelet features custom pave diamonds in interlocking links. Features a safety latch clasp for worry-free daily use."
  },
  {
    id: "prod-9",
    name: "Royal Jadau Emerald Necklace",
    category: "Bridal",
    subCategory: "Bridal Polki",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "54.2g",
    purity: "22kt | Certified Kundan",
    metal: "Gold",
    purityBadge: "22K Govt Approved Hallmarked",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 48500,
    basePrice: Math.round(54.2 * GOLD_RATE_22K_PER_GRAM) + 120000, // Emerald additions
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.95,
    reviewsCount: 31,
    isBestSeller: true,
    description: "A monumental heritage necklace. Set on a foundation of pure 22kt yellow gold with hand-cut polki diamonds, paired with vibrant Zambian emerald drops of peerless clarity. Represents the absolute pinnacle of luxury bridal ensembles."
  },
  {
    id: "prod-10",
    name: "Majestic Solitaire Tennis Bracelet",
    category: "Diamond",
    subCategory: "Diamond Rings",
    image: "https://images.unsplash.com/photo-1596568307830-a5ea06c3ac9c?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1596568307830-a5ea06c3ac9c?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "18.5g",
    purity: "18kt White Gold",
    metal: "Platinum",
    purityBadge: "950 Platinum & VVS-EF Solitaires",
    goldRate: PLATINUM_RATE_PER_GRAM,
    makingCharges: 38000,
    basePrice: 320000, // Certified high clarity diamonds
    gstPercent: 3,
    totalPrice: 0,
    rating: 5.0,
    reviewsCount: 16,
    isNewArrival: true,
    description: "An unbroken circle of light. Features 42 individually matched round brilliant-cut diamonds of VVS1 clarity and EF color grade, configured in an elegant bezel-setting of solid pure platinum."
  },
  {
    id: "prod-11",
    name: "Nizam Royal Pearl Choker Set",
    category: "Bridal",
    subCategory: "Bridal Polki",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "41.8g",
    purity: "22kt | Hyderabad Basra Pearls",
    metal: "Gold",
    purityBadge: "22K BIS Hallmarked Royal Jadau",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 39000,
    basePrice: Math.round(41.8 * GOLD_RATE_22K_PER_GRAM) + 65000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.8,
    reviewsCount: 12,
    description: "Inspired by the royal courts of the Deccan, this luxury choker weaves layers of high-luster Basra pearls with a central Kundan pendant encrusted with real Burmese rubies."
  },
  {
    id: "prod-12",
    name: "Heritage Gold Jhumka Earrings",
    category: "Gold",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "16.5g",
    purity: "22kt | Antique Matt Finish",
    metal: "Gold",
    purityBadge: "22K BIS Certified Gold Stamp",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 9800,
    basePrice: Math.round(16.5 * GOLD_RATE_22K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.9,
    reviewsCount: 45,
    description: "Traditional dome-shaped jhumkas boasting delicate filigree work, finished in an elegant vintage gold luster, embellished with tiny gold droplets that catch sound and motion."
  },
  {
    id: "prod-13",
    name: "Queen's Ruby Crown Ring",
    category: "Diamond",
    subCategory: "Diamond Rings",
    image: "https://images.unsplash.com/photo-1588444650733-747522cd915d?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1588444650733-747522cd915d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "5.8g",
    purity: "18kt Rose Gold",
    metal: "Rose Gold",
    purityBadge: "18K Gold Premium Certified Diamond & Ruby",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 11000,
    basePrice: 98000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.75,
    reviewsCount: 20,
    isBestSeller: true,
    description: "Designed in the likeness of a royal crown. Spotlights a cushion-cut 1.5-carat blood-red ruby at the apex, flanked by VVS brilliant-cut micro-diamonds along a shimmering rose gold tiara band."
  },
  {
    id: "prod-14",
    name: "Eternal Platinum Couple Bands",
    category: "Gifts",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "12.4g",
    purity: "95% Pure Platinum",
    metal: "Platinum",
    purityBadge: "Premium PT950 Hallmark Certificate",
    goldRate: PLATINUM_RATE_PER_GRAM,
    makingCharges: 14000,
    basePrice: Math.round(12.4 * PLATINUM_RATE_PER_GRAM) + 40000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.85,
    reviewsCount: 25,
    description: "Unison of souls. A pair of matching bands crafted in high-luster scratch-resistant platinum, featuring internal micro-diamonds embedded securely against the skin."
  },
  {
    id: "prod-15",
    name: "Antique Lakshmi Temple Haram",
    category: "Bridal",
    subCategory: "Bridal Polki",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "78.0g",
    purity: "22kt | Temple Style Nakshi",
    metal: "Gold",
    purityBadge: "22K BIS Hallmarked Traditional Nakshi",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 68000,
    basePrice: Math.round(78.0 * GOLD_RATE_22K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 5.0,
    reviewsCount: 18,
    isNewArrival: true,
    description: "A breathtaking long haram depicting the divine coronation of Goddess Lakshmi. Exquisitely handcrafted using ancient Nakshi repoussé methods and accented with seed-pearl borders."
  },
  {
    id: "prod-16",
    name: "Delicate Diamond Mangalsutra",
    category: "Gifts",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "8.4g",
    purity: "18kt Yellow Gold",
    metal: "Gold",
    purityBadge: "18K Gold & Certified VVS Diamonds",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 8500,
    basePrice: Math.round(8.4 * GOLD_RATE_22K_PER_GRAM) + 42000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.8,
    reviewsCount: 33,
    description: "A contemporary tribute to sacred vows. Strips away heavy details to focus on a minimal, geometric pendant set with cluster diamonds and delicate dual-strand black onyx beads."
  },
  {
    id: "prod-17",
    name: "Solid Gold Swara Kada",
    category: "Gold",
    subCategory: "Antique Bangles",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "42.5g",
    purity: "22kt Gold | Hand Carved",
    metal: "Gold",
    purityBadge: "22K BIS Govt Certified Stamp",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 32000,
    basePrice: Math.round(42.5 * GOLD_RATE_22K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.9,
    reviewsCount: 21,
    description: "An ornate solid gold wrist bangle (Kada). Shows classical handcarved Rajasthani elephant endpoints in solid meenakari coloring, embodying heavy elegance."
  },
  {
    id: "prod-18",
    name: "Modern Geometric Diamond Studs",
    category: "Diamond",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "3.5g",
    purity: "18kt White Gold",
    metal: "White Gold",
    purityBadge: "18K Gold & Certified VVS-EF Diamond Pair",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 6000,
    basePrice: 65000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.7,
    reviewsCount: 15,
    description: "Striking architectural hexagon studs set with pave VVS-clarity colorless diamonds, optimal for daily boardrooms and corporate elegance."
  },
  {
    id: "prod-19",
    name: "Kundan Meenakari Chandbalis",
    category: "Gold",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "24.6g",
    purity: "22kt Gold | Jadau Work",
    metal: "Gold",
    purityBadge: "22K BIS Hallmarked Royal Jadau",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 21000,
    basePrice: Math.round(24.6 * GOLD_RATE_22K_PER_GRAM) + 14000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.8,
    reviewsCount: 19,
    description: "Crescent moon chandbali earrings. Embellished with beautiful polki gemstones, red and white enamel meenakari patterns on reverse, and dangling natural pearl rows."
  },
  {
    id: "prod-20",
    name: "Pure Gold Laxmi Ganesha Coin - 20g",
    category: "Coins",
    subCategory: "Daily Wear Gold",
    image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "20.0g",
    purity: "24kt | 999.9 Swiss Quality",
    metal: "Gold",
    purityBadge: "24K Swiss Certified Pure Gilt Coin",
    goldRate: GOLD_RATE_24K_PER_GRAM,
    makingCharges: 2400,
    basePrice: Math.round(20 * GOLD_RATE_24K_PER_GRAM),
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.95,
    reviewsCount: 110,
    description: "Blessed investment gold. Showcases detailed relief engravings of Lakshmi and Ganesha in pristine 999.9 pure gold. Perfect gift for Diwali and auspicious Dhanteras events."
  },
  {
    id: "prod-21",
    name: "Imperial Sapphire Statement Ring",
    category: "Diamond",
    subCategory: "Diamond Rings",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "7.2g",
    purity: "18kt White Gold & Sapphire",
    metal: "White Gold",
    purityBadge: "18K Gold Premium Certified Diamond & Sapphire",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 13500,
    basePrice: 155000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.9,
    reviewsCount: 14,
    description: "A royal blue 2.1-carat oval Ceylon sapphire, encircled by a gorgeous orbit of pear-shaped brilliant diamonds, set in solid heavy 18K white gold."
  },
  {
    id: "prod-22",
    name: "Royal Bridal Chooras with Gold Caps",
    category: "Bridal",
    subCategory: "Antique Bangles",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "22.5g",
    purity: "22kt | Hand Beaded Caps",
    metal: "Gold",
    purityBadge: "22K BIS Hallmarked Gold caps",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 18000,
    basePrice: Math.round(22.5 * GOLD_RATE_22K_PER_GRAM) + 30000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 4.85,
    reviewsCount: 9,
    description: "Luxurious traditional red bridal bangles, capped on each end with exquisite Govt Hallmarked 22kt yellow gold details in mastercraft lattice design."
  },
  {
    id: "prod-23",
    name: "Floral Gold Waist Belt (Kamarbandh)",
    category: "Bridal",
    subCategory: "Antique Bangles",
    image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=1000&q=85",
    images: [
      "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=1000&q=85"
    ],
    weight: "92.0g",
    purity: "22kt Royal Polki Belt",
    metal: "Gold",
    purityBadge: "22K BIS Government Hallmarked Traditional Nakshi",
    goldRate: GOLD_RATE_22K_PER_GRAM,
    makingCharges: 74000,
    basePrice: Math.round(92.0 * GOLD_RATE_22K_PER_GRAM) + 40000,
    gstPercent: 3,
    totalPrice: 0,
    rating: 5.0,
    reviewsCount: 11,
    description: "The crown jewel of traditional drapery. An antique-finished pure 22kt waistbelt (Kamarbandh) showcasing interlocked floral medallions, set with premium uncut diamonds and fresh ruby-studded tassels."
  }
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((prod: any): Product => {
  // Post-calculate total prices mathematically
  const rawTotal = (prod.basePrice + prod.makingCharges) * (1 + prod.gstPercent / 100);
  prod.totalPrice = Math.round(rawTotal);
  return prod as Product;
});

export const SHOWROOMS = [
  {
    id: "sikar-flagship",
    name: "Narayani Jewels Flagship Showroom - Sikar",
    address: "Narayani Tower, Opp. Kalyan Circle, Court Road, Sikar, Rajasthan - 332001",
    phone: "+91 1572 258800",
    email: "sikar@narayanijewellers.com",
    hours: "10:30 AM - 8:30 PM (Open Holidays)",
    mapUrl: "https://maps.google.com/?q=Narayani+Tower+Sikar+Kalyan+Circle"
  }
];

export const TIME_SLOTS = [
  "11:00 AM - 12:30 PM",
  "12:30 PM - 02:00 PM",
  "02:00 PM - 03:30 PM",
  "03:30 PM - 05:00 PM",
  "05:00 PM - 06:30 PM",
  "06:30 PM - 08:30 PM"
];

export const TRUST_FACTS = [
  {
    id: "tf-1",
    title: "100% BIS Hallmarked",
    description: "Our gold jewelry is completely authenticated by BIS Govt of India stamps, guaranteeing absolute purity.",
    iconName: "ShieldCheck"
  },
  {
    id: "tf-2",
    title: "Lifetime Exchange",
    description: "Transparent buyback and exchange options with guaranteed value calculations at local daily market rates.",
    iconName: "RotateCcw"
  },
  {
    id: "tf-3",
    title: "Insured Guard Transit",
    description: "Each order is fully insured and delivered directly to your doorstep in tamper-proof security cases.",
    iconName: "Truck"
  }
];
