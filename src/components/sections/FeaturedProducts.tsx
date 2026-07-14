import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { FEATURED_PRODUCTS } from '../../utils/constants';
import type { Product } from '../../types';

export default function FeaturedProducts() {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '560px', marginBottom: '64px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '16px' }}
          >
            <SectionLabel>New &amp; Notable</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 400,
              color: 'var(--color-text)',
              lineHeight: 1.12,
              marginBottom: '24px',
            }}
          >
            Featured
            <span style={{ fontStyle: 'italic', color: 'var(--color-bronze)' }}>
              {' '}Pieces
            </span>
          </motion.h2>

          <GoldDivider />
        </div>

        {/* Alternating mosaic layout */}
        <div
          className="products-mosaic"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '320px',
            gap: '2px',
          }}
        >
          {FEATURED_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} large={i === 0 || i === 4} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: '56px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/collections"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              borderBottom: '1px solid var(--color-text)',
              paddingBottom: '3px',
              display: 'inline-block',
            }}
          >
            View All Pieces →
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .products-mosaic {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 300px !important;
          }
        }
        @media (max-width: 600px) {
          .products-mosaic {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  large?: boolean;
}

function ProductCard({ product, index, large }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: 'easeInOut' }}
      className="product-card-cell"
      style={{
        gridColumn: large ? 'span 2' : 'span 1',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--color-bg-alt)',
      }}
    >
      <Link to={`/product/${product.id}`} style={{ display: 'block', height: '100%' }}>
        {/* Image */}
        <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
          <motion.img
            src={product.image}
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

          {/* New Arrival badge */}
          {product.isNewArrival && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                padding: '5px 12px',
                border: '1px solid var(--color-gold)',
                backgroundColor: 'rgba(24,24,24,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                }}
              >
                New Arrival
              </span>
            </div>
          )}

          {/* Overlay — appears on hover */}
          <div
            className="product-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(24,24,24,0)',
              transition: 'background 0.5s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '28px',
            }}
          >
            <div
              className="product-info"
              style={{
                opacity: 0,
                transform: 'translateY(12px)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  marginBottom: '6px',
                }}
              >
                {product.category}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: '#F8F6F2',
                  marginBottom: '10px',
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </h3>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    color: 'rgba(248,246,242,0.6)',
                  }}
                >
                  {product.weight}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    color: 'rgba(248,246,242,0.6)',
                  }}
                >
                  {product.purity}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#F8F6F2',
                }}
              >
                {product.price}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <style>{`
        .product-card-cell:hover .product-overlay {
          background: rgba(24,24,24,0.62) !important;
        }
        .product-card-cell:hover .product-info {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (max-width: 1024px) {
          .product-card-cell {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
