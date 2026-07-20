/** Strict sold-out check — FormData bugs can leave stringy / truthy junk. */
export function isProductSoldOut(product: { isSoldOut?: unknown } | null | undefined): boolean {
  const v = product?.isSoldOut;
  return v === true || v === 1 || v === '1' || v === 'true';
}

export function isProductInStock(product: { isAvailable?: unknown; isSoldOut?: unknown } | null | undefined): boolean {
  if (isProductSoldOut(product)) return false;
  const v = product?.isAvailable;
  return v === true || v === 1 || v === '1' || v === 'true' || v === undefined;
}

export function stockLabel(product: { isAvailable?: unknown; isSoldOut?: unknown } | null | undefined): string {
  if (isProductSoldOut(product)) return 'Sold Out';
  if (isProductInStock(product)) return 'In Stock';
  return 'Made to Order';
}
