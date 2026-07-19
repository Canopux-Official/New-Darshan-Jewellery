import Hero from '../components/sections/Hero';
import BrandStory from '../components/sections/BrandStory';
import MetalRates from '../components/sections/MetalRates';
import Collections from '../components/sections/Collections';
import Craftsmanship from '../components/sections/Craftsmanship';
import Testimonials from '../components/sections/Testimonials';
import VisitStore from '../components/sections/VisitStore';
import OfferStickyNotes from '../components/sections/OfferStickyNotes';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandStory />
      <MetalRates />
      <Collections />
      <Craftsmanship />
      <Testimonials />
      <VisitStore />
      <OfferStickyNotes />
    </main>
  );
}
