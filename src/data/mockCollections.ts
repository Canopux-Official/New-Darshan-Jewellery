import type { Collection } from '../types';

const u = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export const COLLECTIONS: Collection[] = [
  {
    id: 'bridal',
    slug: 'bridal-collection',
    name: 'Bridal Collection',
    shortDescription: 'Heirlooms for the most precious day.',
    description:
      'Our bridal sets are crafted to be the centrepiece of the most sacred moments. Each piece — from layered haars to wedding chokers — is finished with care and hallmarked for purity.',
    image: u('1583391733956-6c78276477e2'),
    bannerImage: u('1583391733956-6c78276477e2', 1800),
    productCount: 4,
    size: 'large',
  },
  {
    id: 'necklaces',
    slug: 'gold-necklaces',
    name: 'Gold Necklaces',
    shortDescription: 'From delicate chains to statement haars.',
    description:
      'Our gold necklace collection spans everyday elegance to showstopping bridal pieces — available in 22K and 18K gold.',
    image: u('1599643478518-a784e5dc4c8f'),
    bannerImage: u('1599643478518-a784e5dc4c8f', 1800),
    productCount: 5,
    size: 'medium',
  },
  {
    id: 'chains',
    slug: 'gold-chains',
    name: 'Gold Chains',
    shortDescription: 'Every link, hallmarked for purity.',
    description:
      'Classic and lightweight gold chains suited for daily wear or as the base for pendants — available in 22K and 18K gold.',
    image: u('1515562141207-7a88fb7ce338'),
    bannerImage: u('1515562141207-7a88fb7ce338', 1800),
    productCount: 4,
    size: 'small',
  },
  {
    id: 'rings',
    slug: 'gold-rings',
    name: 'Gold Rings',
    shortDescription: 'Timeless designs for every finger.',
    description:
      'From slender everyday bands to ornate bridal rings, our gold ring collection complements every occasion.',
    image: u('1605100804763-247f67b3557e'),
    bannerImage: u('1605100804763-247f67b3557e', 1800),
    productCount: 5,
    size: 'small',
  },
  {
    id: 'bangles',
    slug: 'bangles',
    name: 'Bangles',
    shortDescription: 'Stacked traditions, set in gold.',
    description:
      'Worn as a set or as a single statement piece, our bangles range from slender plain gold to intricately engraved designs.',
    image: u('1611591437281-460bfbe1220a'),
    bannerImage: u('1611591437281-460bfbe1220a', 1800),
    productCount: 4,
    size: 'medium',
  },
  {
    id: 'bracelets',
    slug: 'bracelets',
    name: 'Bracelets',
    shortDescription: 'Refined designs for the wrist.',
    description:
      'From twisted rope bracelets to delicate link chains, our bracelet collection bridges traditional craft and contemporary elegance.',
    image: u('1573408301185-9519f94de11e'),
    bannerImage: u('1573408301185-9519f94de11e', 1800),
    productCount: 4,
    size: 'small',
  },
  {
    id: 'earrings',
    slug: 'earrings',
    name: 'Earrings',
    shortDescription: 'Jhumkas, studs, drops & designer styles.',
    description:
      'Our earring collection celebrates Indian jewellery craft — from classic jhumkas to contemporary designer pieces for daily wear.',
    image: u('1630019852942-f89202989a59'),
    bannerImage: u('1630019852942-f89202989a59', 1800),
    productCount: 5,
    size: 'tall',
  },
  {
    id: 'pendants',
    slug: 'pendants',
    name: 'Pendants',
    shortDescription: 'Meaningful motifs in gold.',
    description:
      'Religious and contemporary motifs — temple designs, floral and geometric pendants — each crafted in 22K and 18K gold.',
    image: u('1543294001-f7cd5d7fb516'),
    bannerImage: u('1543294001-f7cd5d7fb516', 1800),
    productCount: 3,
    size: 'small',
  },
  {
    id: 'temple',
    slug: 'temple-jewellery',
    name: 'Temple Jewellery',
    shortDescription: 'Divine heritage, crafted in gold.',
    description:
      'Rooted in tradition, our temple jewellery collection draws inspiration from sacred iconography rendered in lustrous 22K gold.',
    image: u('1535632066927-ab7c9ab60908'),
    bannerImage: u('1535632066927-ab7c9ab60908', 1800),
    productCount: 3,
    size: 'tall',
  },
  {
    id: 'mangalsutra',
    slug: 'mangalsutra',
    name: 'Mangalsutra',
    shortDescription: 'A sacred bond, worn with grace.',
    description:
      'Our mangalsutra collection honours tradition while offering designs that suit the modern woman — from classic black bead styles to contemporary pendants.',
    image: u('1617038260897-41a1f14a8ca0'),
    bannerImage: u('1617038260897-41a1f14a8ca0', 1800),
    productCount: 3,
    size: 'medium',
  },
  {
    id: 'silver',
    slug: 'silver-collection',
    name: 'Silver Collection',
    shortDescription: 'Elegant silver for everyday and festive wear.',
    description:
      'From anklets to earrings and festive pieces, our silver collection offers quality craftsmanship at approachable prices.',
    image: u('1573408301185-9519f94de11e'),
    bannerImage: u('1573408301185-9519f94de11e', 1800),
    productCount: 3,
    size: 'small',
  },
  {
    id: 'kids',
    slug: 'kids-collection',
    name: 'Kids Collection',
    shortDescription: 'Pure gold, crafted for little ones.',
    description:
      'Lightweight and carefully finished for safe daily wear — bangles, bracelets, pendants and earrings perfect for naming ceremonies and festivals.',
    image: u('1506630448388-4e683c67ddb0'),
    bannerImage: u('1506630448388-4e683c67ddb0', 1800),
    productCount: 3,
    size: 'small',
  },
  {
    id: 'daily',
    slug: 'daily-wear-collection',
    name: 'Daily Wear Collection',
    shortDescription: 'Lightweight pieces for every day.',
    description:
      'Comfortable, elegant daily wear jewellery designed for modern lifestyles — chains, earrings, rings and more.',
    image: u('1515562141207-7a88fb7ce338'),
    bannerImage: u('1515562141207-7a88fb7ce338', 1800),
    productCount: 4,
    size: 'medium',
  },
  {
    id: 'coins',
    slug: 'coins',
    name: 'Coins',
    shortDescription: '24K investment-grade gold coins.',
    description:
      'Our gold coins are struck in 24K purity and available in popular denominations — ideal as gifts or as a form of savings.',
    image: u('1617038260897-41a1f14a8ca0'),
    bannerImage: u('1617038260897-41a1f14a8ca0', 1800),
    productCount: 2,
    size: 'small',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
