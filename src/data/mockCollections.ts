import type { Collection } from '../types';

const u = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export const COLLECTIONS: Collection[] = [
  {
    id: 'bridal',
    slug: 'bridal-collection',
    name: 'Bridal Collection',
    shortDescription: 'Heirlooms for the most precious day.',
    description:
      'Our bridal sets are crafted to be the centrepiece of the most sacred moments in a woman\'s life. Each piece — from layered haars to polki chokers and temple maang tikkas — is finished by hand and hallmarked for generations to come.',
    image: u('1583391733956-6c78276477e2'),
    bannerImage: u('1583391733956-6c78276477e2', 1800),
    productCount: 4,
    size: 'large',
  },
  {
    id: 'necklaces',
    slug: 'necklaces',
    name: 'Necklaces',
    shortDescription: 'From delicate chains to statement haars.',
    description:
      'Our necklace collection spans the full spectrum of Indian jewellery tradition — from lightweight everyday pieces to showstopping bridal haars. Every design is available in 22K and 18K gold.',
    image: u('1599643478518-a784e5dc4c8f'),
    bannerImage: u('1599643478518-a784e5dc4c8f', 1800),
    productCount: 5,
    size: 'medium',
  },
  {
    id: 'temple',
    slug: 'temple-jewellery',
    name: 'Temple Jewellery',
    shortDescription: 'Divine heritage, crafted in gold.',
    description:
      'Rooted in centuries of South Indian and Odia tradition, our temple jewellery collection draws inspiration from sacred iconography. Goddess Lakshmi, peacock motifs and lotus patterns rendered in lustrous 22K gold.',
    image: u('1535632066927-ab7c9ab60908'),
    bannerImage: u('1535632066927-ab7c9ab60908', 1800),
    productCount: 3,
    size: 'tall',
  },
  {
    id: 'rings',
    slug: 'gold-rings',
    name: 'Gold Rings',
    shortDescription: 'Timeless designs for every finger.',
    description:
      'From slender everyday bands to ornate bridal rings set with precious stones, our ring collection is designed to complement every hand and every occasion.',
    image: u('1605100804763-247f67b3557e'),
    bannerImage: u('1605100804763-247f67b3557e', 1800),
    productCount: 5,
    size: 'small',
  },
  {
    id: 'earrings',
    slug: 'earrings',
    name: 'Earrings',
    shortDescription: 'Jhumkas, studs, drops & hoops.',
    description:
      'Our earring collection celebrates the full richness of Indian jewellery craft — from classic jhumkas and temple drops to contemporary studs and lightweight hoops suited for daily wear.',
    image: u('1630019852942-f89202989a59'),
    bannerImage: u('1630019852942-f89202989a59', 1800),
    productCount: 5,
    size: 'tall',
  },
  {
    id: 'bangles',
    slug: 'bangles',
    name: 'Bangles',
    shortDescription: 'Stacked traditions, set in gold.',
    description:
      'Worn as a set or as a single statement piece, our bangles are crafted in a range of profiles — from slender plain gold to wide diamond-cut and intricately engraved designs.',
    image: u('1611591437281-460bfbe1220a'),
    bannerImage: u('1611591437281-460bfbe1220a', 1800),
    productCount: 4,
    size: 'medium',
  },
  {
    id: 'chains',
    slug: 'chains',
    name: 'Chains',
    shortDescription: 'Every link, hallmarked for purity.',
    description:
      'Our chain collection offers a range of styles — figaro, singapore, rope, box and more — in 22K and 18K gold. Suitable as standalone pieces or as the base for pendants.',
    image: u('1515562141207-7a88fb7ce338'),
    bannerImage: u('1515562141207-7a88fb7ce338', 1800),
    productCount: 4,
    size: 'small',
  },
  {
    id: 'bracelets',
    slug: 'bracelets',
    name: 'Bracelets',
    shortDescription: 'Refined designs for the wrist.',
    description:
      'From twisted rope bracelets to delicate link chains, our bracelet collection bridges the gap between traditional craft and contemporary elegance.',
    image: u('1573408301185-9519f94de11e'),
    bannerImage: u('1573408301185-9519f94de11e', 1800),
    productCount: 4,
    size: 'small',
  },
  {
    id: 'mangalsutra',
    slug: 'mangalsutra',
    name: 'Mangalsutra',
    shortDescription: 'A sacred bond, worn with grace.',
    description:
      'Our mangalsutra collection honours the sacred significance of this timeless symbol while offering designs that suit the modern Indian woman — from traditional black bead styles to contemporary minimalist pendants.',
    image: u('1617038260897-41a1f14a8ca0'),
    bannerImage: u('1617038260897-41a1f14a8ca0', 1800),
    productCount: 3,
    size: 'medium',
  },
  {
    id: 'pendants',
    slug: 'pendants',
    name: 'Pendants',
    shortDescription: 'Meaningful motifs in gold.',
    description:
      'Our pendant collection features religious and contemporary motifs — Om, Ganesh, Lakshmi, floral and geometric designs — each crafted in 22K and 18K gold.',
    image: u('1543294001-f7cd5d7fb516'),
    bannerImage: u('1543294001-f7cd5d7fb516', 1800),
    productCount: 3,
    size: 'small',
  },
  {
    id: 'kids',
    slug: 'kids-collection',
    name: 'Kids Collection',
    shortDescription: 'Pure gold, crafted for little ones.',
    description:
      'Lightweight and carefully finished for safe daily wear, our kids\' jewellery collection includes bangles, anklets, pendants and earrings in 22K gold — perfect for naming ceremonies, birthdays and festivals.',
    image: u('1506630448388-4e683c67ddb0'),
    bannerImage: u('1506630448388-4e683c67ddb0', 1800),
    productCount: 3,
    size: 'small',
  },
  {
    id: 'coins',
    slug: 'coins',
    name: 'Coins',
    shortDescription: '24K investment-grade gold coins.',
    description:
      'Our gold coins are struck in 24K investment-grade purity and feature traditional Goddess Lakshmi and Sri Ram motifs. Available in 1g, 2g, 5g, 8g and 10g denominations — ideal as gifts or as a form of savings.',
    image: u('1617038260897-41a1f14a8ca0'),
    bannerImage: u('1617038260897-41a1f14a8ca0', 1800),
    productCount: 2,
    size: 'small',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
