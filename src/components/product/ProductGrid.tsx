import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

// Cycle of span patterns for editorial rhythm
const SPAN_PATTERN: Array<'normal' | 'tall' | 'wide' | 'normal'> = [
  'normal', 'tall', 'normal', 'normal',
  'wide', 'normal', 'normal', 'tall',
  'normal', 'normal', 'normal', 'normal',
];

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          paddingBlock: '96px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: 'var(--color-muted)',
            marginBottom: '12px',
          }}
        >
          No pieces found
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-muted)',
          }}
        >
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '340px',
          gap: '3px',
        }}
      >
        {products.map((product, i) => {
          const span = SPAN_PATTERN[i % SPAN_PATTERN.length];
          return (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              gridSpan={span}
            />
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 280px !important;
          }
          /* Disable wide spans on tablet */
          .product-grid > * {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 540px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 360px !important;
          }
          .product-grid > * {
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </>
  );
}
