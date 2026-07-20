import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStoreSettings } from '../../context/StoreSettingsContext';

const HERO_IMAGE = '/Hero-New_upscayl_3x_ultrasharp.png';

export default function Hero() {
  return (
    <section
      className="home-hero"
      style={{
        position: 'relative',
        height: '100dvh',
        minHeight: '560px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="Exquisite gold jewellery — New Darshan Jewellery"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 18%',
          }}
        />
      </motion.div>

      {/* Dark overlay — stronger on text side for contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(24,24,24,0.62) 0%, rgba(24,24,24,0.34) 38%, rgba(24,24,24,0.12) 68%, rgba(24,24,24,0.04) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container home-hero-content"
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
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--color-gold)',
              boxShadow: '0 1px 6px rgba(0,0,0,0.45)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#E8C97A',
              fontWeight: 500,
              textShadow: '0 1px 10px rgba(0,0,0,0.65), 0 0 1px rgba(0,0,0,0.8)',
            }}
          >
            Ghasipura · Keonjhar · Odisha
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
              fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              color: '#F8F6F2',
              letterSpacing: '0.04em',
              marginBottom: '8px',
              textShadow: '0 2px 20px rgba(0,0,0,0.45), 0 1px 6px rgba(0,0,0,0.35)',
            }}
          >
            New Darshan
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Jewellery</span>
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
            color: 'rgba(248,246,242,0.95)',
            marginBottom: '28px',
            marginTop: '16px',
            textShadow: '0 2px 16px rgba(0,0,0,0.42), 0 1px 5px rgba(0,0,0,0.3)',
          }}
        >
          Elegance Crafted.
          <br />
          Trust Earned.
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
            color: 'rgba(248,246,242,0.88)',
            maxWidth: '420px',
            marginBottom: '48px',
            textShadow: '0 2px 14px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.28)',
          }}
        >
          Premium Gold & Silver Jewellery
          <br />
          for Every Celebration.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: 'easeInOut' }}
        >
          <Link
            to="/collections"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#181818',
              backgroundColor: 'var(--color-gold)',
              padding: '14px 28px',
              textDecoration: 'none',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Explore Collections →
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '52px',
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
        <div style={{ position: 'relative', width: '1px', height: '36px', background: 'rgba(248,246,242,0.2)', overflow: 'hidden' }}>
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

      {/* Closing notice ribbon */}
      <HeroNoticeRibbon />

      <style>{`
        @supports not (height: 100dvh) {
          .home-hero { height: 100svh !important; }
        }
        @media (max-width: 700px) {
          .home-hero {
            min-height: 0 !important;
            height: 100svh !important;
            height: 100dvh !important;
            align-items: flex-end !important;
          }
          .home-hero-content {
            padding-bottom: 72px !important;
            padding-right: 12px !important;
            max-width: 100% !important;
          }
          .home-hero-content h1 {
            font-size: clamp(2.1rem, 9vw, 2.75rem) !important;
          }
        }
      `}</style>
    </section>
  );
}

function HeroNoticeRibbon() {
  const settings = useStoreSettings();
  const hours = settings.weekdayHours || '10:00 AM – 8:30 PM';
  const notices = [
    'Closed on the last Sunday of every month',
    `Open Monday – Sunday · ${hours}`,
  ];

  return (
    <>
      <div
        className="hero-notice-ribbon"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          height: '36px',
          backgroundColor: 'rgba(14, 14, 13, 0.88)',
          borderTop: '1px solid rgba(199, 161, 90, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="hero-notice-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="hero-notice-group" aria-hidden={copy === 1}>
              {Array.from({ length: 4 }).map((_, i) =>
                notices.map((text) => (
                  <span key={`${copy}-${i}-${text}`} className="hero-notice-item">
                    <span className="hero-notice-dot" />
                    {text}
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-notice-track {
          display: flex;
          width: max-content;
          animation: hero-notice-marquee 36s linear infinite;
        }
        .hero-notice-group {
          display: flex;
          flex-shrink: 0;
        }
        .hero-notice-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0 40px;
          font-family: var(--font-body);
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(248, 246, 242, 0.72);
          white-space: nowrap;
        }
        .hero-notice-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-gold);
          flex-shrink: 0;
        }
        @keyframes hero-notice-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-notice-track { animation: none; }
        }
      `}</style>
    </>
  );
}
