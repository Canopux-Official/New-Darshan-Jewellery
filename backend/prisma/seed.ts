import { PrismaClient, Purity, OfferStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Admin User ──────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL || 'admin@krishnajewellers.in';
  const password = process.env.ADMIN_PASSWORD || 'Admin@1234';
  const name = process.env.ADMIN_NAME || 'Rameshbhai Patel';

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
    { name: 'Gold Rings', slug: 'gold-rings' },
    { name: 'Necklaces', slug: 'necklaces' },
    { name: 'Chains', slug: 'chains' },
    { name: 'Bangles', slug: 'bangles' },
    { name: 'Bracelets', slug: 'bracelets' },
    { name: 'Earrings', slug: 'earrings' },
    { name: 'Pendants', slug: 'pendants' },
    { name: 'Mangalsutra', slug: 'mangalsutra' },
    { name: 'Bridal Collection', slug: 'bridal-collection' },
    { name: 'Temple Jewellery', slug: 'temple-jewellery' },
    { name: 'Kids Collection', slug: 'kids-collection', isActive: false },
    { name: 'Coins', slug: 'coins' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug, isActive: cat.isActive ?? true },
    });
  }
  console.log(`✅ ${categories.length} categories seeded`);

  // ─── Gold Rates ──────────────────────────────────────────────
  const rateCount = await prisma.goldRate.count();
  if (rateCount === 0) {
    await prisma.goldRate.create({ data: { gold24k: 7420, gold22k: 6803, gold18k: 5565, silver: 94 } });
    console.log('✅ Initial gold rates seeded');
  }

  // ─── Store Settings ──────────────────────────────────────────
  const settingsCount = await prisma.storeSettings.count();
  if (settingsCount === 0) {
    await prisma.storeSettings.create({
      data: {
        storeName: 'Krishna Jewellers',
        adminName: name,
        email,
        phone: '+91 98765 43210',
        whatsapp: '919876543210',
        address: '12, Heritage Lane, Ahmedabad, Gujarat 380001',
        weekdayHours: '10:00 AM – 8:00 PM',
        sundayHours: '11:00 AM – 6:00 PM',
        googleMapsUrl: 'https://maps.google.com',
      },
    });
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

  // ─── Testimonials ────────────────────────────────────────────
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        { name: 'Meera Patel', city: 'Ahmedabad', quote: "The necklace I purchased for my daughter's wedding was beyond exquisite.", rating: 5, isApproved: true },
        { name: 'Priya Sharma', city: 'Mumbai', quote: 'What sets Krishna Jewellers apart is not just the quality of gold, but the artistry.', rating: 5, isApproved: true },
        { name: 'Sunita Desai', city: 'Surat', quote: 'Three generations of our family have trusted Krishna Jewellers.', rating: 5, isApproved: true },
      ],
    });
    console.log('✅ Testimonials seeded');
  }

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
    const necklacesCategory = await prisma.category.findUnique({ where: { slug: 'necklaces' } });
    if (ringsCategory) {
      const ring = await prisma.product.create({
        data: { slug: 'sunburst-solitaire-ring', name: 'Sunburst Solitaire Ring', categoryId: ringsCategory.id, purity: Purity.KARAT_22, weight: '4.2g', weightGrams: 4.2, price: '₹28,566', priceValue: 28566, description: 'A radiant sunburst design set with a central stone in 22K gold.', makingStyle: 'Machine-finished with hand engraving', isNewArrival: true, isFeatured: true, isAvailable: true },
      });
      await prisma.productImage.create({ data: { productId: ring.id, url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', order: 0 } });
    }
    if (necklacesCategory) {
      const necklace = await prisma.product.create({
        data: { slug: 'heritage-polki-necklace', name: 'Heritage Polki Necklace', categoryId: necklacesCategory.id, purity: Purity.KARAT_22, weight: '22.5g', weightGrams: 22.5, price: '₹1,53,225', priceValue: 153225, description: 'A statement polki necklace with uncut diamonds in 22K gold.', makingStyle: 'Traditional polki setting', isFeatured: true, isAvailable: true },
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
