import type { Collection, MetalRate, NavLink, Product, Testimonial, GalleryImage } from '../types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Collections', href: '/collections' },
  { label: "Today's Rates", href: '/rates' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const METAL_RATES: MetalRate[] = [
  { label: '24K Gold', karat: '24K', ratePerGram: '₹7,420', lastUpdated: 'Today, 10:00 AM' },
  { label: '22K Gold', karat: '22K', ratePerGram: '₹6,803', lastUpdated: 'Today, 10:00 AM' },
  { label: '18K Gold', karat: '18K', ratePerGram: '₹5,565', lastUpdated: 'Today, 10:00 AM' },
  { label: 'Silver', karat: undefined, ratePerGram: '₹94', lastUpdated: 'Today, 10:00 AM' },
];

// Unsplash curated jewellery images
export const COLLECTIONS: Collection[] = [
  { id: 'rings', name: 'Gold Rings', slug: 'gold-rings', shortDescription: 'Timeless gold rings for every occasion.', description: '', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1800&q=85', productCount: 5, size: 'large' },
  { id: 'necklaces', name: 'Necklaces', slug: 'necklaces', shortDescription: 'Heritage necklaces crafted in 22K gold.', description: '', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1800&q=85', productCount: 5, size: 'medium' },
  { id: 'chains', name: 'Chains', slug: 'chains', shortDescription: 'Classic chains woven with precision.', description: '', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=85', productCount: 4, size: 'small' },
  { id: 'bangles', name: 'Bangles', slug: 'bangles', shortDescription: 'Intricately designed bangle sets.', description: '', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1800&q=85', productCount: 4, size: 'medium' },
  { id: 'bracelets', name: 'Bracelets', slug: 'bracelets', shortDescription: 'Elegant bracelets in 18K & 22K gold.', description: '', image: 'https://images.unsplash.com/photo-1573408301185-9519f94de11e?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1573408301185-9519f94de11e?w=1800&q=85', productCount: 4, size: 'small' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings', shortDescription: 'Traditional and modern gold earrings.', description: '', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1800&q=85', productCount: 5, size: 'large' },
];

export const FEATURED_PRODUCTS: Product[] = [
  { id: 'p1', slug: 'sunburst-solitaire-ring', name: 'Sunburst Solitaire Ring', category: 'Gold Rings', categorySlug: 'gold-rings', weight: '4.2g', weightGrams: 4.2, purity: '22K', price: '₹28,556', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80'], description: 'A radiant sunburst design in 22K gold.', isNewArrival: true, isAvailable: true },
  { id: 'p2', slug: 'heritage-polki-necklace', name: 'Heritage Polki Necklace', category: 'Necklaces', categorySlug: 'necklaces', weight: '22.5g', weightGrams: 22.5, purity: '22K', price: '₹1,53,075', images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80'], description: 'A statement polki necklace.', isAvailable: true },
  { id: 'p3', slug: 'twisted-rope-bracelet', name: 'Twisted Rope Bracelet', category: 'Bracelets', categorySlug: 'bracelets', weight: '8.8g', weightGrams: 8.8, purity: '18K', price: '₹48,972', images: ['https://images.unsplash.com/photo-1573408301185-9519f94de11e?w=900&q=80'], description: 'A bold twisted rope bracelet.', isNewArrival: true, isAvailable: true },
  { id: 'p4', slug: 'classic-jhumka-earrings', name: 'Classic Jhumka Earrings', category: 'Earrings', categorySlug: 'earrings', weight: '6.1g', weightGrams: 6.1, purity: '22K', price: '₹41,521', images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80'], description: 'Traditional jhumkas.', isAvailable: true },
  { id: 'p5', slug: 'maharani-bangle-set', name: 'Maharani Bangle Set', category: 'Bangles', categorySlug: 'bangles', weight: '32.0g', weightGrams: 32, purity: '22K', price: '₹2,17,760', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80'], description: 'A set of six bangles in 22K gold.', isNewArrival: true, isAvailable: true },
  { id: 'p6', slug: 'figaro-chain', name: 'Figaro Chain', category: 'Chains', categorySlug: 'chains', weight: '11.3g', weightGrams: 11.3, purity: '22K', price: '₹76,919', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80'], description: 'Classic figaro pattern chain.', isAvailable: true },
  { id: 'p7', slug: 'floral-stud-earrings', name: 'Floral Stud Earrings', category: 'Earrings', categorySlug: 'earrings', weight: '3.4g', weightGrams: 3.4, purity: '18K', price: '₹18,921', images: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&q=80'], description: 'Minimal floral stud earrings.', isAvailable: true },
  { id: 'p8', slug: 'royal-diamond-ring', name: 'Royal Diamond Ring', category: 'Gold Rings', categorySlug: 'gold-rings', weight: '5.9g', weightGrams: 5.9, purity: '18K', price: '₹62,340', images: ['https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=900&q=80'], description: 'A royal diamond-cut ring.', isNewArrival: true, isAvailable: true },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'The necklace I purchased for my daughter\'s wedding was beyond exquisite. Every guest asked where it was from. Krishna Jewellers has been a part of our family milestones for over a decade.',
    name: 'Meera Patel',
    city: 'Ahmedabad',
  },
  {
    id: 't2',
    quote:
      'What sets Krishna Jewellers apart is not just the quality of gold, but the artistry. Each piece feels like it carries a story. I wore my bangles on the most important day of my life.',
    name: 'Priya Sharma',
    city: 'Mumbai',
  },
  {
    id: 't3',
    quote:
      'Three generations of our family have trusted Krishna Jewellers. The craftsmanship is unparalleled and the service is always warm and personal. Truly a legacy brand.',
    name: 'Sunita Desai',
    city: 'Surat',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', alt: 'Gold ring', span: 'tall' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', alt: 'Necklace', span: 'normal' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', alt: 'Chain', span: 'normal' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80', alt: 'Bangles', span: 'wide' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1573408301185-9519f94de11e?w=600&q=80', alt: 'Bracelet', span: 'normal' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80', alt: 'Earrings', span: 'tall' },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80', alt: 'Floral studs', span: 'normal' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80', alt: 'Diamond ring', span: 'normal' },
  { id: 'g9', src: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80', alt: 'Jewellery flat lay', span: 'wide' },
];
