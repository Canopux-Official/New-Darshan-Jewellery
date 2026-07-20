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
      <div className="product-gallery">
        {/* Main image first in DOM for mobile order via CSS */}
        <div
          className="product-gallery-main"
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '3 / 4',
            backgroundColor: 'var(--color-bg-alt)',
            cursor: 'zoom-in',
            width: '100%',
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
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </AnimatePresence>

          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(248,246,242,0.9)',
              padding: '6px 12px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
              }}
            >
              Zoom
            </span>
          </div>

          {images.length > 1 && (
            <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(248,246,242,0.85)',
                  backgroundColor: 'rgba(24,24,24,0.45)',
                  padding: '4px 10px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="product-gallery-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  padding: 0,
                  border: `1.5px solid ${i === activeIndex ? 'var(--color-gold)' : 'var(--color-divider)'}`,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  aspectRatio: '1',
                  backgroundColor: 'var(--color-bg-alt)',
                  transition: 'border-color 0.3s',
                  flexShrink: 0,
                  width: 72,
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
        )}
      </div>

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
        .product-gallery {
          display: grid;
          grid-template-columns: ${images.length > 1 ? '72px 1fr' : '1fr'};
          grid-template-areas: ${images.length > 1 ? '"thumbs main"' : '"main"'};
          gap: 12px;
          align-items: start;
        }
        .product-gallery-thumbs {
          grid-area: thumbs;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .product-gallery-main {
          grid-area: main;
        }

        @media (max-width: 900px) {
          .product-gallery {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
          }
          .product-gallery-main {
            aspect-ratio: 1 / 1 !important;
            width: 100%;
          }
          .product-gallery-thumbs {
            flex-direction: row !important;
            overflow-x: auto;
            gap: 10px;
            padding-bottom: 2px;
            -webkit-overflow-scrolling: touch;
          }
          .product-gallery-thumbs button {
            width: 76px !important;
            height: 76px !important;
          }
        }
      `}</style>
    </>
  );
}
