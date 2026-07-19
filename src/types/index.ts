// ─── Navigation ────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Collections ───────────────────────────────────────────────
export interface Collection {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  bannerImage: string;
  productCount: number;
  /** Controls masonry grid sizing on Collections page */
  size: 'large' | 'medium' | 'tall' | 'small';
  /** How the image fills its frame — use contain for full jewellery visibility */
  imageFit?: 'cover' | 'contain';
}

// ─── Products ──────────────────────────────────────────────────
export type Purity = '24K' | '22K' | '18K' | '14K';
export type WeightBucket = 'light' | 'medium' | 'heavy' | 'statement';
export type PriceRange = 'under20k' | '20k-50k' | '50k-1l' | 'above1l';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  purity: Purity;
  weight: string;            // display string e.g. "4.2g"
  weightGrams: number;       // numeric for filtering
  price?: string;            // optional display string
  priceValue?: number;       // numeric for filtering
  images: string[];
  description: string;
  makingStyle?: string;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isAvailable: boolean;
  isSoldOut?: boolean;
  isHidden?: boolean;
  tags?: string[];
}

// ─── Filters ───────────────────────────────────────────────────
export interface FilterState {
  purity: Purity[];
  weightBucket: WeightBucket | 'all';
  priceRange: PriceRange | 'all';
  newArrivals: boolean;
  featured: boolean;
  available: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  purity: [],
  weightBucket: 'all',
  priceRange: 'all',
  newArrivals: false,
  featured: false,
  available: false,
};

// ─── Metal Rates ───────────────────────────────────────────────
export interface MetalRate {
  label: string;
  karat?: string;
  ratePerGram: string;
  lastUpdated: string;
}

// ─── Testimonials ──────────────────────────────────────────────
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  city: string;
}

// ─── Gallery ───────────────────────────────────────────────────
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span?: 'tall' | 'wide' | 'normal';
}
