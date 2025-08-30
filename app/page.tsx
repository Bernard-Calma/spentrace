import {
  ComparePlans,
  FeatureSection,
  Footer,
  Header,
  HeroSection,
  PlanSection,
} from "./components";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex w-full flex-col items-center justify-center">
        <HeroSection />
        <FeatureSection />
        <PlanSection />
        <ComparePlans />
      </main>
      <Footer />
    </>
  );
}
