import type { Product, FilterState } from '../types';

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  return products.filter((p) => {
    if (filters.purity.length > 0 && !filters.purity.includes(p.purity)) return false;

    if (filters.weightBucket !== 'all') {
      const g = p.weightGrams;
      if (filters.weightBucket === 'light' && g > 5) return false;
      if (filters.weightBucket === 'medium' && (g <= 5 || g > 15)) return false;
      if (filters.weightBucket === 'heavy' && (g <= 15 || g > 30)) return false;
      if (filters.weightBucket === 'statement' && g <= 30) return false;
    }

    if (filters.priceRange !== 'all' && p.priceValue !== undefined) {
      const v = p.priceValue;
      if (filters.priceRange === 'under20k' && v >= 20000) return false;
      if (filters.priceRange === '20k-50k' && (v < 20000 || v > 50000)) return false;
      if (filters.priceRange === '50k-1l' && (v < 50000 || v > 100000)) return false;
      if (filters.priceRange === 'above1l' && v <= 100000) return false;
    }

    if (filters.newArrivals && !p.isNewArrival) return false;
    if (filters.featured && !p.isFeatured) return false;
    if (filters.available && !p.isAvailable) return false;

    return true;
  });
}

export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  if (filters.purity.length > 0) count++;
  if (filters.weightBucket !== 'all') count++;
  if (filters.priceRange !== 'all') count++;
  if (filters.newArrivals) count++;
  if (filters.featured) count++;
  if (filters.available) count++;
  return count;
}
