import type { Product } from '../types';

const u = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

// ─── Image pools per category ───────────────────────────────────
const IMG = {
  ring:       [u('1605100804763-247f67b3557e'), u('1543294001-f7cd5d7fb516'), u('1506630448388-4e683c67ddb0')],
  necklace:   [u('1599643478518-a784e5dc4c8f'), u('1535632066927-ab7c9ab60908'), u('1515562141207-7a88fb7ce338')],
  chain:      [u('1515562141207-7a88fb7ce338'), u('1617038260897-41a1f14a8ca0'), u('1599643478518-a784e5dc4c8f')],
  bangle:     [u('1611591437281-460bfbe1220a'), u('1617038260897-41a1f14a8ca0'), u('1573408301185-9519f94de11e')],
  bracelet:   [u('1573408301185-9519f94de11e'), u('1506630448388-4e683c67ddb0'), u('1611591437281-460bfbe1220a')],
  earring:    [u('1630019852942-f89202989a59'), u('1506630448388-4e683c67ddb0'), u('1617038260897-41a1f14a8ca0')],
  pendant:    [u('1543294001-f7cd5d7fb516'), u('1605100804763-247f67b3557e'), u('1617038260897-41a1f14a8ca0')],
  mangal:     [u('1599643478518-a784e5dc4c8f'), u('1617038260897-41a1f14a8ca0'), u('1535632066927-ab7c9ab60908')],
  bridal:     [u('1583391733956-6c78276477e2'), u('1610375461246-83df859d849d'), u('1535632066927-ab7c9ab60908')],
  temple:     [u('1535632066927-ab7c9ab60908'), u('1599643478518-a784e5dc4c8f'), u('1617038260897-41a1f14a8ca0')],
  kids:       [u('1506630448388-4e683c67ddb0'), u('1630019852942-f89202989a59'), u('1605100804763-247f67b3557e')],
  coin:       [u('1617038260897-41a1f14a8ca0'), u('1605100804763-247f67b3557e'), u('1515562141207-7a88fb7ce338')],
};

