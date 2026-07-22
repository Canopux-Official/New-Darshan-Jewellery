import type { GalleryImage } from '../types';

export type GalleryCategory =
  | 'all'
  | 'videos'
  | 'store'
  | 'bridal'
  | 'necklaces'
  | 'chains'
  | 'bangles'
  | 'bracelets'
  | 'earrings'
  | 'pendants'
  | 'silver'
  | 'collections'
  | 'products'
  | 'highlights';

export interface GalleryItem extends GalleryImage {
  category: Exclude<GalleryCategory, 'all'>;
}

function item(
  id: string,
  src: string,
  alt: string,
  category: GalleryItem['category'],
  span: GalleryImage['span'] = 'normal',
): GalleryItem {
  return { id, src, alt, category, span };
}

/** Every image under /public/images for the Gallery page. */
export const GALLERY_PAGE_IMAGES: GalleryItem[] = [
  // Store
  item('store-showroom', '/images/store/showroom.jpg', 'New Darshan Jewellery showroom', 'store', 'wide'),
  item('store-find-us', '/images/store/find-us.jpg', 'Visit our store in Ghasipura', 'store'),

  // Bridal
  item('bridal-bib', '/images/bridal/bridal-bib-set.jpg', 'Classic bridal necklace set', 'bridal', 'tall'),
  item('bridal-paisley', '/images/bridal/bridal-paisley-set.jpg', 'Paisley bridal set', 'bridal'),
  item('bridal-temple', '/images/bridal/bridal-temple-set.jpg', 'Temple bridal set', 'bridal'),
  item('bridal-bangles', '/images/bridal/bridal-bangle-set.jpg', 'Bridal bangle set', 'bridal'),

  // Necklaces
  item('neck-floral', '/images/necklaces/gold-necklace-floral.jpg', 'Floral gold necklace', 'necklaces', 'tall'),
  item('neck-heart', '/images/necklaces/gold-necklace-heart.jpg', 'Heart motif gold necklace', 'necklaces'),
  item('neck-bangles-display', '/images/necklaces/gold-necklace-bangles-display.jpg', 'Heritage bangle and necklace display', 'necklaces'),

  // Chains
  item('chains-display', '/images/chains/gold-chains-display.jpg', 'Gold chains display', 'chains', 'wide'),

  // Bangles
  item('bang-pairs', '/images/bangles/bangles-red-gold-pairs.jpg', 'Red and gold pair bangles', 'bangles', 'tall'),
  item('bang-white-l', '/images/bangles/bangles-white-carved-left.jpg', 'Carved white bangles', 'bangles'),
  item('bang-white-r', '/images/bangles/bangles-white-carved-right.jpg', 'Carved white bangle set', 'bangles'),
  item('bang-gold-l', '/images/bangles/bangles-gold-red-mid-left.jpg', 'Traditional gold and red bangles', 'bangles'),
  item('bang-gold-r', '/images/bangles/bangles-gold-red-mid-right.jpg', 'Ornate gold and red bangles', 'bangles'),
  item('bang-bridal-l', '/images/bangles/bangles-bridal-red-gold-left.jpg', 'Bridal red and gold chura', 'bangles'),
  item('bang-bridal-r', '/images/bangles/bangles-bridal-red-gold-right.jpg', 'Festive bridal bangles', 'bangles'),

  // Bracelets
  item('br-display', '/images/collections/gold-bracelets.jpg', 'Gold bracelets display', 'bracelets', 'wide'),

  // Earrings
  item('ear-sunburst', '/images/earrings/gold-earrings-sunburst-drop.jpg', 'Sunburst drop gold earrings', 'earrings', 'tall'),
  item('ear-assortment', '/images/earrings/gold-earrings-assortment.jpg', 'Traditional gold earrings collection', 'earrings', 'wide'),

  // Pendants
  item('pen-floral', '/images/pendants/gold-pendant-floral.jpg', 'Floral sunburst gold pendant', 'pendants'),
  item('pen-rose', '/images/pendants/gold-pendant-rose.jpg', 'Rose motif gold pendant', 'pendants', 'tall'),

  // Silver
  item('sil-1', '/images/silver/silver-bracelets-1.jpg', 'Assorted silver bracelets', 'silver', 'wide'),
  item('sil-2', '/images/silver/silver-bracelets-2.jpg', 'Classic silver bracelet collection', 'silver'),

  // Collection covers & product stills
  item('col-bridal', '/images/collections/bridal.jpg', 'Bridal collection', 'collections'),
  item('col-bangles-bridal', '/images/collections/bangles-bridal.jpg', 'Bridal bangles', 'collections'),
  item('col-bangles-display', '/images/collections/bangles-display.jpg', 'Bangles display wall', 'collections', 'wide'),
  item('col-earrings-jhumka', '/images/collections/earrings-jhumka.jpg', 'Jhumka earrings', 'collections'),
  item('col-earrings-ornate', '/images/collections/earrings-ornate.jpg', 'Ornate gold earrings', 'collections'),
  item('col-gold-chains', '/images/collections/gold-chains.jpg', 'Gold chains collection', 'collections'),
  item('col-silver-bracelets', '/images/collections/silver-bracelets.jpg', 'Silver bracelets', 'collections'),
  item('col-silver-chains', '/images/collections/silver-chains.jpg', 'Silver chains', 'collections'),

  item('prod-bridal-necklace', '/images/products/bridal-necklace.jpg', 'Bridal necklace', 'products'),
  item('prod-earrings-closeup', '/images/products/earrings-closeup.jpg', 'Gold earrings close-up', 'products'),
  item('prod-circular', '/images/products/necklace-circular.jpg', 'Circular gold necklace', 'products'),
  item('prod-floral', '/images/products/necklace-floral.jpg', 'Floral necklace', 'products'),
  item('prod-bib', '/images/products/necklace-set-bib.jpg', 'Bib necklace set', 'products', 'tall'),
  item('prod-paisley', '/images/products/necklace-set-paisley.jpg', 'Paisley necklace set', 'products'),
  item('prod-temple', '/images/products/necklace-temple-pendant.jpg', 'Temple design pendant', 'products'),

  // Curated gallery folder
  item('g-showroom', '/images/gallery/showroom.jpg', 'Showroom interior', 'highlights', 'wide'),
  item('g-necklace-set', '/images/gallery/necklace-set.jpg', 'Gold necklace set', 'highlights', 'tall'),
  item('g-chains', '/images/gallery/chains.jpg', 'Gold chains', 'highlights'),
  item('g-bangles', '/images/gallery/bangles.jpg', 'Gold and red bangles', 'highlights'),
  item('g-earrings', '/images/gallery/earrings.jpg', 'Traditional jhumka earrings', 'highlights', 'tall'),
  item('g-earrings-detail', '/images/gallery/earrings-detail.jpg', 'Ornate gold earrings detail', 'highlights'),
  item('g-necklace-floral', '/images/gallery/necklace-floral.jpg', 'Floral gold necklace', 'highlights'),
  item('g-silver', '/images/gallery/silver.jpg', 'Silver jewellery', 'highlights'),
  item('g-bangles-wall', '/images/gallery/bangles-wall.jpg', 'Bangle display wall', 'highlights', 'wide'),
];

export const GALLERY_FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'videos', label: 'Videos' },
  { id: 'store', label: 'Store' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'chains', label: 'Chains' },
  { id: 'bangles', label: 'Bangles' },
  { id: 'bracelets', label: 'Bracelets' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'pendants', label: 'Pendants' },
  { id: 'silver', label: 'Silver' },
  { id: 'collections', label: 'Collections' },
  { id: 'products', label: 'Products' },
  { id: 'highlights', label: 'Highlights' },
];

export function getGalleryByCategory(category: GalleryCategory, items: GalleryItem[] = GALLERY_PAGE_IMAGES): GalleryItem[] {
  if (category === 'all') return items;
  if (category === 'videos') return items.filter((img) => img.mediaType === 'video');
  return items.filter((img) => img.category === category);
}
