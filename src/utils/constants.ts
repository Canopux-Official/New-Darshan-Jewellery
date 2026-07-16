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
  { id: 'bridal', name: 'Bridal Collection', slug: 'bridal-collection', shortDescription: 'Heirlooms for your most sacred day.', description: '', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1800&q=85', productCount: 4, size: 'large' },
  { id: 'necklaces', name: 'Gold Necklaces', slug: 'gold-necklaces', shortDescription: 'Heritage necklaces crafted in 22K gold.', description: '', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1800&q=85', productCount: 5, size: 'medium' },
  { id: 'chains', name: 'Gold Chains', slug: 'gold-chains', shortDescription: 'Classic chains woven with precision.', description: '', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=85', productCount: 4, size: 'small' },
  { id: 'rings', name: 'Gold Rings', slug: 'gold-rings', shortDescription: 'Timeless gold rings for every occasion.', description: '', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1800&q=85', productCount: 5, size: 'medium' },
  { id: 'bangles', name: 'Bangles', slug: 'bangles', shortDescription: 'Intricately designed bangle sets.', description: '', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1800&q=85', productCount: 4, size: 'small' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings', shortDescription: 'Traditional and modern gold earrings.', description: '', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80', bannerImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1800&q=85', productCount: 5, size: 'large' },
];

export const FEATURED_PRODUCTS: Product[] = [
  { id: 'p1', slug: 'floral-gold-ring', name: 'Floral Gold Ring', category: 'Gold Rings', categorySlug: 'gold-rings', weight: '4.2g', weightGrams: 4.2, purity: '22K', price: '₹28,556', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80'], description: 'A radiant floral design in 22K gold.', isNewArrival: true, isAvailable: true },
  { id: 'p2', slug: 'traditional-gold-necklace', name: 'Traditional Gold Necklace', category: 'Gold Necklaces', categorySlug: 'gold-necklaces', weight: '22.5g', weightGrams: 22.5, purity: '22K', price: '₹1,53,075', images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80'], description: 'A statement traditional necklace.', isAvailable: true },
  { id: 'p3', slug: 'kids-gold-bracelet', name: 'Kids Gold Bracelet', category: 'Kids Collection', categorySlug: 'kids-collection', weight: '8.8g', weightGrams: 8.8, purity: '22K', price: '₹48,972', images: ['https://images.unsplash.com/photo-1573408301185-9519f94de11e?w=900&q=80'], description: 'A lightweight kids bracelet.', isNewArrival: true, isAvailable: true },
  { id: 'p4', slug: 'designer-earrings', name: 'Designer Earrings', category: 'Earrings', categorySlug: 'earrings', weight: '6.1g', weightGrams: 6.1, purity: '22K', price: '₹41,521', images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=900&q=80'], description: 'Elegant designer earrings.', isAvailable: true },
  { id: 'p5', slug: 'elegant-gold-bangles', name: 'Elegant Gold Bangles', category: 'Bangles', categorySlug: 'bangles', weight: '32.0g', weightGrams: 32, purity: '22K', price: '₹2,17,760', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80'], description: 'A set of elegant bangles in 22K gold.', isNewArrival: true, isAvailable: true },
  { id: 'p6', slug: 'lightweight-daily-wear-chain', name: 'Lightweight Daily Wear Chain', category: 'Gold Chains', categorySlug: 'gold-chains', weight: '11.3g', weightGrams: 11.3, purity: '22K', price: '₹76,919', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80'], description: 'A lightweight daily wear chain.', isAvailable: true },
  { id: 'p7', slug: 'temple-design-pendant', name: 'Temple Design Pendant', category: 'Pendants', categorySlug: 'pendants', weight: '3.4g', weightGrams: 3.4, purity: '22K', price: '₹18,921', images: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&q=80'], description: 'A temple-inspired pendant.', isAvailable: true },
  { id: 'p8', slug: 'wedding-choker', name: 'Wedding Choker', category: 'Bridal Collection', categorySlug: 'bridal-collection', weight: '5.9g', weightGrams: 5.9, purity: '22K', price: '₹62,340', images: ['https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=900&q=80'], description: 'A bridal wedding choker.', isNewArrival: true, isAvailable: true },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Beautiful jewellery collection and very polite staff. Highly recommended.',
    name: 'Priyanka Mishra',
    city: 'Ghasipura',
  },
  {
    id: 't2',
    quote:
      'Excellent craftsmanship and transparent pricing. We purchased our wedding jewellery here.',
    name: 'Satyabrata Nayak',
    city: 'Anandapur',
  },
  {
    id: 't3',
    quote:
      'Trusted jewellery shop in Ghasipura with a wide variety of designs.',
    name: 'Ananya Das',
    city: 'Keonjhar',
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
