import type { Collection, MetalRate, NavLink, Product, Testimonial, GalleryImage } from '../types';
import { STORE_PHOTOS } from '../data/storeImages';

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

const C = STORE_PHOTOS.collections;

export const COLLECTIONS: Collection[] = [
  { id: 'bridal', name: 'Bridal Collection', slug: 'bridal-collection', shortDescription: 'Heirlooms for your most sacred day.', description: '', image: C.bridal, bannerImage: C.bridal, productCount: 4, size: 'large' },
  { id: 'necklaces', name: 'Gold Necklaces', slug: 'gold-necklaces', shortDescription: 'Heritage necklaces crafted in 22K gold.', description: '', image: C.goldNecklaces, bannerImage: C.goldNecklaces, productCount: 5, size: 'medium' },
  { id: 'chains', name: 'Gold Chains', slug: 'gold-chains', shortDescription: 'Classic chains woven with precision.', description: '', image: C.goldChains, bannerImage: C.goldChains, productCount: 7, size: 'small' },
  { id: 'bangles', name: 'Bangles', slug: 'bangles', shortDescription: 'Intricately designed bangle sets.', description: '', image: C.bangles, bannerImage: C.bangles, productCount: 7, size: 'small' },
  { id: 'bracelets', name: 'Gold Bracelets', slug: 'gold-bracelets', shortDescription: 'Refined designs for the wrist.', description: '', image: C.bracelets, bannerImage: C.bracelets, productCount: 7, size: 'medium' },
  { id: 'earrings', name: 'Gold Earrings', slug: 'earrings', shortDescription: 'Traditional and modern gold earrings.', description: '', image: C.earrings, bannerImage: C.earrings, productCount: 7, size: 'small' },
  { id: 'pendants', name: 'Gold Pendants', slug: 'gold-pendants', shortDescription: 'Meaningful motifs in gold.', description: '', image: C.pendants, bannerImage: C.pendants, productCount: 5, size: 'small' },
  { id: 'silver', name: 'Silver Bracelets', slug: 'silver-bracelets', shortDescription: 'Elegant silver for everyday wear.', description: '', image: C.silver, bannerImage: C.silver, productCount: 3, size: 'medium' },
];

const P = STORE_PHOTOS.products;

export const FEATURED_PRODUCTS: Product[] = [
  { id: 'p2', slug: 'traditional-gold-necklace', name: 'Traditional Gold Necklace', category: 'Gold Necklaces', categorySlug: 'gold-necklaces', weight: '22.5g', weightGrams: 22.5, purity: '22K', price: '₹1,53,075', images: [P.traditionalNecklace], description: 'A statement traditional necklace.', isAvailable: true },
  { id: 'p4', slug: 'sunburst-drop-earrings', name: 'Sunburst Drop Earrings', category: 'Gold Earrings', categorySlug: 'earrings', weight: '9.6g', weightGrams: 9.6, purity: '22K', price: '₹65,376', images: [P.earringsSunburst], description: 'Ornate circular drop earrings with latkan fringe in 22K gold.', isAvailable: true },
  { id: 'p5', slug: 'red-gold-pair-bangles', name: 'Red & Gold Pair Bangles', category: 'Bangles', categorySlug: 'bangles', weight: '40.0g', weightGrams: 40, purity: '22K', price: '₹2,72,400', images: [P.banglesRedGoldPairs], description: 'Traditional red and gold pair bangles with ornate gold bands.', isNewArrival: true, isAvailable: true },
  { id: 'p6', slug: 'wheat-braid-chain', name: 'Wheat Braid Chain', category: 'Gold Chains', categorySlug: 'gold-chains', weight: '16.0g', weightGrams: 16, purity: '22K', price: '₹1,08,960', images: [P.chainWheatBraid], description: 'A bold wheat-braid chain in 22K gold.', isAvailable: true },
  { id: 'p8', slug: 'classic-bridal-set', name: 'Classic Bridal Set', category: 'Bridal Collection', categorySlug: 'bridal-collection', weight: '72.0g', weightGrams: 72, purity: '22K', price: '₹4,90,320', images: [P.bridalBibSet], description: 'A classic bridal necklace set with matching earrings.', isNewArrival: true, isAvailable: true },
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

export const GALLERY_IMAGES: GalleryImage[] = [...STORE_PHOTOS.gallery];
