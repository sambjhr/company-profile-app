import HargaLayanan from "@/components/layanan/HargaLayanan";
import ServicesComplete from "@/components/layanan/ServicesComplete";
import Testimonials from "@/components/layanan/Testimonials";

export default function LayananPage(){
  return (
    <div>
      <ServicesComplete />
      <HargaLayanan />
      <Testimonials />
    </div>
  )
}