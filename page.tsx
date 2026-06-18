import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Services from "@/components/sections/Services";
import GrowthFramework from "@/components/sections/GrowthFramework";
import WhyVantaX from "@/components/sections/WhyVantaX";
import FreeAudit from "@/components/sections/FreeAudit";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#09090b] min-h-screen">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <GrowthFramework />
      <WhyVantaX />
      <FreeAudit />
      <FAQ />
      <Contact />
      <Booking />
      <Footer />
    </main>
  );
}
