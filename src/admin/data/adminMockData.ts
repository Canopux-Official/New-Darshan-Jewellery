import type {
  AdminProduct, AdminCategory, Banner,
  AdminRates, AdminGalleryImage, AdminTestimonial,
  Offer, Activity, StoreSettings,
} from '../types/admin';

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&q=80`;

// ─── Products ──────────────────────────────────────────────────
export const adminProducts: AdminProduct[] = [
  { id: 'r1', slug: 'sunburst-solitaire-ring', name: 'Sunburst Solitaire Ring', category: 'Gold Rings', categorySlug: 'gold-rings', purity: '22K', weight: '4.2g', price: '₹28,566', images: [u('1605100804763-247f67b3557e')], description: 'A radiant sunburst design in 22K gold.', makingStyle: 'Hand engraved', isNewArrival: true, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-06-01', updatedAt: '2026-07-10' },
  { id: 'n1', slug: 'heritage-polki-necklace', name: 'Heritage Polki Necklace', category: 'Necklaces', categorySlug: 'necklaces', purity: '22K', weight: '22.5g', price: '₹1,53,225', images: [u('1599643478518-a784e5dc4c8f')], description: 'A statement polki necklace with uncut diamonds.', makingStyle: 'Traditional polki', isNewArrival: false, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-05-15', updatedAt: '2026-07-08' },
  { id: 'b1', slug: 'maharani-bangle-set', name: 'Maharani Bangle Set', category: 'Bangles', categorySlug: 'bangles', purity: '22K', weight: '32.0g', price: '₹2,17,984', images: [u('1611591437281-460bfbe1220a')], description: 'A set of six bangles in 22K gold.', makingStyle: 'Die-struck', isNewArrival: true, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-06-20', updatedAt: '2026-07-12' },
  { id: 'e1', slug: 'classic-jhumka-earrings', name: 'Classic Jhumka Earrings', category: 'Earrings', categorySlug: 'earrings', purity: '22K', weight: '6.1g', price: '₹41,543', images: [u('1630019852942-f89202989a59')], description: 'Traditional jhumkas with beaded border.', makingStyle: 'Hand-crafted', isNewArrival: false, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-04-10', updatedAt: '2026-07-01' },
  { id: 'br1', slug: 'twisted-rope-bracelet', name: 'Twisted Rope Bracelet', category: 'Bracelets', categorySlug: 'bracelets', purity: '18K', weight: '8.8g', price: '₹48,972', images: [u('1573408301185-9519f94de11e')], description: 'A bold twisted rope bracelet in 18K gold.', makingStyle: 'Rope-twist', isNewArrival: true, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-07-01', updatedAt: '2026-07-13' },
  { id: 'bc1', slug: 'bridal-choker-set', name: 'Bridal Choker Set', category: 'Bridal Collection', categorySlug: 'bridal-collection', purity: '22K', weight: '65.0g', price: '₹4,42,650', images: [u('1583391733956-6c78276477e2')], description: 'Complete bridal choker set.', makingStyle: 'Kundan setting', isNewArrival: false, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-03-01', updatedAt: '2026-07-05' },
  { id: 'c1', slug: 'figaro-chain', name: 'Figaro Chain', category: 'Chains', categorySlug: 'chains', purity: '22K', weight: '11.3g', price: '₹76,943', images: [u('1515562141207-7a88fb7ce338')], description: 'Classic figaro pattern chain in 22K gold.', makingStyle: 'Machine-woven', isNewArrival: false, isFeatured: false, isAvailable: true, isHidden: false, createdAt: '2026-02-14', updatedAt: '2026-06-20' },
  { id: 't1', slug: 'temple-necklace-set', name: 'Temple Necklace Set', category: 'Temple Jewellery', categorySlug: 'temple-jewellery', purity: '22K', weight: '38.0g', price: '₹2,58,894', images: [u('1535632066927-ab7c9ab60908')], description: 'Traditional temple necklace set.', makingStyle: 'Temple work', isNewArrival: false, isFeatured: true, isAvailable: true, isHidden: true, createdAt: '2026-01-20', updatedAt: '2026-07-09' },
  { id: 'r5', slug: 'bridal-kundan-ring', name: 'Bridal Kundan Ring', category: 'Gold Rings', categorySlug: 'gold-rings', purity: '22K', weight: '7.2g', price: '₹49,018', images: [u('1543294001-f7cd5d7fb516')], description: 'Set with traditional kundan stones.', makingStyle: 'Kundan setting', isNewArrival: true, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-07-05', updatedAt: '2026-07-14' },
  { id: 'm1', slug: 'traditional-mangalsutra', name: 'Traditional Mangalsutra', category: 'Mangalsutra', categorySlug: 'mangalsutra', purity: '22K', weight: '12.5g', price: '₹85,138', images: [u('1617038260897-41a1f14a8ca0')], description: 'Traditional mangalsutra with Lakshmi pendant.', makingStyle: 'Cast pendant', isNewArrival: false, isFeatured: true, isAvailable: true, isHidden: false, createdAt: '2026-05-01', updatedAt: '2026-07-02' },
];

// ─── Categories ────────────────────────────────────────────────
export const adminCategories: AdminCategory[] = [
  { id: 'rings', name: 'Gold Rings', slug: 'gold-rings', productCount: 5, isActive: true, createdAt: '2026-01-01' },
  { id: 'necklaces', name: 'Necklaces', slug: 'necklaces', productCount: 5, isActive: true, createdAt: '2026-01-01' },
  { id: 'chains', name: 'Chains', slug: 'chains', productCount: 4, isActive: true, createdAt: '2026-01-01' },
  { id: 'bangles', name: 'Bangles', slug: 'bangles', productCount: 4, isActive: true, createdAt: '2026-01-01' },
  { id: 'bracelets', name: 'Bracelets', slug: 'bracelets', productCount: 4, isActive: true, createdAt: '2026-01-01' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings', productCount: 5, isActive: true, createdAt: '2026-01-01' },
  { id: 'pendants', name: 'Pendants', slug: 'pendants', productCount: 3, isActive: true, createdAt: '2026-01-01' },
  { id: 'mangalsutra', name: 'Mangalsutra', slug: 'mangalsutra', productCount: 3, isActive: true, createdAt: '2026-01-01' },
  { id: 'bridal', name: 'Bridal Collection', slug: 'bridal-collection', productCount: 4, isActive: true, createdAt: '2026-01-01' },
  { id: 'temple', name: 'Temple Jewellery', slug: 'temple-jewellery', productCount: 3, isActive: true, createdAt: '2026-01-01' },
  { id: 'kids', name: 'Kids Collection', slug: 'kids-collection', productCount: 3, isActive: false, createdAt: '2026-03-01' },
  { id: 'coins', name: 'Coins', slug: 'coins', productCount: 2, isActive: true, createdAt: '2026-02-01' },
];

// ─── Banners ───────────────────────────────────────────────────
export const banners: Banner[] = [
  { id: 'b1', title: 'Bridal Collection 2026', subtitle: 'Heirlooms for your most sacred day', image: u('1583391733956-6c78276477e2'), isActive: true, order: 1 },
  { id: 'b2', title: 'Temple Jewellery', subtitle: 'Divine heritage in 22K gold', image: u('1535632066927-ab7c9ab60908'), isActive: true, order: 2 },
  { id: 'b3', title: 'New Arrivals', subtitle: 'Fresh designs, hallmarked purity', image: u('1617038260897-41a1f14a8ca0'), isActive: false, order: 3 },
];

// ─── Rates ─────────────────────────────────────────────────────
export const defaultRates: AdminRates = {
  gold24k: '7420',
  gold22k: '6803',
  gold18k: '5565',
  silver: '94',
  lastUpdated: 'Today, 10:00 AM',
};

// ─── Gallery ───────────────────────────────────────────────────
export const galleryImages: AdminGalleryImage[] = [
  { id: 'g1', src: u('1605100804763-247f67b3557e'), alt: 'Gold ring', uploadedAt: '2026-07-10' },
  { id: 'g2', src: u('1599643478518-a784e5dc4c8f'), alt: 'Necklace', uploadedAt: '2026-07-09' },
  { id: 'g3', src: u('1515562141207-7a88fb7ce338'), alt: 'Chain', uploadedAt: '2026-07-08' },
  { id: 'g4', src: u('1611591437281-460bfbe1220a'), alt: 'Bangles', uploadedAt: '2026-07-07' },
  { id: 'g5', src: u('1573408301185-9519f94de11e'), alt: 'Bracelet', uploadedAt: '2026-07-05' },
  { id: 'g6', src: u('1630019852942-f89202989a59'), alt: 'Earrings', uploadedAt: '2026-07-03' },
  { id: 'g7', src: u('1506630448388-4e683c67ddb0'), alt: 'Floral studs', uploadedAt: '2026-07-01' },
  { id: 'g8', src: u('1543294001-f7cd5d7fb516'), alt: 'Diamond ring', uploadedAt: '2026-06-28' },
  { id: 'g9', src: u('1617038260897-41a1f14a8ca0'), alt: 'Jewellery flat lay', uploadedAt: '2026-06-25' },
];

// ─── Testimonials ──────────────────────────────────────────────
export const adminTestimonials: AdminTestimonial[] = [
  { id: 't1', name: 'Meera Patel', city: 'Ahmedabad', quote: 'The necklace I purchased for my daughter\'s wedding was beyond exquisite.', rating: 5, isApproved: true, createdAt: '2026-06-15' },
  { id: 't2', name: 'Priya Sharma', city: 'Mumbai', quote: 'What sets Krishna Jewellers apart is not just the quality of gold, but the artistry.', rating: 5, isApproved: true, createdAt: '2026-06-10' },
  { id: 't3', name: 'Sunita Desai', city: 'Surat', quote: 'Three generations of our family have trusted Krishna Jewellers.', rating: 5, isApproved: true, createdAt: '2026-05-28' },
  { id: 't4', name: 'Rina Joshi', city: 'Vadodara', quote: 'The bridal set was exquisite and the service was so personal and warm.', rating: 4, isApproved: false, createdAt: '2026-07-12' },
];

// ─── Offers ────────────────────────────────────────────────────
export const offers: Offer[] = [
  { id: 'o1', title: 'Akshaya Tritiya Special', description: 'Get 0% making charges on all gold coins above 5g.', status: 'active', startDate: '2026-07-01', endDate: '2026-07-31' },
  { id: 'o2', title: 'Bridal Season Offer', description: '5% discount on complete bridal sets above ₹3L.', status: 'active', startDate: '2026-06-15', endDate: '2026-09-15' },
  { id: 'o3', title: 'Diwali Collection Preview', description: 'Early access to Diwali 2026 collection for registered customers.', status: 'scheduled', startDate: '2026-10-01', endDate: '2026-10-20' },
  { id: 'o4', title: 'New Year Sale', description: 'Flat ₹1,000 off on all silver items.', status: 'expired', startDate: '2026-01-01', endDate: '2026-01-15' },
];

// ─── Activity ──────────────────────────────────────────────────
export const recentActivity: Activity[] = [
  { id: 'a1', type: 'product', action: 'Product added', detail: 'Bridal Kundan Ring added to Gold Rings', timestamp: '14 Jul, 9:42 AM' },
  { id: 'a2', type: 'rate', action: 'Rates updated', detail: '24K: ₹7,420 · 22K: ₹6,803', timestamp: '14 Jul, 10:00 AM' },
  { id: 'a3', type: 'gallery', action: 'Gallery uploaded', detail: '3 new images added to gallery', timestamp: '13 Jul, 4:15 PM' },
  { id: 'a4', type: 'offer', action: 'Offer activated', detail: '"Akshaya Tritiya Special" is now live', timestamp: '13 Jul, 11:00 AM' },
  { id: 'a5', type: 'testimonial', action: 'Review pending', detail: 'New review from Rina Joshi awaiting approval', timestamp: '12 Jul, 7:30 PM' },
  { id: 'a6', type: 'product', action: 'Product hidden', detail: 'Temple Necklace Set marked as hidden', timestamp: '12 Jul, 2:00 PM' },
];

// ─── Settings ──────────────────────────────────────────────────
export const defaultSettings: StoreSettings = {
  adminName: 'Rameshbhai Patel',
  email: 'admin@krishnajewellers.in',
  storeName: 'Krishna Jewellers',
  address: 'Shop No. 12, Main Bazaar, Anand, Gujarat — 388001',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  weekdayHours: '10:00 AM – 8:00 PM',
  sundayHours: '11:00 AM – 6:00 PM',
  instagramUrl: '',
  facebookUrl: '',
  googleMapsUrl: '',
};
