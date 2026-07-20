/** Site SEO helpers — canonical host for future .in domain. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://newdarshanjewellery.in').replace(/\/$/, '');
export const SITE_NAME = 'New Darshan Jewellery';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/New-Darshan-Jewellery-Hero.png`;

export const DEFAULT_TITLE =
  'New Darshan Jewellery | Gold & Silver Jewellery in Ghasipura, Keonjhar';

export const DEFAULT_DESCRIPTION =
  'Premium BIS hallmarked gold and silver jewellery in Ghasipura, Keonjhar, Odisha. Bridal sets, necklaces, chains, bangles and more — visit our showroom or enquire on WhatsApp.';

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function truncateMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function pageTitle(segment: string): string {
  return `${segment} | ${SITE_NAME}`;
}

export function buildLocalBusinessJsonLd(settings: {
  storeName: string;
  phone: string;
  address: string;
  weekdayHours: string;
  email?: string;
  googleMapsUrl?: string | null;
}) {
  const lines = settings.address.split('\n').map((l) => l.trim()).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': ['JewelryStore', 'LocalBusiness'],
    name: settings.storeName || SITE_NAME,
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Thana Chhak',
      addressLocality: 'Ghasipura',
      addressRegion: 'Odisha',
      postalCode: '758015',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.213185,
      longitude: 86.114279,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '20:30',
      description: settings.weekdayHours,
    },
    hasMap: settings.googleMapsUrl || undefined,
    areaServed: ['Ghasipura', 'Anandapur', 'Keonjhar', 'Odisha'],
    priceRange: '₹₹₹',
    description: DEFAULT_DESCRIPTION,
    sameAs: [] as string[],
    // Keep full address text available for NAP consistency
    disambiguatingDescription: lines.join(', '),
  };
}

export function buildProductJsonLd(product: {
  name: string;
  description?: string;
  images?: string[];
  purity?: string;
  weight?: string;
  priceValue?: number;
  slug: string;
}) {
  const images = (product.images || []).map((src) =>
    src.startsWith('http') ? src : absoluteUrl(src),
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: truncateMeta(product.description || `${product.name} from ${SITE_NAME}`),
    image: images.length ? images : [DEFAULT_OG_IMAGE],
    brand: { '@type': 'Brand', name: SITE_NAME },
    material: product.purity ? `${product.purity} gold` : undefined,
    weight: product.weight
      ? { '@type': 'QuantitativeValue', value: product.weight, unitText: 'g' }
      : undefined,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.slug}`),
      availability: 'https://schema.org/InStoreOnly',
      priceCurrency: 'INR',
      ...(typeof product.priceValue === 'number' && product.priceValue > 0
        ? { price: product.priceValue }
        : {}),
      seller: { '@type': 'JewelryStore', name: SITE_NAME },
    },
  };
}

export const STATIC_PAGE_META: Record<
  string,
  { title: string; description: string; path: string }
> = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  about: {
    title: pageTitle('About Us — Jewellers in Ghasipura, Keonjhar'),
    description:
      'Family-run jewellers in Ghasipura, Keonjhar — trusted craftsmanship, transparent pricing, and BIS hallmarked gold & silver jewellery.',
    path: '/about',
  },
  contact: {
    title: pageTitle('Contact — Ghasipura, Keonjhar Showroom'),
    description:
      'Visit New Darshan Jewellery at Thana Chhak, Ghasipura, Anandapur, Keonjhar, Odisha. Call or WhatsApp +91-9078333946.',
    path: '/contact',
  },
  gallery: {
    title: pageTitle('Jewellery Gallery'),
    description:
      'Browse bridal sets, gold necklaces, bangles, chains, earrings and silver jewellery from our Ghasipura, Keonjhar showroom.',
    path: '/gallery',
  },
  rates: {
    title: pageTitle("Today's Gold & Silver Rates — Keonjhar"),
    description:
      "Check today's indicative 22K, 24K gold and silver rates at New Darshan Jewellery, Ghasipura. Final prices confirmed in store.",
    path: '/rates',
  },
  collections: {
    title: pageTitle('Gold & Silver Collections'),
    description:
      'Explore bridal, necklaces, chains, bangles, bracelets, earrings, pendants and silver — hallmarked jewellery in Ghasipura, Keonjhar.',
    path: '/collections',
  },
  privacy: {
    title: pageTitle('Privacy Policy'),
    description:
      'How New Darshan Jewellery handles enquiries and visitor information at our Ghasipura, Keonjhar showroom and website.',
    path: '/privacy-policy',
  },
  terms: {
    title: pageTitle('Terms of Service'),
    description:
      'Website terms for New Darshan Jewellery — rates, product availability, and in-store purchase policies in Ghasipura, Keonjhar.',
    path: '/terms-of-service',
  },
  notFound: {
    title: pageTitle('Page Not Found'),
    description: 'The page you are looking for could not be found on New Darshan Jewellery.',
    path: '/404',
  },
};
