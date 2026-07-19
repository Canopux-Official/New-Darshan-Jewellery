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
    productCount: 7,
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
    productCount: 7,
    size: 'medium',
  },
  {
    id: 'bracelets',
    slug: 'gold-bracelets',
    name: 'Gold Bracelets',
    shortDescription: 'Refined designs for the wrist.',
    description:
      'From twisted rope bracelets to delicate link chains, our gold bracelet collection bridges traditional craft and contemporary elegance.',
    image: C.bracelets,
    bannerImage: C.bracelets,
    productCount: 7,
    size: 'small',
  },
  {
    id: 'earrings',
    slug: 'earrings',
    name: 'Gold Earrings',
    shortDescription: 'Jhumkas, studs, drops & designer styles.',
    description:
      'Our gold earring collection celebrates Indian jewellery craft — from classic jhumkas to contemporary designer pieces for daily wear.',
    image: C.earrings,
    bannerImage: C.earrings,
    productCount: 7,
    size: 'small',
  },
  {
    id: 'pendants',
    slug: 'gold-pendants',
    name: 'Gold Pendants',
    shortDescription: 'Meaningful motifs in gold.',
    description:
      'Temple designs, floral and geometric pendants — each crafted in 22K and 18K gold for everyday wear and special occasions.',
    image: C.pendants,
    bannerImage: C.pendants,
    productCount: 5,
    size: 'small',
  },
  {
    id: 'silver',
    slug: 'silver-bracelets',
    name: 'Silver Bracelets',
    shortDescription: 'Elegant silver for everyday wear.',
    description:
      'From delicate chains to bold link styles, our silver bracelet collection offers quality craftsmanship at approachable prices.',
    image: C.silver,
    bannerImage: C.silver,
    productCount: 3,
    size: 'small',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
