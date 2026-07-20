import type { Collection } from '../types';
import { COLLECTIONS, getCollectionBySlug } from '../data/mockCollections';

/** Merge live API categories (with productCount) onto curated collection cards. */
export function mergeCollectionsWithLiveCounts(
  apiCategories: Array<{ id: string; name: string; slug: string; productCount?: number; _count?: { products?: number } }>,
): Collection[] {
  const bySlug = new Map(
    (apiCategories || []).map((c) => [
      c.slug,
      {
        id: c.id,
        name: c.name,
        slug: c.slug,
        productCount: c.productCount ?? c._count?.products ?? 0,
      },
    ]),
  );

  // Keep masonry order/images from curated list; overlay live names + counts
  const merged = COLLECTIONS.map((col) => {
    const live = bySlug.get(col.slug);
    if (!live) return { ...col, productCount: 0 };
    return {
      ...col,
      id: live.id,
      name: live.name,
      productCount: live.productCount,
    };
  });

  // Include any active API categories not in the curated list
  for (const [slug, live] of bySlug) {
    if (merged.some((c) => c.slug === slug)) continue;
    const mock = getCollectionBySlug(slug);
    merged.push({
      id: live.id,
      slug: live.slug,
      name: live.name,
      shortDescription: mock?.shortDescription || `Explore our ${live.name} collection.`,
      description: mock?.description || '',
      image: mock?.image || '',
      bannerImage: mock?.bannerImage || mock?.image || '',
      productCount: live.productCount,
      size: mock?.size || 'small',
    });
  }

  return merged;
}
