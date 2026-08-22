import { Hero } from "../components/home/Hero";
import { FeatureBadges } from "../components/home/FeatureBadges";
import { QuickCategories } from "../components/home/QuickCategories";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Brands } from "../components/home/Brands";
import { Testimonials } from "../components/home/Testimonials";
import { FAQ } from "../components/home/FAQ";
import { CTABanner } from "../components/home/CTABanner";

export function Home() {
  return (
    <>
      <Hero />
      <FeatureBadges />
      <QuickCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Brands />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
