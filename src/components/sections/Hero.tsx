import { motion } from 'framer-motion';
import TextLink from '../ui/TextLink';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1800&q=85';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="Exquisite gold jewellery — Krishna Jewellers"
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
          }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(24,24,24,0.62) 0%, rgba(24,24,24,0.28) 55%, rgba(24,24,24,0.1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 'var(--navbar-height)',
          maxWidth: '780px',
        }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}
          >
            Est. 1987 · Anand, Gujarat
          </span>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              color: '#F8F6F2',
              letterSpacing: '0.04em',
              marginBottom: '8px',
            }}
          >
            Krishna
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Jewellers</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: 'easeInOut' }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(248,246,242,0.82)',
            marginBottom: '28px',
            marginTop: '16px',
          }}
        >
          Crafted with tradition.
          <br />
          Worn for generations.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: 'easeInOut' }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            lineHeight: 1.85,
            color: 'rgba(248,246,242,0.62)',
            maxWidth: '420px',
            marginBottom: '48px',
          }}
        >
          For over three decades, we have woven gold into the moments that matter most — 
          celebrations, milestones, and quiet expressions of love.
        </motion.p>

        {/* CTA text link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: 'easeInOut' }}
        >
          <TextLink to="/collections" light>
            Explore Collections →
          </TextLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.5625rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(248,246,242,0.45)',
          }}
        >
          Scroll
        </span>
        <div style={{ position: 'relative', width: '1px', height: '48px', background: 'rgba(248,246,242,0.2)', overflow: 'hidden' }}>
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '40%',
              background: 'var(--color-gold)',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
