import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  index?: number;
  /** Controls grid spanning — passed from ProductGrid */
  gridSpan?: 'wide' | 'tall' | 'normal';
}

export default function ProductCard({ product, index = 0, gridSpan = 'normal' }: ProductCardProps) {
  const aspectRatio =
    gridSpan === 'tall' ? '2 / 3' : gridSpan === 'wide' ? '16 / 9' : '3 / 4';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, delay: (index % 4) * 0.07, ease: 'easeInOut' }}
      style={{
        gridColumn: gridSpan === 'wide' ? 'span 2' : 'span 1',
        gridRow: gridSpan === 'tall' ? 'span 2' : 'span 1',
      }}
      className="product-card-root"
    >
      <Link
        to={`/products/${product.slug}`}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        {/* Image container */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio,
            backgroundColor: 'var(--color-bg-alt)',
          }}
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Badges */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {product.isNewArrival && <Badge variant="newArrival">New Arrival</Badge>}
            {product.isSoldOut && <Badge variant="unavailable">Sold Out</Badge>}
            {!product.isSoldOut && !product.isAvailable && <Badge variant="unavailable">Made to Order</Badge>}
          </div>

          {/* Hover overlay */}
          <div
            className="pc-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(24,24,24,0)',
              transition: 'background 0.5s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px',
            }}
          >
            <div
              className="pc-info"
              style={{
                opacity: 0,
                transform: 'translateY(12px)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    color: 'rgba(248,246,242,0.65)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {product.purity}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    color: 'rgba(248,246,242,0.65)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {product.weight}
                </span>
              </div>
              {product.price && (
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.375rem',
                    fontWeight: 400,
                    color: '#F8F6F2',
                  }}
                >
                  {product.price}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Text below image */}
        <div style={{ paddingTop: '14px', paddingBottom: '4px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.5625rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: '5px',
            }}
          >
            {product.category}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.125rem',
              fontWeight: 400,
              color: 'var(--color-text)',
              lineHeight: 1.25,
            }}
          >
            {product.name}
          </h3>
        </div>
      </Link>

      <style>{`
        .product-card-root:hover .pc-overlay {
          background: rgba(24,24,24,0.55) !important;
        }
        .product-card-root:hover .pc-info {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </motion.div>
  );
}
