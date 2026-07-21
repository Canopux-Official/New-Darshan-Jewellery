import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  productName: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageViewer({
  images,
  currentIndex,
  productName,
  onClose,
  onNext,
  onPrev,
}: ImageViewerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        backgroundColor: 'rgba(24,24,24,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="iv-close"
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: 'max(16px, env(safe-area-inset-top))',
          right: 'max(16px, env(safe-area-inset-right))',
          background: 'none',
          border: 'none',
          color: 'rgba(248,246,242,0.6)',
          cursor: 'pointer',
          fontSize: '0.6875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        Close
      </button>

      {/* Counter */}
      <p
        className="iv-counter"
        style={{
          position: 'absolute',
          top: 'max(20px, calc(env(safe-area-inset-top) + 8px))',
          left: 'max(16px, env(safe-area-inset-left))',
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          letterSpacing: '0.16em',
          color: 'rgba(248,246,242,0.45)',
          zIndex: 2,
        }}
      >
        {currentIndex + 1} / {images.length}
      </p>

      {/* Main image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${productName} — view ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxHeight: '85vh',
            maxWidth: 'min(80vw, 100%)',
            objectFit: 'contain',
            display: 'block',
            cursor: 'default',
          }}
        />
      </AnimatePresence>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            className="iv-prev"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: 'max(12px, env(safe-area-inset-left))',
              background: 'none',
              border: '1px solid rgba(248,246,242,0.15)',
              color: 'rgba(248,246,242,0.6)',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(248,246,242,0.15)'; e.currentTarget.style.color = 'rgba(248,246,242,0.6)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            className="iv-next"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: 'max(12px, env(safe-area-inset-right))',
              background: 'none',
              border: '1px solid rgba(248,246,242,0.15)',
              color: 'rgba(248,246,242,0.6)',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(248,246,242,0.15)'; e.currentTarget.style.color = 'rgba(248,246,242,0.6)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </>
      )}

      <style>{`
        @media (max-width: 700px) {
          .iv-prev, .iv-next {
            bottom: max(24px, env(safe-area-inset-bottom));
            top: auto;
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
