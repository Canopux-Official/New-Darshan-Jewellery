import Hero from '../components/sections/Hero';
import BrandStory from '../components/sections/BrandStory';
import MetalRates from '../components/sections/MetalRates';
import Collections from '../components/sections/Collections';
import Craftsmanship from '../components/sections/Craftsmanship';
import Testimonials from '../components/sections/Testimonials';
import VisitStore from '../components/sections/VisitStore';
import OfferStickyNotes from '../components/sections/OfferStickyNotes';
import PageMeta from '../components/seo/PageMeta';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { STATIC_PAGE_META } from '../utils/seo';

export default function HomePage() {
  const meta = STATIC_PAGE_META.home;
  const {
    showBrandStory,
    showRates,
    showCollections,
    showCraftsmanship,
    showTestimonials,
    showVisitStore,
    showOffers,
  } = useStoreSettings();

  return (
    <main>
      <PageMeta title={meta.title} description={meta.description} path={meta.path} />
      <Hero />
      {showBrandStory && <BrandStory />}
      {showRates && <MetalRates />}
      {showCollections && <Collections />}
      {showCraftsmanship && <Craftsmanship />}
      {showTestimonials && <Testimonials />}
      {showVisitStore && <VisitStore />}
      {showOffers && <OfferStickyNotes />}
    </main>
  );
}
