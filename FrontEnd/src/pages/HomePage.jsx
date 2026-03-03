import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import FeaturedCars from "../components/FeaturedCars";
import BrandsSection from "../components/BrandsSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedCars />
      <BrandsSection />
      <Footer />
    </div>
  );
}
