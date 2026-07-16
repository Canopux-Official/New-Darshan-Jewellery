import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';

const CRAFT_IMAGE =
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1800&q=85';

const TIMELINE_STEPS = [
  { step: '01', label: 'Design', desc: 'Every piece begins as a sketch — inspired by heritage, refined by vision.' },
  { step: '02', label: 'Craftsmanship', desc: 'Master artisans shape raw gold by hand, a tradition passed through generations.' },
  { step: '03', label: 'Hallmarked', desc: 'Each piece is certified for purity under the BIS hallmarking standard.' },
  { step: '04', label: 'Delivered', desc: 'Presented in our signature packaging, ready to mark a moment that lasts forever.' },
];

export default function Craftsmanship() {
  return (
    <section style={{ position: 'relative', backgroundColor: 'var(--color-dark)', overflow: 'hidden' }}>
      {/* Full-width image */}
      <div style={{ position: 'relative', height: 'min(70vh, 640px)' }}>
        <img
          src={CRAFT_IMAGE}
          alt="Artisan jewellery craftsmanship"
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            display: 'block',
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(24,24,24,0.3) 0%, rgba(24,24,24,0.75) 100%)',
          }}
        />

        {/* Overlay text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 0 64px',
          }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ marginBottom: '16px' }}
            >
              <SectionLabel light>The Process</SectionLabel>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
                color: '#F8F6F2',
                maxWidth: '700px',
                lineHeight: 1.1,
              }}
            >
              Every Ornament
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>
                Tells A Story
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.85,
                color: 'rgba(248,246,242,0.65)',
                maxWidth: '560px',
                marginTop: '24px',
              }}
            >
              From timeless gold necklaces to elegant bangles and carefully crafted bridal collections, every piece reflects our commitment to purity, craftsmanship and trust.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div
        className="container"
        style={{ paddingTop: '80px', paddingBottom: '96px' }}
      >
        <div
          className="timeline-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            position: 'relative',
          }}
        >
          {/* Connecting gold line */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '10%',
              right: '10%',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, var(--color-gold) 15%, var(--color-gold) 85%, transparent)',
              zIndex: 0,
            }}
          />

          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                zIndex: 1,
                paddingTop: '56px',
                paddingRight: '32px',
              }}
            >
              {/* Gold dot */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '10%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  border: '2px solid rgba(199,161,90,0.3)',
                  outline: '4px solid rgba(199,161,90,0.1)',
                }}
              />

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  marginBottom: '12px',
                }}
              >
                {step.step}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.625rem',
                  fontWeight: 400,
                  color: '#F8F6F2',
                  marginBottom: '12px',
                  lineHeight: 1.1,
                }}
              >
                {step.label}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'rgba(248,246,242,0.45)',
                  lineHeight: 1.8,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .timeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 48px !important;
          }
          .timeline-grid > div > div:first-child {
            left: 0 !important;
          }
        }
        @media (max-width: 540px) {
          .timeline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
