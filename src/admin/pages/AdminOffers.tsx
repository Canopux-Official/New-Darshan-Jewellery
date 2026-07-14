import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge from '../components/ui/StatusBadge';
import AdminButton from '../components/ui/AdminButton';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import FormField from '../components/ui/FormField';
import { offersService } from '../services/offers.service';

const STATUS_LABELS: Record<string, string> = { ACTIVE: 'Active', SCHEDULED: 'Scheduled', EXPIRED: 'Expired' };

export default function AdminOffers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [editTarget, setEditTarget] = useState<any | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newForm, setNewForm] = useState({ title: '', description: '', startDate: '', endDate: '', status: 'ACTIVE' });

  const fetchOffers = () => {
    offersService.getAll().then(setOffers);
  };

  useEffect(() => { fetchOffers(); }, []);

  const handleDelete = async () => { if (!deleteTarget) return; await offersService.delete(deleteTarget.id); setDeleteTarget(null); fetchOffers(); };
  const handleAdd = async () => {
    if (!newForm.title) return;
    await offersService.create(newForm);
    setNewForm({ title: '', description: '', startDate: '', endDate: '', status: 'ACTIVE' }); setAddOpen(false); fetchOffers();
  };
  const handleEdit = async () => {
    if (!editTarget) return;
    await offersService.update(editTarget.id, editTarget); setEditTarget(null); fetchOffers();
  };

  return (
    <>
      <PageHeader
        title="Offers & Promotions"
        subtitle={`${offers.filter(o => o.status === 'ACTIVE').length} active · ${offers.filter(o => o.status === 'SCHEDULED').length} scheduled`}
        actions={
          <AdminButton variant="primary" onClick={() => setAddOpen(true)}
            icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
          >
            Add Offer
          </AdminButton>
        }
      />

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '10px', overflow: 'hidden' }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
                {['Title', 'Description', 'Start Date', 'End Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--admin-text-2)', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {offers.map((offer, i) => (
                  <motion.tr key={offer.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    style={{ borderBottom: i < offers.length - 1 ? '1px solid var(--admin-border)' : 'none', transition: 'background-color 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--admin-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: offer.status === 'active' ? 'var(--admin-success)' : offer.status === 'scheduled' ? 'var(--admin-info)' : 'var(--admin-text-3)', flexShrink: 0 }} />
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--admin-text)', whiteSpace: 'nowrap' }}>{offer.title}</p>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text-2)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{offer.description}</p>
                    </td>
                    <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text-2)' }}>{offer.startDate}</p>
                    </td>
                    <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text-2)' }}>{offer.endDate}</p>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <StatusBadge variant={offer.status} label={STATUS_LABELS[offer.status]} />
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <AdminButton variant="secondary" size="sm" onClick={() => setEditTarget({ ...offer })}>Edit</AdminButton>
                        <AdminButton variant="danger" size="sm" onClick={() => setDeleteTarget(offer)}>Delete</AdminButton>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add / Edit modal */}
      <AnimatePresence>
        {(addOpen || editTarget) && (
          <OfferModal
            title={addOpen ? 'New Offer' : 'Edit Offer'}
            form={addOpen ? newForm : (editTarget || {})}
            setForm={(k, v) => addOpen ? setNewForm((f) => ({ ...f, [k]: v })) : setEditTarget((t: any) => t ? { ...t, [k]: v } : t)}
            onClose={() => { setAddOpen(false); setEditTarget(null); }}
            onSave={addOpen ? handleAdd : handleEdit}
          />
        )}
      </AnimatePresence>

      <ConfirmDialog open={!!deleteTarget} title={`Delete "${deleteTarget?.title}"?`} description="This offer will be permanently removed." onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} confirmLabel="Delete" isDangerous />
    </>
  );
}

function OfferModal({ title, form, setForm, onClose, onSave }: { title: string; form: Record<string, string>; setForm: (k: string, v: string) => void; onClose: () => void; onSave: () => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 400, backgroundColor: 'rgba(14,14,13,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}
        style={{ position: 'fixed', inset: 0, zIndex: 401, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', pointerEvents: 'none' }}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '12px', padding: '28px', maxWidth: '520px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', pointerEvents: 'all' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--admin-text)', marginBottom: '20px' }}>{title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <FormField label="Offer Title" required value={form.title} onChange={(e) => setForm('title', e.target.value)} />
            <FormField as="textarea" label="Description" rows={3} value={form.description} onChange={(e) => setForm('description', e.target.value)} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <FormField label="Start Date" type="date" value={form.startDate} onChange={(e) => setForm('startDate', e.target.value)} />
              <FormField label="End Date" type="date" value={form.endDate} onChange={(e) => setForm('endDate', e.target.value)} />
            </div>
            <FormField as="select" label="Status" value={form.status} onChange={(e) => setForm('status', e.target.value)}
              options={[{ value: 'active', label: 'Active' }, { value: 'scheduled', label: 'Scheduled' }, { value: 'expired', label: 'Expired' }]}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <AdminButton variant="secondary" onClick={onClose}>Cancel</AdminButton>
            <AdminButton variant="primary" onClick={onSave}>Save Offer</AdminButton>
          </div>
        </div>
      </motion.div>
    </>
  );
}
