import { About } from "@/components/home/homepage/about";
import { FAQ } from "@/components/home/homepage/faq";
import { Hero } from "@/components/home/homepage/hero";
import { Pricing } from "@/components/home/homepage/pricing";
import { RequestDemo } from "@/components/home/homepage/requestDemo";
import { TryLabs } from "@/components/home/homepage/tryLabs";
import { WhyChooseAPIHooX } from "@/components/home/homepage/whyChooseApiHoox";
import Footer from "@/components/home/navigation/footer";
import HomeNavBar from "@/components/home/navigation/navbar";

export default function Home() {
  return (
    <>
      <HomeNavBar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="z-10  items-center justify-center">
          <Hero />
          <WhyChooseAPIHooX />
          <About />
          <Pricing />
          <TryLabs />
          <RequestDemo />
          <FAQ />
        </div>
      </main>

      <Footer />
    </>
  );
}
