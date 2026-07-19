import { useEffect } from 'react';
import { useStoreSettings } from '../../context/StoreSettingsContext';
import { buildLocalBusinessJsonLd } from '../../utils/seo';

const SCRIPT_ID = 'local-business-json-ld';

/** Injects JewelryStore / LocalBusiness schema once for the public site. */
export default function LocalBusinessJsonLd() {
  const settings = useStoreSettings();

  useEffect(() => {
    const data = buildLocalBusinessJsonLd(settings);
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [settings]);

  return null;
}
