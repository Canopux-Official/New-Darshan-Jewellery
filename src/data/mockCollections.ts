import type { Collection } from '../types';
import { STORE_PHOTOS } from './storeImages';

const C = STORE_PHOTOS.collections;

export const COLLECTIONS: Collection[] = [
  {
    id: 'bridal',
    slug: 'bridal-collection',
    name: 'Bridal Collection',
    shortDescription: 'Heirlooms for the most precious day.',
    description:
      'Our bridal sets are crafted to be the centrepiece of the most sacred moments. Each piece — from layered haars to wedding chokers — is finished with care and hallmarked for purity.',
    image: C.bridal,
    bannerImage: C.bridal,
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
    image: C.goldNecklaces,
    bannerImage: C.goldNecklaces,
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
    image: C.goldChains,
    bannerImage: C.goldChains,
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
    image: C.goldRings,
    bannerImage: C.goldRings,
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
    image: C.bangles,
    bannerImage: C.bangles,
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
    image: C.bracelets,
    bannerImage: C.bracelets,
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
    image: C.earrings,
    bannerImage: C.earrings,
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
    image: C.pendants,
    bannerImage: C.pendants,
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
    image: C.temple,
    bannerImage: C.temple,
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
    image: C.mangalsutra,
    bannerImage: C.mangalsutra,
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
    image: C.silver,
    bannerImage: C.silver,
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
    image: C.kids,
    bannerImage: C.kids,
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
    image: C.dailyWear,
    bannerImage: C.dailyWear,
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
    image: C.coins,
    bannerImage: C.coins,
    productCount: 2,
    size: 'small',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
