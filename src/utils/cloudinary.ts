/**
 * Cloudinary-aware image URL helpers.
 * Frontend stays independent of upload implementation —
 * only consumes URLs + optional transforms.
 */

const CLOUDINARY_HOST = 'res.cloudinary.com';

export function isCloudinaryUrl(url?: string | null): boolean {
  return !!url && url.includes(CLOUDINARY_HOST);
}

/** Inject Cloudinary transforms into a delivery URL. */
export function optimizeImageUrl(
  url: string | undefined | null,
  opts: { width?: number; height?: number; quality?: string | number; blur?: number } = {},
): string {
  if (!url) return '';
  if (!isCloudinaryUrl(url)) return url;

  const { width, height, quality = 'auto', blur } = opts;
  const parts: string[] = ['f_auto', `q_${quality}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`, 'c_fill');
  if (blur) parts.push(`e_blur:${blur}`);

  // Insert transforms after /upload/
  return url.replace('/upload/', `/upload/${parts.join(',')}/`);
}

export function buildSrcSet(
  url: string | undefined | null,
  widths: number[] = [400, 800, 1200, 1600],
): string {
  if (!url || !isCloudinaryUrl(url)) return '';
  return widths.map((w) => `${optimizeImageUrl(url, { width: w })} ${w}w`).join(', ');
}

export function blurPlaceholder(url: string | undefined | null): string {
  return optimizeImageUrl(url, { width: 40, quality: 30, blur: 1000 });
}

/** Resolve relative /uploads paths (legacy) to absolute backend URL. */
export function resolveMediaUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  if (url.startsWith('/uploads')) {
    const base = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1').replace('/api/v1', '');
    return `${base}${url}`;
  }
  return url;
}

/**
 * Build a JPEG poster from a Cloudinary video URL.
 * Uses 1s offset — frame 0 is often black on recorded clips.
 */
export function videoThumbnailUrl(
  videoUrl?: string | null,
  storedThumb?: string | null,
): string {
  const url = resolveMediaUrl(videoUrl);
  if (url && isCloudinaryUrl(url) && url.includes('/video/upload/')) {
    // Drop any existing transforms, keep optional version segment
    const cleaned = url.replace(
      /\/video\/upload\/(?:(?!v\d+\/)[^/]+\/)*(v\d+\/)?/,
      '/video/upload/$1',
    );
    return cleaned
      .replace('/video/upload/', '/video/upload/so_1,w_800,c_fill,q_auto,f_jpg/')
      .replace(/\.(mp4|webm|mov|m4v)(\?.*)?$/i, '.jpg$2');
  }
  return resolveMediaUrl(storedThumb) || '';
}
