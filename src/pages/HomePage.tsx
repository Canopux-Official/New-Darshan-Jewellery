import Hero from '../components/sections/Hero';
import BrandStory from '../components/sections/BrandStory';
import MetalRates from '../components/sections/MetalRates';
import Collections from '../components/sections/Collections';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import Craftsmanship from '../components/sections/Craftsmanship';
import Testimonials from '../components/sections/Testimonials';
import InstagramGallery from '../components/sections/InstagramGallery';
import VisitStore from '../components/sections/VisitStore';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandStory />
      <MetalRates />
      <Collections />
      <FeaturedProducts />
      <Craftsmanship />
      <Testimonials />
      <InstagramGallery />
      <VisitStore />
    </main>
  );
}
