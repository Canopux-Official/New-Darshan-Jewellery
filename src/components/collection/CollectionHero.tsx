import { motion } from 'framer-motion';
import type { Collection } from '../../types';
import Breadcrumb from '../ui/Breadcrumb';

interface CollectionHeroProps {
  collection: Collection;
}

export default function CollectionHero({ collection }: CollectionHeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        height: '55vh',
        minHeight: '420px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Banner image */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <img
          src={collection.bannerImage}
          alt={collection.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Overlay — darker at top so fixed navbar stays readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(24,24,24,0.55) 0%, rgba(24,24,24,0.2) 35%, rgba(24,24,24,0.72) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'calc(var(--navbar-height) + 24px)',
          paddingBottom: '56px',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
          style={{ marginBottom: '20px' }}
        >
          <Breadcrumb
            light
            items={[
              { label: 'Home', href: '/' },
              { label: 'Collections', href: '/collections' },
              { label: collection.name },
            ]}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: 'easeInOut' }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 400,
            color: '#F8F6F2',
            lineHeight: 1.08,
            marginBottom: '16px',
          }}
        >
          {collection.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(248,246,242,0.7)', maxWidth: '480px', lineHeight: 1.7 }}>
            {collection.shortDescription}
          </p>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,161,90,0.85)', whiteSpace: 'nowrap', borderLeft: '1px solid rgba(199,161,90,0.3)', paddingLeft: '20px' }}>
            {collection.productCount} Designs
          </span>
        </motion.div>
      </div>
    </section>
  );
}
