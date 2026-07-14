import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageViewer from './ImageViewer';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div
        className="product-gallery"
        style={{
          display: 'grid',
          gridTemplateColumns: '72px 1fr',
          gap: '12px',
          alignItems: 'start',
        }}
      >
        {/* Vertical thumbnails */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              style={{
                padding: 0,
                border: `1px solid ${i === activeIndex ? 'var(--color-gold)' : 'var(--color-divider)'}`,
                cursor: 'pointer',
                overflow: 'hidden',
                aspectRatio: '1',
                backgroundColor: 'var(--color-bg-alt)',
                transition: 'border-color 0.3s',
                flexShrink: 0,
              }}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: i === activeIndex ? 1 : 0.55,
                  transition: 'opacity 0.3s',
                }}
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '3 / 4',
            backgroundColor: 'var(--color-bg-alt)',
            cursor: 'zoom-in',
          }}
          onClick={() => setViewerOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${productName} — view ${activeIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </AnimatePresence>

          {/* Zoom hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(248,246,242,0.85)',
              padding: '6px 12px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text)' }}>
              Zoom
            </span>
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.5625rem', letterSpacing: '0.12em', color: 'rgba(248,246,242,0.8)', backgroundColor: 'rgba(24,24,24,0.4)', padding: '4px 10px', backdropFilter: 'blur(4px)' }}>
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <ImageViewer
            images={images}
            currentIndex={activeIndex}
            productName={productName}
            onClose={() => setViewerOpen(false)}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 600px) {
          .product-gallery {
            grid-template-columns: 1fr !important;
          }
          .product-gallery > div:first-child {
            flex-direction: row !important;
            overflow-x: auto;
          }
          .product-gallery > div:first-child button {
            width: 60px !important;
            flex-shrink: 0;
          }
        }
      `}</style>
    </>
  );
}
