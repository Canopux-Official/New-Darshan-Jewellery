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
  storeName: 'New Darshan Jewellery',
  phone: '+91-9078333946',
  whatsapp: '919078333946',
  address:
    'New Darshan Jewellery\nMain Road\nNear Thana Chhak\nGhasipura\nAnandapur\nKeonjhar\nOdisha – 758015',
  weekdayHours: '10:00 AM – 9:00 PM',
  sundayHours: '10:00 AM – 9:00 PM',
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
