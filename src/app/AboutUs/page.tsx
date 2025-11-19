import CompanyHistory from "@/components/aboutUs/CompanyHistory";
import Culture from "@/components/aboutUs/Culture";
import Jumbotron from "@/components/aboutUs/Jumbotron";
import TeamsSection from "@/components/aboutUs/Team";

export default function AboutUsPage(){
  return (
    <div>
      <Jumbotron />
      <CompanyHistory />
      <TeamsSection />
      <Culture />
    </div>
  )
}