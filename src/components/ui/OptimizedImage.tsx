import { useState, type ImgHTMLAttributes } from 'react';
import { optimizeImageUrl, buildSrcSet, blurPlaceholder, resolveMediaUrl } from '../../utils/cloudinary';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src?: string | null;
  alt: string;
  width?: number;
  heights?: never;
  sizes?: string;
  eager?: boolean;
  aspectRatio?: string;
}

/**
 * Production image component:
 * - Cloudinary f_auto / q_auto
 * - Responsive srcset
 * - Blur-up placeholder
 * - Native lazy loading
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  eager = false,
  aspectRatio,
  style,
  className,
  ...rest
}: OptimizedImageProps) {
  const resolved = resolveMediaUrl(src);
  const [loaded, setLoaded] = useState(false);
  const placeholder = blurPlaceholder(resolved);
  const optimized = optimizeImageUrl(resolved, { width: width || 1200, quality: 'auto' });
  const srcSet = buildSrcSet(resolved);

  return (
    <span
      className={className}
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.04)',
        aspectRatio,
        ...style,
      }}
    >
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(12px)',
            transform: 'scale(1.05)',
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
      <img
        src={optimized || resolved}
        srcSet={srcSet || undefined}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          position: 'relative',
          opacity: loaded || !placeholder ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
        {...rest}
      />
    </span>
  );
}
