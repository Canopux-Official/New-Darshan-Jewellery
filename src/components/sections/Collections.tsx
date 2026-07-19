import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { COLLECTIONS } from '../../utils/constants';

export default function Collections() {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '64px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: '16px' }}
            >
              <SectionLabel>Our Collections</SectionLabel>
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
              }}
            >
              Shop by
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-bronze)' }}>
                Category
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/collections"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                borderBottom: '1px solid var(--color-divider)',
                paddingBottom: '2px',
              }}
            >
              View All Collections →
            </Link>
          </motion.div>
        </div>

        <GoldDivider style={{ marginBottom: '56px' }} />

        {/* Grid */}
        <div
          className="collections-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: 'minmax(0, auto)',
            gap: '2px',
          }}
        >
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.id} collection={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CollectionCardProps {
  collection: (typeof COLLECTIONS)[0];
  index: number;
}

function CollectionCard({ collection, index }: CollectionCardProps) {
  const isLarge = collection.size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeInOut' }}
      style={isLarge ? { gridColumn: 'span 2', gridRow: 'span 2' } : undefined}
    >
      <Link
        to={`/collections/${collection.slug}`}
        style={{ display: 'block', textDecoration: 'none', height: '100%' }}
      >
        <div
          className="collection-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: isLarge ? undefined : '3 / 4',
            height: isLarge ? '100%' : undefined,
            minHeight: isLarge ? '100%' : undefined,
            cursor: 'pointer',
          }}
        >
          <motion.img
            src={collection.image}
            alt={collection.name}
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, transparent 40%, rgba(24,24,24,0.72) 100%)',
              transition: 'opacity 0.5s ease',
            }}
          />

          {/* Text overlay — fades up on hover */}
          <div
            className="collection-card-text"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: isLarge ? '40px 32px' : '32px 24px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '8px',
                opacity: 0,
                transform: 'translateY(8px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
              className="collection-sub"
            >
              Explore Collection
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: isLarge ? '2.25rem' : '1.625rem',
                fontWeight: 400,
                color: '#F8F6F2',
                lineHeight: 1.1,
                transform: 'translateY(8px)',
                transition: 'transform 0.5s ease',
              }}
              className="collection-title"
            >
              {collection.name}
            </h3>
          </div>
        </div>
      </Link>

      <style>{`
        .collection-card:hover .collection-sub {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .collection-card:hover .collection-title {
          transform: translateY(0) !important;
        }
        @media (max-width: 900px) {
          .collections-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .collections-grid {
            grid-template-columns: 1fr !important;
          }
          .collections-grid > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
