import { PrismaClient, Purity, OfferStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const STORE_ADDRESS =
  'New Darshan Jewellery\nMain Road\nNear Thana Chhak\nGhasipura\nAnandapur\nKeonjhar\nOdisha – 758015';

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Admin User ──────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL || 'admin@krishnajewellers.in';
  const password = process.env.ADMIN_PASSWORD || 'Admin@1234';
  const name = process.env.ADMIN_NAME || 'Store Admin';

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({ data: { email, passwordHash, name } });
    console.log(`✅ Admin user created: ${email}`);
  } else {
    console.log(`ℹ️  Admin user already exists: ${email}`);
  }

  // ─── Categories ──────────────────────────────────────────────
  const categories = [
    { name: 'Bridal Collection', slug: 'bridal-collection' },
    { name: 'Gold Necklaces', slug: 'gold-necklaces' },
    { name: 'Gold Chains', slug: 'gold-chains' },
    { name: 'Gold Rings', slug: 'gold-rings' },
    { name: 'Bangles', slug: 'bangles' },
    { name: 'Bracelets', slug: 'bracelets' },
    { name: 'Earrings', slug: 'earrings' },
    { name: 'Pendants', slug: 'pendants' },
    { name: 'Temple Jewellery', slug: 'temple-jewellery' },
    { name: 'Mangalsutra', slug: 'mangalsutra' },
    { name: 'Silver Collection', slug: 'silver-collection' },
    { name: 'Kids Collection', slug: 'kids-collection' },
    { name: 'Daily Wear Collection', slug: 'daily-wear-collection' },
    { name: 'Coins', slug: 'coins' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, isActive: true },
      create: { name: cat.name, slug: cat.slug, isActive: true },
    });
  }
  console.log(`✅ ${categories.length} categories seeded`);

  // ─── Gold Rates ──────────────────────────────────────────────
  const rateCount = await prisma.goldRate.count();
  if (rateCount === 0) {
    await prisma.goldRate.create({ data: { gold24k: 7420, gold22k: 6803, gold18k: 5565, silver: 94 } });
    console.log('✅ Initial gold rates seeded');
  }

  // ─── Store Settings (always update branding) ─────────────────
  const existingSettings = await prisma.storeSettings.findFirst();
  const settingsData = {
    storeName: 'New Darshan Jewellery',
    adminName: name,
    email,
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    address: STORE_ADDRESS,
    weekdayHours: '10:00 AM – 9:00 PM',
    sundayHours: '10:00 AM – 9:00 PM',
    googleMapsUrl: 'https://maps.google.com',
  };

  if (existingSettings) {
    await prisma.storeSettings.update({
      where: { id: existingSettings.id },
      data: settingsData,
    });
    console.log('✅ Store settings updated');
  } else {
    await prisma.storeSettings.create({ data: settingsData });
    console.log('✅ Store settings seeded');
  }

  // ─── Hero Banners ────────────────────────────────────────────
  const bannerCount = await prisma.heroBanner.count();
  if (bannerCount === 0) {
    await prisma.heroBanner.createMany({
      data: [
        { title: 'Bridal Collection 2026', subtitle: 'Heirlooms for your most sacred day', imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1800&q=85', isActive: true, order: 1 },
        { title: 'Temple Jewellery', subtitle: 'Divine heritage in 22K gold', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1800&q=85', isActive: true, order: 2 },
        { title: 'New Arrivals', subtitle: 'Fresh designs, hallmarked purity', imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1800&q=85', isActive: false, order: 3 },
      ],
    });
    console.log('✅ Hero banners seeded');
  }

  // ─── Gallery ─────────────────────────────────────────────────
  const galleryCount = await prisma.galleryImage.count();
  if (galleryCount === 0) {
    const galleryImages = [
      { url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', alt: 'Gold ring' },
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', alt: 'Necklace' },
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', alt: 'Chain' },
      { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80', alt: 'Bangles' },
      { url: 'https://images.unsplash.com/photo-1573408301185-9519f94de11e?w=600&q=80', alt: 'Bracelet' },
      { url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80', alt: 'Earrings' },
    ];
    await prisma.galleryImage.createMany({ data: galleryImages.map((g, i) => ({ ...g, order: i })) });
    console.log('✅ Gallery images seeded');
  }

  // ─── Testimonials (refresh branding quotes) ──────────────────
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      { name: 'Priyanka Mishra', city: 'Ghasipura', quote: 'Beautiful jewellery collection and very polite staff. Highly recommended.', rating: 5, isApproved: true },
      { name: 'Satyabrata Nayak', city: 'Anandapur', quote: 'Excellent craftsmanship and transparent pricing. We purchased our wedding jewellery here.', rating: 5, isApproved: true },
      { name: 'Ananya Das', city: 'Keonjhar', quote: 'Trusted jewellery shop in Ghasipura with a wide variety of designs.', rating: 5, isApproved: true },
    ],
  });
  console.log('✅ Testimonials seeded');

  // ─── Offers ──────────────────────────────────────────────────
  const offerCount = await prisma.offer.count();
  if (offerCount === 0) {
    await prisma.offer.createMany({
      data: [
        { title: 'Akshaya Tritiya Special', description: 'Get 0% making charges on all gold coins above 5g.', status: OfferStatus.ACTIVE, startDate: new Date('2026-07-01'), endDate: new Date('2026-07-31') },
        { title: 'Bridal Season Offer', description: '5% discount on complete bridal sets above ₹3L.', status: OfferStatus.ACTIVE, startDate: new Date('2026-06-15'), endDate: new Date('2026-09-15') },
      ],
    });
    console.log('✅ Offers seeded');
  }

  // ─── Sample Products ─────────────────────────────────────────
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    const ringsCategory = await prisma.category.findUnique({ where: { slug: 'gold-rings' } });
    const necklacesCategory = await prisma.category.findUnique({ where: { slug: 'gold-necklaces' } });
    if (ringsCategory) {
      const ring = await prisma.product.create({
        data: { slug: 'floral-gold-ring', name: 'Floral Gold Ring', categoryId: ringsCategory.id, purity: Purity.KARAT_22, weight: '4.2g', weightGrams: 4.2, price: '₹28,566', priceValue: 28566, description: 'A radiant floral design set in 22K gold.', makingStyle: 'Machine-finished with hand engraving', isNewArrival: true, isFeatured: true, isAvailable: true },
      });
      await prisma.productImage.create({ data: { productId: ring.id, url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', order: 0 } });
    }
    if (necklacesCategory) {
      const necklace = await prisma.product.create({
        data: { slug: 'traditional-gold-necklace', name: 'Traditional Gold Necklace', categoryId: necklacesCategory.id, purity: Purity.KARAT_22, weight: '22.5g', weightGrams: 22.5, price: '₹1,53,225', priceValue: 153225, description: 'A traditional gold necklace finished in 22K gold.', makingStyle: 'Hand-finished traditional work', isFeatured: true, isAvailable: true },
      });
      await prisma.productImage.create({ data: { productId: necklace.id, url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', order: 0 } });
    }
    console.log('✅ Sample products seeded');
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
