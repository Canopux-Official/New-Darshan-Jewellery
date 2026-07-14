import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  label?: string;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
}

export default function ImageUploader({ label = 'Upload Images', maxFiles = 5, onFilesChange }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, maxFiles - fileList.length);
    const urls = newFiles.map((f) => URL.createObjectURL(f));
    const updated = [...fileList, ...newFiles].slice(0, maxFiles);
    const updatedPreviews = [...previews, ...urls].slice(0, maxFiles);
    setFileList(updated);
    setPreviews(updatedPreviews);
    onFilesChange?.(updated);
  };

  const removePreview = (i: number) => {
    const updatedFiles = fileList.filter((_, idx) => idx !== i);
    setFileList(updatedFiles);
    setPreviews((p) => p.filter((_, idx) => idx !== i));
    onFilesChange?.(updatedFiles);
  };

  return (
    <div>
      {label && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--admin-text-2)', marginBottom: '8px', letterSpacing: '0.03em' }}>
          {label}
        </p>
      )}

      {/* Drop zone */}
      <motion.div
        animate={{ borderColor: dragging ? 'var(--color-gold)' : 'var(--admin-border)', backgroundColor: dragging ? 'rgba(199,161,90,0.04)' : 'var(--admin-bg)' }}
        transition={{ duration: 0.2 }}
        style={{ border: '2px dashed var(--admin-border)', borderRadius: '8px', padding: '32px 24px', textAlign: 'center', cursor: 'pointer' }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
        <div style={{ color: 'var(--admin-text-3)', marginBottom: '10px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--admin-text-2)', marginBottom: '4px' }}>
          Drag & drop images here
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: 'var(--admin-text-3)' }}>
          or click to browse · up to {maxFiles} images
        </p>
      </motion.div>

      {/* Previews */}
      {previews.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          {previews.map((src, i) => (
            <div key={i} style={{ position: 'relative', width: '72px', height: '72px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
              <img src={src} alt={`Preview ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <button
                onClick={() => removePreview(i)}
                style={{ position: 'absolute', top: '3px', right: '3px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(14,14,13,0.7)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
