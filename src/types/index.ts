export interface Product {
  id: string;
  name: string;
  category: string;
  weight: string;
  purity: string;
  price: string;
  image: string;
  isNewArrival?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface MetalRate {
  label: string;
  karat?: string;
  ratePerGram: string;
  lastUpdated: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  city: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span?: 'tall' | 'wide' | 'normal';
}

export interface NavLink {
  label: string;
  href: string;
}