export const PRODUCTS: Product[] = [
  // ─── Gold Rings ──────────────────────────────────────
  {
    id: 'r1', slug: 'floral-gold-ring',
    name: 'Floral Gold Ring', category: 'Gold Rings', categorySlug: 'gold-rings',
    purity: '22K', weight: '4.2g', weightGrams: 4.2, price: '₹28,566', priceValue: 28566,
    images: IMG.ring,
    description: 'A radiant sunburst design set with a central stone, finished in 22K gold. The textured band catches light beautifully at every angle.',
    makingStyle: 'Machine-finished with hand engraving',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['rings', 'solitaire', 'gold'],
  },
  {
    id: 'r2', slug: 'classic-dome-ring',
    name: 'Classic Dome Ring', category: 'Gold Rings', categorySlug: 'gold-rings',
    purity: '22K', weight: '5.8g', weightGrams: 5.8, price: '₹39,514', priceValue: 39514,
    images: IMG.ring.slice().reverse(),
    description: 'A timeless dome-shaped band with a high-polish finish. An everyday classic that transitions seamlessly from morning to evening.',
    makingStyle: 'Die-struck, hand-polished',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['rings', 'classic', 'everyday'],
  },
  {
    id: 'r3', slug: 'floral-filigree-ring',
    name: 'Floral Filigree Ring', category: 'Gold Rings', categorySlug: 'gold-rings',
    purity: '22K', weight: '3.9g', weightGrams: 3.9, price: '₹26,559', priceValue: 26559,
    images: IMG.ring,
    description: 'Delicate filigree petals form a floral crown atop a slender 22K band. A masterpiece of the goldsmith\'s patience.',
    makingStyle: 'Hand-crafted filigree',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['rings', 'filigree', 'floral'],
  },
  {
    id: 'r4', slug: 'twisted-band-ring',
    name: 'Twisted Band Ring', category: 'Gold Rings', categorySlug: 'gold-rings',
    purity: '18K', weight: '4.5g', weightGrams: 4.5, price: '₹25,043', priceValue: 25043,
    images: IMG.ring.slice().reverse(),
    description: 'A contemporary twisted rope band in 18K gold. Clean lines with subtle texture — suited for those who prefer understated elegance.',
    makingStyle: 'Rope-twist machine finish',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['rings', 'contemporary', '18k'],
  },
  {
    id: 'r5', slug: 'bridal-kundan-ring',
    name: 'Bridal Kundan Ring', category: 'Gold Rings', categorySlug: 'gold-rings',
    purity: '22K', weight: '7.2g', weightGrams: 7.2, price: '₹49,018', priceValue: 49018,
    images: IMG.ring,
    description: 'Set with traditional kundan stones and finished in 22K gold, this ring is crafted to be a treasured part of your bridal trousseau.',
    makingStyle: 'Kundan setting, hand-finished',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['rings', 'bridal', 'kundan'],
  },

  // ─── Necklaces ───────────────────────────────────────
  {
    id: 'n1', slug: 'traditional-gold-necklace',
    name: 'Traditional Gold Necklace', category: 'Gold Necklaces', categorySlug: 'gold-necklaces',
    purity: '22K', weight: '22.5g', weightGrams: 22.5, price: '₹1,53,225', priceValue: 153225,
    images: IMG.necklace,
    description: 'A traditional gold necklace finished in 22K gold. A statement piece for weddings and festivals.',
    makingStyle: 'Hand-finished traditional work',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['necklaces', 'traditional', 'bridal', 'statement'],
  },
  {
    id: 'n2', slug: 'classic-bridal-haram',
    name: 'Classic Bridal Haram', category: 'Gold Necklaces', categorySlug: 'gold-necklaces',
    purity: '22K', weight: '45.0g', weightGrams: 45.0, price: '₹3,06,450', priceValue: 306450,
    images: IMG.necklace.slice().reverse(),
    description: 'A long traditional haram inspired by temple jewellery, featuring Lakshmi coins and floral motifs. A centrepiece for weddings and festivals.',
    makingStyle: 'Hand-crafted temple work',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['necklaces', 'temple', 'haram', 'statement'],
  },
  {
    id: 'n3', slug: 'floral-gold-necklace',
    name: 'Floral Gold Necklace', category: 'Gold Necklaces', categorySlug: 'gold-necklaces',
    purity: '22K', weight: '18.3g', weightGrams: 18.3, price: '₹1,24,603', priceValue: 124603,
    images: IMG.necklace,
    description: 'A layered floral necklace with petal motifs graduating in size. Versatile enough for festive occasions and formal evenings alike.',
    makingStyle: 'Die-struck with hand engraving',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['necklaces', 'floral', 'festive'],
  },
  {
    id: 'n4', slug: 'diamond-cut-necklace',
    name: 'Diamond Cut Necklace', category: 'Gold Necklaces', categorySlug: 'gold-necklaces',
    purity: '18K', weight: '14.8g', weightGrams: 14.8, price: '₹82,388', priceValue: 82388,
    images: IMG.necklace.slice().reverse(),
    description: 'A contemporary necklace featuring diamond-cut links that catch and scatter light. Refined enough for everyday luxury.',
    makingStyle: 'Diamond-cut machine finish',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['necklaces', 'contemporary', '18k'],
  },
  {
    id: 'n5', slug: 'layered-rani-haar',
    name: 'Layered Rani Haar', category: 'Gold Necklaces', categorySlug: 'gold-necklaces',
    purity: '22K', weight: '52.0g', weightGrams: 52.0, price: '₹3,54,120', priceValue: 354120,
    images: IMG.necklace,
    description: 'A multi-layered rani haar with intricate medallion pendants in 22K gold. A grand statement piece for weddings and sangeet ceremonies.',
    makingStyle: 'Hand-crafted, multi-layer assembly',
    isNewArrival: true, isFeatured: true, isAvailable: false,
    tags: ['necklaces', 'rani-haar', 'bridal', 'statement'],
  },

  // ─── Chains ──────────────────────────────────────────
  {
    id: 'c1', slug: 'lightweight-daily-wear-chain',
    name: 'Lightweight Daily Wear Chain', category: 'Gold Chains', categorySlug: 'gold-chains',
    purity: '22K', weight: '11.3g', weightGrams: 11.3, price: '₹76,943', priceValue: 76943,
    images: IMG.chain,
    description: 'A lightweight daily wear chain in 22K gold — comfortable for everyday use and ideal with or without a pendant.',
    makingStyle: 'Machine-woven, hand-finished',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['chains', 'daily-wear', 'classic'],
  },
  {
    id: 'c2', slug: 'singapore-chain',
    name: 'Singapore Chain', category: 'Gold Chains', categorySlug: 'gold-chains',
    purity: '22K', weight: '8.6g', weightGrams: 8.6, price: '₹58,558', priceValue: 58558,
    images: IMG.chain.slice().reverse(),
    description: 'A twisted herringbone pattern gives this chain a distinctive look. Light, flexible and ideal for everyday wear with or without a pendant.',
    makingStyle: 'Machine-woven',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['chains', 'singapore', 'everyday'],
  },
  {
    id: 'c3', slug: 'box-chain',
    name: 'Box Chain', category: 'Gold Chains', categorySlug: 'gold-chains',
    purity: '18K', weight: '7.2g', weightGrams: 7.2, price: '₹40,068', priceValue: 40068,
    images: IMG.chain,
    description: 'Square links connected at right angles create a clean, geometric chain. Pairs beautifully with a minimal pendant.',
    makingStyle: 'Machine-woven, laser-welded',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['chains', 'box', 'geometric', '18k'],
  },
  {
    id: 'c4', slug: 'rope-chain',
    name: 'Classic Rope Chain', category: 'Gold Chains', categorySlug: 'gold-chains',
    purity: '22K', weight: '14.5g', weightGrams: 14.5, price: '₹98,755', priceValue: 98755,
    images: IMG.chain.slice().reverse(),
    description: 'A thick, textured rope chain in 22K gold. The twisted segments create a rich, luxurious appearance that stands beautifully on its own.',
    makingStyle: 'Rope-twist, machine-finished',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['chains', 'rope', 'statement'],
  },

  // ─── Bangles ─────────────────────────────────────────
  {
    id: 'b1', slug: 'elegant-gold-bangles',
    name: 'Elegant Gold Bangles', category: 'Bangles', categorySlug: 'bangles',
    purity: '22K', weight: '32.0g', weightGrams: 32.0, price: '₹2,17,984', priceValue: 217984,
    images: IMG.bangle,
    description: 'A set of six bangles with a carved Maharani pattern in 22K gold. Worn as a set, they create a rich, layered sound and visual rhythm.',
    makingStyle: 'Die-struck, hand-engraved',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['bangles', 'set', 'bridal', 'maharani'],
  },
  {
    id: 'b2', slug: 'diamond-cut-bangles',
    name: 'Diamond Cut Bangles', category: 'Bangles', categorySlug: 'bangles',
    purity: '22K', weight: '28.5g', weightGrams: 28.5, price: '₹1,94,153', priceValue: 194153,
    images: IMG.bangle.slice().reverse(),
    description: 'A pair of diamond-cut bangles with a flat profile. The faceted surface creates extraordinary sparkle without the use of any stones.',
    makingStyle: 'Diamond-cut machine finish',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['bangles', 'diamond-cut', 'everyday'],
  },
  {
    id: 'b3', slug: 'plain-gold-bangles',
    name: 'Plain Gold Bangles', category: 'Bangles', categorySlug: 'bangles',
    purity: '24K', weight: '24.0g', weightGrams: 24.0, price: '₹1,78,176', priceValue: 178176,
    images: IMG.bangle,
    description: 'Investment-grade 24K plain gold bangles. Pure, unadorned and timeless — a form of wearable wealth passed down through generations.',
    makingStyle: 'Machine-rolled, seamless',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['bangles', '24k', 'investment', 'plain'],
  },
  {
    id: 'b4', slug: 'kundan-bangle-set',
    name: 'Kundan Bangle Set', category: 'Bangles', categorySlug: 'bangles',
    purity: '22K', weight: '36.0g', weightGrams: 36.0, price: '₹2,45,232', priceValue: 245232,
    images: IMG.bangle.slice().reverse(),
    description: 'A bridal bangle set with kundan stone inlay and meenakari work on the reverse. Each bangle is a miniature work of art.',
    makingStyle: 'Kundan setting, meenakari reverse',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['bangles', 'kundan', 'bridal', 'meenakari'],
  },

  // ─── Bracelets ───────────────────────────────────────
  {
    id: 'br1', slug: 'twisted-rope-bracelet',
    name: 'Twisted Rope Bracelet', category: 'Bracelets', categorySlug: 'bracelets',
    purity: '18K', weight: '8.8g', weightGrams: 8.8, price: '₹48,972', priceValue: 48972,
    images: IMG.bracelet,
    description: 'A bold twisted rope bracelet in 18K gold with a secure box clasp. The tactile texture makes it a pleasure to wear and to hold.',
    makingStyle: 'Rope-twist, box clasp',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['bracelets', 'rope', 'contemporary'],
  },
  {
    id: 'br2', slug: 'tennis-bracelet',
    name: 'Tennis Bracelet', category: 'Bracelets', categorySlug: 'bracelets',
    purity: '18K', weight: '12.5g', weightGrams: 12.5, price: '₹69,563', priceValue: 69563,
    images: IMG.bracelet.slice().reverse(),
    description: 'A single row of channel-set stones in 18K gold. A classic piece of fine jewellery that works as beautifully with sarees as with evening wear.',
    makingStyle: 'Channel setting, fold-over clasp',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['bracelets', 'tennis', 'stones'],
  },
  {
    id: 'br3', slug: 'classic-link-bracelet',
    name: 'Classic Link Bracelet', category: 'Bracelets', categorySlug: 'bracelets',
    purity: '22K', weight: '9.4g', weightGrams: 9.4, price: '₹64,022', priceValue: 64022,
    images: IMG.bracelet,
    description: 'Oval links in alternating matte and polished finish create a refined contrast. A versatile piece suited for everyday wear.',
    makingStyle: 'Die-struck links, hand-finished',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['bracelets', 'link', 'everyday'],
  },
  {
    id: 'br4', slug: 'floral-charm-bracelet',
    name: 'Floral Charm Bracelet', category: 'Bracelets', categorySlug: 'bracelets',
    purity: '18K', weight: '6.8g', weightGrams: 6.8, price: '₹37,842', priceValue: 37842,
    images: IMG.bracelet.slice().reverse(),
    description: 'A delicate chain bracelet with five floral gold charms suspended at even intervals. Light, feminine and crafted to be noticed.',
    makingStyle: 'Hand-crafted charms, machine chain',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['bracelets', 'charm', 'floral', 'lightweight'],
  },

  // ─── Earrings ─────────────────────────────────────────
  {
    id: 'e1', slug: 'designer-earrings',
    name: 'Designer Earrings', category: 'Earrings', categorySlug: 'earrings',
    purity: '22K', weight: '6.1g', weightGrams: 6.1, price: '₹41,543', priceValue: 41543,
    images: IMG.earring,
    description: 'A pair of traditional jhumkas with a beaded border and small hanging pearls at the base. A timeless design that never goes out of fashion.',
    makingStyle: 'Hand-crafted jhumka',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['earrings', 'jhumka', 'traditional'],
  },
  {
    id: 'e2', slug: 'floral-stud-earrings',
    name: 'Floral Stud Earrings', category: 'Earrings', categorySlug: 'earrings',
    purity: '18K', weight: '3.4g', weightGrams: 3.4, price: '₹18,921', priceValue: 18921,
    images: IMG.earring.slice().reverse(),
    description: 'A six-petal floral stud with a high-polish centre. Lightweight and secure — perfect for daily wear.',
    makingStyle: 'Die-struck, push-back',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['earrings', 'studs', 'floral', 'everyday'],
  },
  {
    id: 'e3', slug: 'chandelier-drop-earrings',
    name: 'Chandelier Drop Earrings', category: 'Earrings', categorySlug: 'earrings',
    purity: '22K', weight: '8.9g', weightGrams: 8.9, price: '₹60,627', priceValue: 60627,
    images: IMG.earring,
    description: 'Multi-tiered chandelier drops that catch the light with every movement. A statement piece designed for weddings and formal occasions.',
    makingStyle: 'Multi-tier hand assembly',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['earrings', 'chandelier', 'statement', 'bridal'],
  },
  {
    id: 'e4', slug: 'hoop-earrings',
    name: 'Classic Hoop Earrings', category: 'Earrings', categorySlug: 'earrings',
    purity: '22K', weight: '4.6g', weightGrams: 4.6, price: '₹31,334', priceValue: 31334,
    images: IMG.earring.slice().reverse(),
    description: 'A medium-sized hoop in diamond-cut 22K gold. Versatile, elegant and effortless.',
    makingStyle: 'Diamond-cut, hinged closure',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['earrings', 'hoops', 'everyday'],
  },
  {
    id: 'e5', slug: 'temple-jhumka',
    name: 'Temple Jhumka', category: 'Earrings', categorySlug: 'earrings',
    purity: '22K', weight: '7.2g', weightGrams: 7.2, price: '₹49,018', priceValue: 49018,
    images: IMG.earring,
    description: 'Temple-inspired jhumkas with Goddess Lakshmi motifs on the top plate and a cascading bell dome. A sacred design rendered in pure 22K gold.',
    makingStyle: 'Hand-crafted temple work',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['earrings', 'temple', 'jhumka', 'traditional'],
  },

  // ─── Pendants ────────────────────────────────────────
  {
    id: 'pd1', slug: 'om-pendant',
    name: 'Om Pendant', category: 'Pendants', categorySlug: 'pendants',
    purity: '22K', weight: '3.2g', weightGrams: 3.2, price: '₹21,793', priceValue: 21793,
    images: IMG.pendant,
    description: 'A finely detailed Om symbol in 22K gold with a smooth polished finish. Meaningful, minimal and made to last a lifetime.',
    makingStyle: 'Lost-wax casting, hand-finished',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['pendants', 'om', 'religious'],
  },
  {
    id: 'pd2', slug: 'ganesh-pendant',
    name: 'Ganesh Pendant', category: 'Pendants', categorySlug: 'pendants',
    purity: '22K', weight: '4.8g', weightGrams: 4.8, price: '₹32,688', priceValue: 32688,
    images: IMG.pendant.slice().reverse(),
    description: 'Lord Ganesh rendered in intricate detail in 22K gold. A blessing worn close to the heart — given as gifts at births, graduations and new beginnings.',
    makingStyle: 'Lost-wax casting, hand-engraved details',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['pendants', 'ganesh', 'religious', 'gift'],
  },
  {
    id: 'pd3', slug: 'floral-pendant',
    name: 'Floral Pendant', category: 'Pendants', categorySlug: 'pendants',
    purity: '18K', weight: '2.8g', weightGrams: 2.8, price: '₹15,582', priceValue: 15582,
    images: IMG.pendant,
    description: 'A contemporary floral pendant in 18K gold with textured petals and a smooth centre. Pairs effortlessly with the Singapore chain.',
    makingStyle: 'Die-struck, polished finish',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['pendants', 'floral', 'contemporary'],
  },

  // ─── Mangalsutra ─────────────────────────────────────
  {
    id: 'm1', slug: 'traditional-mangalsutra',
    name: 'Traditional Mangalsutra', category: 'Mangalsutra', categorySlug: 'mangalsutra',
    purity: '22K', weight: '12.5g', weightGrams: 12.5, price: '₹85,138', priceValue: 85138,
    images: IMG.mangal,
    description: 'A traditional two-stranded black bead mangalsutra with a Lakshmi pendant in 22K gold. Crafted to honour the sacred bond of marriage.',
    makingStyle: 'Hand-strung black beads, cast pendant',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['mangalsutra', 'traditional', 'bridal'],
  },
  {
    id: 'm2', slug: 'modern-mangalsutra',
    name: 'Modern Mangalsutra', category: 'Mangalsutra', categorySlug: 'mangalsutra',
    purity: '18K', weight: '8.4g', weightGrams: 8.4, price: '₹46,758', priceValue: 46758,
    images: IMG.mangal.slice().reverse(),
    description: 'A contemporary interpretation — thin chain, minimal black beads and a geometric gold pendant. Designed for the modern Indian bride.',
    makingStyle: 'Machine chain, cast pendant',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['mangalsutra', 'modern', 'contemporary'],
  },
  {
    id: 'm3', slug: 'diamond-mangalsutra',
    name: 'Diamond Mangalsutra', category: 'Mangalsutra', categorySlug: 'mangalsutra',
    purity: '18K', weight: '10.2g', weightGrams: 10.2, price: '₹56,763', priceValue: 56763,
    images: IMG.mangal,
    description: 'An elegant mangalsutra featuring a diamond-studded pendant in 18K gold. A marriage of tradition and contemporary luxury.',
    makingStyle: 'Prong-set diamonds, machine chain',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['mangalsutra', 'diamond', 'bridal'],
  },

  // ─── Bridal Collection ───────────────────────────────
  {
    id: 'bc1', slug: 'wedding-choker',
    name: 'Wedding Choker', category: 'Bridal Collection', categorySlug: 'bridal-collection',
    purity: '22K', weight: '65.0g', weightGrams: 65.0, price: '₹4,42,650', priceValue: 442650,
    images: IMG.bridal,
    description: 'A bridal wedding choker in 22K gold — crafted to be the centrepiece of your most sacred day.',
    makingStyle: 'Hand-finished bridal work',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['bridal', 'choker', 'wedding'],
  },
  {
    id: 'bc2', slug: 'polki-bridal-set',
    name: 'Polki Bridal Set', category: 'Bridal Collection', categorySlug: 'bridal-collection',
    purity: '22K', weight: '85.0g', weightGrams: 85.0, price: '₹5,79,150', priceValue: 579150,
    images: IMG.bridal.slice().reverse(),
    description: 'An heirloom-quality polki bridal set with uncut diamonds and emerald drops in 22K gold. A piece that transcends trends and generations.',
    makingStyle: 'Traditional polki setting, meenakari',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['bridal', 'polki', 'set', 'heirloom'],
  },
  {
    id: 'bc3', slug: 'south-indian-bridal-set',
    name: 'South Indian Bridal Set', category: 'Bridal Collection', categorySlug: 'bridal-collection',
    purity: '22K', weight: '92.0g', weightGrams: 92.0, price: '₹6,26,760', priceValue: 626760,
    images: IMG.bridal,
    description: 'A full South Indian bridal set — long haram, short necklace, earrings, bangles and maang tikka — in 22K gold temple jewellery style.',
    makingStyle: 'Temple jewellery craftsmanship',
    isNewArrival: false, isFeatured: true, isAvailable: false,
    tags: ['bridal', 'south-indian', 'set', 'temple'],
  },
  {
    id: 'bc4', slug: 'contemporary-bridal-set',
    name: 'Contemporary Bridal Set', category: 'Bridal Collection', categorySlug: 'bridal-collection',
    purity: '18K', weight: '55.0g', weightGrams: 55.0, price: '₹3,06,075', priceValue: 306075,
    images: IMG.bridal.slice().reverse(),
    description: 'A modern bridal set for the contemporary bride — clean geometric forms, minimal stone work and a refined aesthetic in 18K gold.',
    makingStyle: 'Modern casting, prong setting',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['bridal', 'contemporary', 'modern', '18k'],
  },

  // ─── Temple Jewellery ────────────────────────────────
  {
    id: 't1', slug: 'temple-necklace-set',
    name: 'Temple Necklace Set', category: 'Temple Jewellery', categorySlug: 'temple-jewellery',
    purity: '22K', weight: '38.0g', weightGrams: 38.0, price: '₹2,58,894', priceValue: 258894,
    images: IMG.temple,
    description: 'A traditional temple necklace set with Goddess Lakshmi and peacock motifs in 22K gold. A celebration of South Indian craftsmanship at its finest.',
    makingStyle: 'Hand-crafted temple work',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['temple', 'necklace', 'lakshmi', 'south-indian'],
  },
  {
    id: 't2', slug: 'temple-design-pendant',
    name: 'Temple Design Pendant', category: 'Temple Jewellery', categorySlug: 'temple-jewellery',
    purity: '22K', weight: '8.5g', weightGrams: 8.5, price: '₹57,893', priceValue: 57893,
    images: IMG.temple.slice().reverse(),
    description: 'A temple design pendant in 22K gold — a sacred piece meant to bring blessings to its wearer.',
    makingStyle: 'Lost-wax casting, hand-finished',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['temple', 'pendant', 'religious'],
  },
  {
    id: 't3', slug: 'temple-earring-set',
    name: 'Temple Earring Set', category: 'Temple Jewellery', categorySlug: 'temple-jewellery',
    purity: '22K', weight: '12.0g', weightGrams: 12.0, price: '₹81,720', priceValue: 81720,
    images: IMG.temple,
    description: 'Long temple-style drop earrings with peacock and floral motifs. Worn for festivals, weddings and classical dance performances.',
    makingStyle: 'Hand-crafted temple work',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['temple', 'earrings', 'peacock', 'classical'],
  },

  // ─── Kids Collection ─────────────────────────────────
  {
    id: 'k1', slug: 'kids-gold-bracelet',
    name: 'Kids Gold Bracelet', category: 'Kids Collection', categorySlug: 'kids-collection',
    purity: '22K', weight: '3.8g', weightGrams: 3.8, price: '₹25,891', priceValue: 25891,
    images: IMG.kids,
    description: 'A lightweight baby bracelet in 22K gold with a smooth finish and secure clasp. No sharp edges — safe for delicate skin.',
    makingStyle: 'Machine-rolled, polished',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['kids', 'bracelet', 'baby', 'gift'],
  },
  {
    id: 'k2', slug: 'kids-om-pendant',
    name: 'Kids Om Pendant', category: 'Kids Collection', categorySlug: 'kids-collection',
    purity: '22K', weight: '2.2g', weightGrams: 2.2, price: '₹14,987', priceValue: 14987,
    images: IMG.kids.slice().reverse(),
    description: 'A small Om pendant in 22K gold with a smooth rounded finish. Given at naming ceremonies and first birthdays.',
    makingStyle: 'Lost-wax casting',
    isNewArrival: true, isFeatured: false, isAvailable: true,
    tags: ['kids', 'pendant', 'om', 'gift'],
  },
  {
    id: 'k3', slug: 'kids-earrings',
    name: 'Kids Stud Earrings', category: 'Kids Collection', categorySlug: 'kids-collection',
    purity: '22K', weight: '2.8g', weightGrams: 2.8, price: '₹19,068', priceValue: 19068,
    images: IMG.kids,
    description: 'Tiny floral studs in 22K gold with screw-back fastenings for secure wear. Crafted for ears that are just beginning their jewellery story.',
    makingStyle: 'Die-struck, screw-back',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['kids', 'earrings', 'studs', 'baby'],
  },

  // ─── Coins ───────────────────────────────────────────
  {
    id: 'co1', slug: 'gold-coin',
    name: 'Gold Coin', category: 'Coins', categorySlug: 'coins',
    purity: '24K', weight: '5.0g', weightGrams: 5.0, price: '₹37,100', priceValue: 37100,
    images: IMG.coin,
    description: 'A 24K investment-grade gold coin. Presented in a tamper-proof card — ideal for festivals, gifts and savings.',
    makingStyle: 'Minted, tamper-proof packaging',
    isNewArrival: false, isFeatured: true, isAvailable: true,
    tags: ['coins', '24k', 'investment', 'gift'],
  },
  {
    id: 'co2', slug: 'gold-coin-10g',
    name: 'Gold Coin 10g', category: 'Coins', categorySlug: 'coins',
    purity: '24K', weight: '10.0g', weightGrams: 10.0, price: '₹74,200', priceValue: 74200,
    images: IMG.coin.slice().reverse(),
    description: 'A 10g 24K gold coin featuring Goddess Lakshmi. An auspicious gift for weddings, housewarmings and milestone occasions.',
    makingStyle: 'Minted, tamper-proof packaging',
    isNewArrival: false, isFeatured: false, isAvailable: true,
    tags: ['coins', 'lakshmi', '24k', 'investment'],
  },

  // ─── Silver Collection ───────────────────────────────
  {
    id: 's1', slug: 'silver-anklet',
    name: 'Silver Anklet', category: 'Silver Collection', categorySlug: 'silver-collection',
    purity: '22K', weight: '18.0g', weightGrams: 18.0, price: '₹1,692', priceValue: 1692,
    images: IMG.bracelet,
    description: 'An elegant silver anklet with a delicate link pattern — lightweight, comfortable, and perfect for everyday wear.',
    makingStyle: 'Machine-woven, polished finish',
    isNewArrival: true, isFeatured: true, isAvailable: true,
    tags: ['silver', 'anklet', 'daily-wear'],
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.includes(q))
  ).slice(0, 8);
}
