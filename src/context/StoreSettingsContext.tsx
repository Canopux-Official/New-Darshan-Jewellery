import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { publicSettingsService } from '../services/publicApi';

export interface SectionVisibility {
  showRates: boolean;
  showBrandStory: boolean;
  showCollections: boolean;
  showCraftsmanship: boolean;
  showTestimonials: boolean;
  showVisitStore: boolean;
  showOffers: boolean;
  showGallery: boolean;
}

export interface PublicStoreSettings extends SectionVisibility {
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

const VISIBILITY_DEFAULTS: SectionVisibility = {
  showRates: true,
  showBrandStory: true,
  showCollections: true,
  showCraftsmanship: true,
  showTestimonials: true,
  showVisitStore: true,
  showOffers: true,
  showGallery: true,
};

const DEFAULTS: PublicStoreSettings = {
  storeName: 'New Darshan Jewellery',
  phone: '+91-9078333946',
  whatsapp: '919078333946',
  address:
    'New Darshan Jewellery\nThana Chhak\nGhasipura\nAnandapur\nKeonjhar\nOdisha – 758015',
  weekdayHours: '10:00 AM – 8:30 PM',
  sundayHours: '10:00 AM – 8:30 PM',
  googleMapsUrl: 'https://www.google.com/maps?q=21.213185,86.114279',
  ...VISIBILITY_DEFAULTS,
};

function boolOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

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
          googleMapsUrl: data.googleMapsUrl || DEFAULTS.googleMapsUrl,
          email: data.email,
          showRates: boolOrDefault(data.showRates, true),
          showBrandStory: boolOrDefault(data.showBrandStory, true),
          showCollections: boolOrDefault(data.showCollections, true),
          showCraftsmanship: boolOrDefault(data.showCraftsmanship, true),
          showTestimonials: boolOrDefault(data.showTestimonials, true),
          showVisitStore: boolOrDefault(data.showVisitStore, true),
          showOffers: boolOrDefault(data.showOffers, true),
          showGallery: boolOrDefault(data.showGallery, true),
        }),
      )
      .catch(() => {
        /* keep defaults */
      });
  }, []);

  return <StoreSettingsContext.Provider value={settings}>{children}</StoreSettingsContext.Provider>;
}

export function useStoreSettings() {
  return useContext(StoreSettingsContext);
}

export { VISIBILITY_DEFAULTS };
