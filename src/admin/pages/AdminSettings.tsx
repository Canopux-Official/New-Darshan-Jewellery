import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import AdminButton from '../components/ui/AdminButton';
import FormField from '../components/ui/FormField';
import { settingsService, type StoreSettings as ApiSettings } from '../services/settings.service';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import type { StoreSettings } from '../types/admin';

const EMPTY: StoreSettings = {
  storeName: '',
  adminName: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  weekdayHours: '',
  sundayHours: '',
  instagramUrl: '',
  facebookUrl: '',
  googleMapsUrl: '',
};

interface SettingSection {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fields: (keyof StoreSettings)[];
}

const SECTIONS: SettingSection[] = [
  {
    title: 'Admin Account',
    subtitle: 'Your login and contact details.',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    fields: ['adminName', 'email'],
  },
  {
    title: 'Store Information',
    subtitle: 'Displayed on the website and in communications.',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    fields: ['storeName', 'address'],
  },
  {
    title: 'Contact Details',
    subtitle: 'Used for customer enquiries and WhatsApp.',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    fields: ['phone', 'whatsapp'],
  },
  {
    title: 'Opening Hours',
    subtitle: 'Shown in the "Visit Our Store" section.',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    fields: ['weekdayHours', 'sundayHours'],
  },
  {
    title: 'Social & Maps',
    subtitle: 'Links shown in the footer and visit section.',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
    fields: ['instagramUrl', 'facebookUrl', 'googleMapsUrl'],
  },
];

const LABELS: Record<keyof StoreSettings, string> = {
  adminName: 'Admin Name',
  email: 'Email Address',
  storeName: 'Store Name',
  address: 'Store Address',
  phone: 'Phone Number',
  whatsapp: 'WhatsApp Number',
  weekdayHours: 'Weekday Hours (Mon–Sat)',
  sundayHours: 'Sunday Hours',
  instagramUrl: 'Instagram URL',
  facebookUrl: 'Facebook URL',
  googleMapsUrl: 'Google Maps URL',
};

const PLACEHOLDERS: Partial<Record<keyof StoreSettings, string>> = {
  email: 'admin@yourstore.in',
  address: 'Shop No., Street, City, State — PIN',
  phone: '+91 XXXXX XXXXX',
  whatsapp: '91XXXXXXXXXX (no spaces/dashes)',
  weekdayHours: '10:00 AM – 8:00 PM',
  sundayHours: '11:00 AM – 6:00 PM',
  instagramUrl: 'https://instagram.com/…',
  facebookUrl: 'https://facebook.com/…',
  googleMapsUrl: 'https://maps.google.com/…',
};

function fromApi(data: ApiSettings): StoreSettings {
  return {
    storeName: data.storeName || '',
    adminName: data.adminName || '',
    email: data.email || '',
    phone: data.phone || '',
    whatsapp: data.whatsapp || '',
    address: data.address || '',
    weekdayHours: data.weekdayHours || '',
    sundayHours: data.sundayHours || '',
    instagramUrl: data.instagramUrl || '',
    facebookUrl: data.facebookUrl || '',
    googleMapsUrl: data.googleMapsUrl || '',
  };
}

export default function AdminSettings() {
  const toast = useToast();
  const { refreshUser } = useAuth();
  const [settings, setSettings] = useState<StoreSettings>(EMPTY);
  const [saved, setSaved] = useState<StoreSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsService
      .get()
      .then((data) => {
        const mapped = fromApi(data);
        setSettings(mapped);
        setSaved(mapped);
      })
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(saved);
  const set = (k: keyof StoreSettings, v: string) => setSettings((s) => ({ ...s, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await settingsService.update(settings);
      const mapped = fromApi(updated);
      setSettings(mapped);
      setSaved(mapped);
      await refreshUser();
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage store information and admin preferences."
        actions={
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <AdminButton variant="secondary" disabled={!isDirty || saving || loading} onClick={() => setSettings(saved)}>Discard</AdminButton>
            <AdminButton variant="primary" disabled={!isDirty || saving || loading} onClick={handleSave}>
              {saving ? 'Saving…' : 'Save Changes'}
            </AdminButton>
          </div>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '720px' }}>
        {SECTIONS.map((section, si) => (
          <motion.div key={section.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: si * 0.07 }}
            style={{ backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '12px', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 24px', borderBottom: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
              <div style={{ color: 'var(--color-gold)', opacity: 0.8 }}>{section.icon}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--admin-text)', marginBottom: '1px' }}>{section.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--admin-text-2)' }}>{section.subtitle}</p>
              </div>
            </div>

            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: section.fields.length === 1 ? '1fr' : '1fr 1fr', gap: '18px' }}>
              {section.fields.map((field) => (
                <div
                  key={field}
                  style={
                    field === 'address' || field === 'googleMapsUrl'
                      ? { gridColumn: '1 / -1' }
                      : {}
                  }
                >
                  <FormField
                    label={LABELS[field]}
                    value={settings[field] || ''}
                    placeholder={PLACEHOLDERS[field]}
                    onChange={(e) => set(field, e.target.value)}
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: SECTIONS.length * 0.07 }}
          style={{ backgroundColor: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: '12px', padding: '20px 24px' }}
        >
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--admin-danger)', marginBottom: '6px' }}>Danger Zone</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text-2)', marginBottom: '16px', lineHeight: 1.6 }}>
            These actions are irreversible. When you connect this dashboard to a backend, these will trigger permanent operations.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <AdminButton variant="danger" size="sm">Clear All Rates Cache</AdminButton>
            <AdminButton variant="danger" size="sm">Reset Gallery Order</AdminButton>
          </div>
        </motion.div>
      </div>
    </>
  );
}
