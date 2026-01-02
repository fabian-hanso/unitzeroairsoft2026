import Bento from "@/components/Bento/Bento";
import CTASection from "@/components/Home/CTASection/CTASection";
import FAQ from "@/components/Home/FAQ/FAQ";
import HeroSwiper from "@/components/Home/HeroSwiper/HeroSwiper";

export default function Home() {
  return (
    <>
      <HeroSwiper />
      <Bento />
      <CTASection />
      <FAQ />
    </>
  );
}
