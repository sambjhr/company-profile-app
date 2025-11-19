import HeroSection from "@/components/home/HeroSection"
import CompanyOverview from "@/components/home/CompanyOverview"
import ServicesPreview from "@/components/home/ServicesPreview"
import Testimonials from "@/components/home/Testimonials"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CompanyOverview />
      <ServicesPreview />
      <Testimonials />
    </div>
  )
};