import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import Breadcrumb from '../components/ui/Breadcrumb';
import PageMeta from '../components/seo/PageMeta';
import {
  GALLERY_FILTERS,
  getGalleryByCategory,
  type GalleryCategory,
  type GalleryItem,
} from '../data/galleryImages';
import { STORE_PHOTOS } from '../data/storeImages';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { STATIC_PAGE_META } from '../utils/seo';

const HERO_IMAGE = STORE_PHOTOS.showroom;

export default function GalleryPage() {
  const { showGallery } = useStoreSettings();
  const [filter, setFilter] = useState<GalleryCategory>('all');
  const [preview, setPreview] = useState<GalleryItem | null>(null);

  const images = useMemo(() => getGalleryByCategory(filter), [filter]);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreview(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const list = images;
        const idx = list.findIndex((img) => img.id === preview.id);
        if (idx < 0) return;
        const next =
          e.key === 'ArrowRight'
            ? list[(idx + 1) % list.length]
            : list[(idx - 1 + list.length) % list.length];
        setPreview(next);
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [preview, images]);

  if (!showGallery) return <Navigate to="/" replace />;

  return (
    <PageTransition>
      <PageMeta
        title={STATIC_PAGE_META.gallery.title}
        description={STATIC_PAGE_META.gallery.description}
        path={STATIC_PAGE_META.gallery.path}
      />
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          height: '52vh',
          minHeight: '380px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img
            src={HERO_IMAGE}
            alt="New Darshan Jewellery gallery"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
          />
        </motion.div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(24,24,24,0.55) 0%, rgba(24,24,24,0.25) 40%, rgba(24,24,24,0.78) 100%)',
          }}
        />

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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: '20px' }}
          >
            <Breadcrumb light items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />
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
            Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'rgba(248,246,242,0.7)',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            A look inside New Darshan Jewellery — store moments, bridal sets, and hallmarked pieces from our collections.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <div
        style={{
          borderBottom: '1px solid var(--color-divider)',
          backgroundColor: 'var(--color-bg)',
          position: 'sticky',
          top: 'var(--navbar-height)',
          zIndex: 40,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            paddingBlock: '18px',
            flexWrap: 'wrap',
          }}
        >
          <div
            className="gallery-filters"
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {GALLERY_FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    padding: '8px 14px',
                    borderRadius: '2px',
                    border: active ? '1px solid var(--color-gold)' : '1px solid var(--color-divider)',
                    background: active ? 'rgba(199,161,90,0.12)' : 'transparent',
                    color: active ? 'var(--color-gold)' : 'var(--color-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {images.length} photos
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 96 }}>
        <div
          className="gallery-page-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '220px',
            gap: '4px',
          }}
        >
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: (i % 8) * 0.04, ease: 'easeOut' }}
              onClick={() => setPreview(img)}
              aria-label={`View ${img.alt}`}
              style={{
                gridColumn: img.span === 'wide' ? 'span 2' : 'span 1',
                gridRow: img.span === 'tall' ? 'span 2' : 'span 1',
                position: 'relative',
                overflow: 'hidden',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: 'var(--color-bg-alt)',
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                className="gallery-item-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 55%, rgba(24,24,24,0.65) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.08em',
                    color: '#F8F6F2',
                    textAlign: 'left',
                  }}
                >
                  {img.alt}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {images.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              color: 'var(--color-muted)',
              paddingBlock: 80,
            }}
          >
            No photos in this category yet.
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {preview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreview(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 300,
                backgroundColor: 'rgba(14,14,13,0.92)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 301,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px',
                pointerEvents: 'none',
              }}
            >
              <div style={{ position: 'relative', maxWidth: 'min(1100px, 94vw)', maxHeight: '88vh', pointerEvents: 'auto' }}>
                <img
                  src={preview.src}
                  alt={preview.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '2px',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                  }}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(248,246,242,0.75)',
                    marginTop: 16,
                    textAlign: 'center',
                  }}
                >
                  {preview.alt}
                </p>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    top: -40,
                    right: 0,
                    background: 'none',
                    border: 'none',
                    color: '#F8F6F2',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-page-grid button:hover .gallery-item-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 1024px) {
          .gallery-page-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            grid-auto-rows: 200px !important;
          }
        }
        @media (max-width: 768px) {
          .gallery-page-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 180px !important;
          }
          .gallery-page-grid > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
          .gallery-filters {
            max-width: 100%;
            overflow-x: auto;
            flex-wrap: nowrap !important;
            padding-bottom: 4px;
          }
        }
      `}</style>
    </PageTransition>
  );
}
