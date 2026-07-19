import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { publicOffersService, type PublicOffer } from '../../services/publicApi';

const MAX_NOTES = 3;

const NOTE_STYLES = [
  { bg: '#F3E6C8', rotate: -3.5, tape: 'rgba(199,161,90,0.55)' },
  { bg: '#EDE4D4', rotate: 2.2, tape: 'rgba(139,115,85,0.45)' },
  { bg: '#F0E8D2', rotate: -1.4, tape: 'rgba(199,161,90,0.4)' },
];

/** Survives React remounts; cleared only on full page refresh. */
const dismissedIds = new Set<string>();
let lockedOfferIds: string[] | null = null;

export default function OfferStickyNotes() {
  const [offers, setOffers] = useState<PublicOffer[]>([]);
  const [, bump] = useState(0);

  useEffect(() => {
    let cancelled = false;
    publicOffersService
      .getActive()
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        if (!lockedOfferIds) {
          lockedOfferIds = list.slice(0, MAX_NOTES).map((o) => o.id);
        }
        setOffers(list.filter((o) => lockedOfferIds!.includes(o.id)));
      })
      .catch(() => {
        if (!cancelled) setOffers([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = offers.filter((o) => !dismissedIds.has(o.id));

  const dismiss = (id: string) => {
    dismissedIds.add(id);
    bump((n) => n + 1);
  };

  if (visible.length === 0) return null;

  return (
    <div
      className="offer-sticky-stack"
      aria-label="Current offers"
      style={{
        position: 'fixed',
        right: 20,
        bottom: 24,
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
        gap: 14,
        pointerEvents: 'none',
        maxWidth: 'min(220px, calc(100vw - 40px))',
      }}
    >
      <AnimatePresence initial={false}>
        {visible.map((offer, i) => {
          const style = NOTE_STYLES[i % NOTE_STYLES.length];
          return (
            <motion.aside
              key={offer.id}
              initial={{ opacity: 0, y: 28, scale: 0.9, rotate: style.rotate }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: style.rotate }}
              exit={{ opacity: 0, scale: 0.85, y: 16 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 2 }}
              style={{
                pointerEvents: 'auto',
                position: 'relative',
                width: '100%',
                backgroundColor: style.bg,
                padding: '18px 14px 16px',
                boxShadow: '2px 6px 18px rgba(24,24,24,0.14)',
                border: '1px solid rgba(139,115,85,0.12)',
                transformOrigin: 'center top',
              }}
            >
              {/* Tape */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-2deg)',
                  width: 52,
                  height: 16,
                  backgroundColor: style.tape,
                  opacity: 0.85,
                }}
              />

              <button
                type="button"
                aria-label={`Dismiss ${offer.title}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dismiss(offer.id);
                }}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 22,
                  height: 22,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'rgba(46,46,46,0.45)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </button>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bronze)',
                  marginBottom: 8,
                  paddingRight: 16,
                }}
              >
                Offer
              </p>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  lineHeight: 1.25,
                  marginBottom: 8,
                  paddingRight: 8,
                }}
              >
                {offer.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.55,
                }}
              >
                {offer.description}
              </p>
            </motion.aside>
          );
        })}
      </AnimatePresence>

      <style>{`
        @media (max-width: 600px) {
          .offer-sticky-stack {
            right: 12px !important;
            bottom: 16px !important;
            max-width: min(190px, calc(100vw - 24px)) !important;
          }
        }
      `}</style>
    </div>
  );
}
