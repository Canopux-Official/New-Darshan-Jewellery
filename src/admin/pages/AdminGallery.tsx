import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import AdminButton from '../components/ui/AdminButton';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { galleryService } from '../services/gallery.service';
import { resolveMediaUrl, videoThumbnailUrl } from '../../utils/cloudinary';
import { useToast } from '../context/ToastContext';

type GalleryMedia = {
  id: string;
  url: string;
  alt?: string | null;
  mediaType?: string;
  thumbnailUrl?: string | null;
  createdAt?: string;
};

function isVideo(item: GalleryMedia) {
  return item.mediaType === 'video';
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryMedia[]>([]);
  const [_loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<GalleryMedia | null>(null);
  const [preview, setPreview] = useState<GalleryMedia | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const fetchImages = () => {
    setLoading(true);
    galleryService.getAll().then(setImages).finally(() => setLoading(false));
  };

  useEffect(() => { fetchImages(); }, []);

  const videoCount = images.filter(isVideo).length;
  const imageCount = images.length - videoCount;

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await galleryService.delete(deleteTarget.id);
      toast.success(isVideo(deleteTarget) ? 'Video deleted' : 'Image deleted');
      setDeleteTarget(null);
      fetchImages();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append('images', f));
      await galleryService.upload(fd);
      const hasVideo = Array.from(files).some((f) => f.type.startsWith('video/'));
      toast.success(hasVideo ? 'Media uploaded' : 'Image uploaded');
      fetchImages();
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg[0] : msg || 'Upload failed. Check Cloudinary cloud name.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const thumbSrc = (item: GalleryMedia) =>
    isVideo(item) ? videoThumbnailUrl(item.url, item.thumbnailUrl) : resolveMediaUrl(item.url);

  const subtitle =
    images.length === 0
      ? 'No uploaded media yet — use Upload Media to add photos or videos'
      : videoCount > 0 && imageCount > 0
        ? `${imageCount} image${imageCount === 1 ? '' : 's'} · ${videoCount} video${videoCount === 1 ? '' : 's'}`
        : videoCount > 0
          ? `${videoCount} video${videoCount === 1 ? '' : 's'} uploaded`
          : `${imageCount} image${imageCount === 1 ? '' : 's'} uploaded`;

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle={subtitle}
        actions={
          <>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/mp4,video/webm,video/quicktime"
              style={{ display: 'none' }}
              onChange={(e) => handleUpload(e.target.files)}
            />
            <AdminButton
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              icon={
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              }
            >
              {uploading ? 'Uploading…' : 'Upload Media'}
            </AdminButton>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        <AnimatePresence>
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--admin-border)',
              }}
            >
              {isVideo(img) ? (
                <>
                  <img
                    src={thumbSrc(img)}
                    alt={img.alt || 'Gallery video'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      padding: '4px 8px',
                      borderRadius: 6,
                      backgroundColor: 'rgba(14,14,13,0.7)',
                      color: '#F8F6F2',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Video
                  </div>
                </>
              ) : (
                <img
                  src={thumbSrc(img)}
                  alt={img.alt || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}

              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(14,14,13,0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'background-color 0.25s',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(14,14,13,0.55)';
                  (e.currentTarget.querySelector('.gallery-actions') as HTMLElement)!.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(14,14,13,0)';
                  (e.currentTarget.querySelector('.gallery-actions') as HTMLElement)!.style.opacity = '0';
                }}
              >
                <div className="gallery-actions" style={{ opacity: 0, transition: 'opacity 0.2s', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setPreview(img)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.25)',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(img)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(220,38,38,0.2)',
                      border: '1px solid rgba(220,38,38,0.4)',
                      color: '#ff7070',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: images.length * 0.04 }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            aspectRatio: '1',
            border: '2px dashed var(--admin-border)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-gold)';
            e.currentTarget.style.backgroundColor = 'rgba(199,161,90,0.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--admin-border)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--admin-text-3)" strokeWidth="1">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--admin-text-3)', textAlign: 'center', padding: '0 12px' }}>
            Add image or video
          </p>
        </motion.div>
      </div>

      {images.length === 0 && (
        <p
          style={{
            marginTop: 24,
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--admin-text-2)',
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          Catalogue photos on the public Gallery page are built into the website. Only media you upload here (Cloudinary) appears in this admin list and is added on top of those.
        </p>
      )}

      <AnimatePresence>
        {preview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 500,
                backgroundColor: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(10px)',
              }}
              onClick={() => setPreview(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 501,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                pointerEvents: 'none',
              }}
            >
              <div style={{ pointerEvents: 'all', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                {isVideo(preview) ? (
                  <video
                    src={resolveMediaUrl(preview.url)}
                    controls
                    autoPlay
                    playsInline
                    style={{
                      maxHeight: '80vh',
                      maxWidth: '80vw',
                      borderRadius: '8px',
                      boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                      background: '#000',
                    }}
                  />
                ) : (
                  <img
                    src={resolveMediaUrl(preview.url)}
                    alt={preview.alt || ''}
                    style={{
                      maxHeight: '80vh',
                      maxWidth: '80vw',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                    }}
                  />
                )}
                <button
                  onClick={() => setPreview(null)}
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    right: '-16px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={!!deleteTarget}
        title={deleteTarget && isVideo(deleteTarget) ? 'Delete video?' : 'Delete image?'}
        description="This item will be permanently removed from the gallery."
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
        confirmLabel="Delete"
        isDangerous
      />
    </>
  );
}
