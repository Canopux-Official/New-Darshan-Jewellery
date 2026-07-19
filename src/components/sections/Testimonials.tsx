import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import { TESTIMONIALS } from '../../utils/constants';

const AUTO_SWIPE_MS = 5000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const testimonial = TESTIMONIALS[active];

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused || TESTIMONIALS.length <= 1) return;
    const id = window.setInterval(goNext, AUTO_SWIPE_MS);
    return () => window.clearInterval(id);
  }, [paused, goNext, active]);

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: '900px',
            marginInline: 'auto',
            textAlign: 'center',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionLabel>What Our Patrons Say</SectionLabel>
          </motion.div>

          {/* Quotation mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '8rem',
              lineHeight: 0.6,
              color: 'var(--color-gold)',
              opacity: 0.18,
              marginBottom: '32px',
              userSelect: 'none',
            }}
          >
            "
          </motion.div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.65,
                color: 'var(--color-text)',
                marginBottom: '40px',
              }}
            >
              {testimonial.quote}
            </motion.blockquote>
          </AnimatePresence>

          {/* Divider */}
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--color-gold)',
              marginInline: 'auto',
              marginBottom: '24px',
            }}
          />

          {/* Name + City */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`meta-${testimonial.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: 'var(--color-text)',
                  marginBottom: '4px',
                }}
              >
                {testimonial.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                }}
              >
                {testimonial.city}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '48px',
            }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === active ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === active ? 'var(--color-gold)' : 'var(--color-divider)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'width 0.4s ease, background 0.4s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
