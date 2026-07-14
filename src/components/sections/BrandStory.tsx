import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import TextLink from '../ui/TextLink';

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=80';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: 'easeInOut' },
  }),
};

export default function BrandStory() {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container">
        <div
          className="brand-story-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Left — Text */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              style={{ marginBottom: '24px' }}
            >
              <SectionLabel>Our Story</SectionLabel>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.1}
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                color: 'var(--color-text)',
                marginBottom: '32px',
              }}
            >
              Every Ornament
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-bronze)' }}>
                Has A Story
              </span>
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.2}
              variants={fadeUp}
              style={{ marginBottom: '32px' }}
            >
              <GoldDivider />
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.3}
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.9,
                color: 'var(--color-muted)',
                marginBottom: '20px',
              }}
            >
              Founded in 1987 by Shri Rameshbhai Patel, Krishna Jewellers began as a small 
              workshop in the heart of Anand. What started as one craftsman's dream has grown 
              into a legacy trusted by generations of families across Gujarat.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.42}
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.9,
                color: 'var(--color-muted)',
                marginBottom: '48px',
              }}
            >
              Every piece we create carries the weight of that tradition — hallmarked for purity, 
              shaped by hand, and designed to outlive the moment it was made for.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.55}
              variants={fadeUp}
            >
              <TextLink to="/about">Discover Our Heritage →</TextLink>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.65}
              variants={fadeUp}
              style={{
                display: 'flex',
                gap: '48px',
                marginTop: '64px',
                paddingTop: '40px',
                borderTop: '1px solid var(--color-divider)',
              }}
            >
              {[
                { value: '37+', label: 'Years of Craft' },
                { value: '12k+', label: 'Families Served' },
                { value: '100%', label: 'BIS Hallmarked' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2rem',
                      fontWeight: 500,
                      color: 'var(--color-gold)',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-24px',
                width: 'calc(100% - 24px)',
                height: 'calc(100% - 24px)',
                border: '1px solid var(--color-divider)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
                aspectRatio: '4 / 5',
              }}
            >
              <motion.img
                src={STORY_IMAGE}
                alt="Artisan crafting jewellery"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>

            {/* Floating label */}
            <div
              style={{
                position: 'absolute',
                bottom: '32px',
                left: '-40px',
                backgroundColor: 'var(--color-bg)',
                padding: '20px 28px',
                borderLeft: '2px solid var(--color-gold)',
                zIndex: 2,
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  marginBottom: '4px',
                }}
              >
                Handcrafted
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.625rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                }}
              >
                with BIS Hallmarked Gold
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .brand-story-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
