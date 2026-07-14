import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge from '../components/ui/StatusBadge';
import AdminButton from '../components/ui/AdminButton';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { bannersService } from '../services/banners.service';
import { resolveMediaUrl } from '../../utils/cloudinary';
import { useToast } from '../context/ToastContext';

export default function AdminBanners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [preview, setPreview] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<{ id: string } | null>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const fetchBanners = () => {
    setLoading(true);
    bannersService.getAll().then(setBanners).finally(() => setLoading(false));
  };

  useEffect(() => { fetchBanners(); }, []);

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await bannersService.toggleActive(id, !current);
      toast.success(current ? 'Banner disabled' : 'Banner enabled');
      fetchBanners();
    } catch {
      toast.error('Failed to update banner');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await bannersService.delete(deleteTarget.id);
      toast.success('Banner deleted');
      setDeleteTarget(null);
      fetchBanners();
    } catch {
      toast.error('Failed to delete banner');
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files?.[0]) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', files[0]);
      fd.append('title', files[0].name.replace(/\.[^.]+$/, '') || 'New Banner');
      fd.append('isActive', 'true');
      await bannersService.create(fd);
      toast.success('Banner uploaded');
      fetchBanners();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Upload failed — check Cloudinary credentials');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleReplace = async (files: FileList | null) => {
    if (!files?.[0] || !replaceRef.current) return;
    try {
      const fd = new FormData();
      fd.append('image', files[0]);
      await bannersService.update(replaceRef.current.id, fd);
      toast.success('Banner image replaced');
      fetchBanners();
    } catch {
      toast.error('Failed to replace image');
    } finally {
      replaceRef.current = null;
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const getImageSrc = (url: string) => resolveMediaUrl(url);

  return (
    <>
      <PageHeader
        title="Hero Banners"
        subtitle={loading ? 'Loading…' : `${banners.length} banners · ${banners.filter(b => b.isActive).length} active`}
        actions={
          <>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleUpload(e.target.files)} />
            <input ref={replaceInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleReplace(e.target.files)} />
            <AdminButton variant="primary" onClick={() => fileRef.current?.click()} disabled={uploading}
              icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
            >
              {uploading ? 'Uploading…' : 'Upload Banner'}
            </AdminButton>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        <AnimatePresence>
          {banners.map((banner, i) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              style={{ backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '12px', overflow: 'hidden' }}
            >
              {/* Preview image */}
              <div
                style={{ position: 'relative', height: '180px', cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => setPreview(banner)}
              >
                <img src={getImageSrc(banner.imageUrl)} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Order badge */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'rgba(14,14,13,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>{banner.order}</span>
                </div>
                {/* Preview icon */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'rgba(14,14,13,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--admin-text)', marginBottom: '2px' }}>{banner.title}</h3>
                    {banner.subtitle && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--admin-text-2)' }}>{banner.subtitle}</p>}
                  </div>
                  <StatusBadge variant={banner.isActive ? 'active' : 'inactive'} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <AdminButton variant="secondary" size="sm" style={{ flex: 1 }}
                    onClick={() => { replaceRef.current = { id: banner.id }; replaceInputRef.current?.click(); }}
                    icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>}
                  >Replace</AdminButton>
                  <button
                    onClick={() => toggleActive(banner.id, banner.isActive)}
                    title={banner.isActive ? 'Deactivate' : 'Activate'}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${banner.isActive ? 'var(--admin-border)' : 'var(--color-gold)'}`, backgroundColor: banner.isActive ? 'transparent' : 'rgba(199,161,90,0.08)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: banner.isActive ? 'var(--admin-text-2)' : 'var(--color-gold)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                  >
                    {banner.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(banner)}
                    style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid rgba(220,38,38,0.2)', backgroundColor: 'rgba(220,38,38,0.06)', cursor: 'pointer', color: 'var(--admin-danger)', flexShrink: 0 }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Upload placeholder card */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: banners.length * 0.08 }}
          style={{ border: '2px dashed var(--admin-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px', gap: '12px', cursor: 'pointer', transition: 'border-color 0.2s, background-color 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.backgroundColor = 'rgba(199,161,90,0.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <div style={{ color: 'var(--admin-text-3)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--admin-text-2)' }}>Upload new banner</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--admin-text-3)' }}>Recommended: 1920 × 800px</p>
        </motion.div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 500, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} onClick={() => setPreview(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ position: 'fixed', inset: 0, zIndex: 501, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', pointerEvents: 'none' }}>
              <div style={{ pointerEvents: 'all', maxWidth: '900px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
                <img src={getImageSrc(preview.imageUrl)} alt={preview.title} style={{ width: '100%', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }} />
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#fff', marginTop: '16px', textAlign: 'center' }}>{preview.title}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete "${deleteTarget?.title}"?`}
        description="This will permanently remove the banner from the website."
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
        confirmLabel="Delete"
        isDangerous
      />
    </>
  );
}
