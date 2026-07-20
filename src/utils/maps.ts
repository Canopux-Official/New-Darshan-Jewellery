const STORE_LAT = 21.213185;
const STORE_LNG = 86.114279;

/** Build a Google Maps directions URL to the store. */
export function buildDirectionsUrl(origin?: { lat: number; lng: number }): string {
  const destination = `${STORE_LAT},${STORE_LNG}`;
  const params = new URLSearchParams({
    api: '1',
    destination,
    travelmode: 'driving',
  });
  if (origin) {
    params.set('origin', `${origin.lat},${origin.lng}`);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Opens Google Maps directions to the store.
 * Tries the user's GPS location as origin; falls back to destination-only
 * (Maps will usually start from the user's current location).
 */
export function openStoreDirections(): void {
  const fallback = () => {
    window.open(buildDirectionsUrl(), '_blank', 'noopener,noreferrer');
  };

  if (!navigator.geolocation) {
    fallback();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      window.open(
        buildDirectionsUrl({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        '_blank',
        'noopener,noreferrer',
      );
    },
    () => fallback(),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60_000 },
  );
}

export { STORE_LAT, STORE_LNG };
