import Features from "../components/features";
import Hero from "../components/hero";
import Releases from "../components/releases";
import Screenshots from "../components/screenshots";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <Features />
      <Screenshots />
      <Releases />
      <SiteFooter />
    </>
  );
}
