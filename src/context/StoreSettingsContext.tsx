import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { publicSettingsService } from '../services/publicApi';

export interface PublicStoreSettings {
  storeName: string;
  phone: string;
  whatsapp: string;
  address: string;
  weekdayHours: string;
  sundayHours: string;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  googleMapsUrl?: string | null;
  email?: string;
}

const DEFAULTS: PublicStoreSettings = {
  storeName: 'Krishna Jewellers',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  address: '12, Heritage Lane, Ahmedabad, Gujarat 380001',
  weekdayHours: '10:00 AM – 8:00 PM',
  sundayHours: '11:00 AM – 6:00 PM',
};

const StoreSettingsContext = createContext<PublicStoreSettings>(DEFAULTS);

export function StoreSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PublicStoreSettings>(DEFAULTS);

  useEffect(() => {
    publicSettingsService
      .get()
      .then((data) =>
        setSettings({
          storeName: data.storeName || DEFAULTS.storeName,
          phone: data.phone || DEFAULTS.phone,
          whatsapp: data.whatsapp || DEFAULTS.whatsapp,
          address: data.address || DEFAULTS.address,
          weekdayHours: data.weekdayHours || DEFAULTS.weekdayHours,
          sundayHours: data.sundayHours || DEFAULTS.sundayHours,
          instagramUrl: data.instagramUrl,
          facebookUrl: data.facebookUrl,
          googleMapsUrl: data.googleMapsUrl,
          email: data.email,
        }),
      )
      .catch(() => {/* keep defaults */});
  }, []);

  return <StoreSettingsContext.Provider value={settings}>{children}</StoreSettingsContext.Provider>;
}

export function useStoreSettings() {
  return useContext(StoreSettingsContext);
}
