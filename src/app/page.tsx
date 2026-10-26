import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Agents from "@/components/Agents";
import Testimonial from "@/components/Testimonial";
import CtaFooter from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Agents />
        <Testimonial />
      </main>
      <CtaFooter />
    </>
  );
}
