import CategorySection from "./components/homepage/CategorySection";
import Hero from "./components/homepage/hero";
import Section_1 from "./components/homepage/section_1";
import SocialMediaSection from "./components/homepage/SocialMediaSelection";
import TrendingProducts from "./components/homepage/trendingProducts";

export default function Home() {
  
  return (
    <main>
      <Hero/>
      <Section_1/>
      {/* <CategorySection/> */}
      <TrendingProducts />
      <SocialMediaSection/>
    </main>
  );
}
