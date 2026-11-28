import { BRAND, conceptDir } from "@/config/brand";
import { Benefits } from "@/components/sections/benefits";
import { FaqList } from "@/components/sections/faq-list";
import { FinalCta } from "@/components/sections/final-cta";
import { Founder } from "@/components/sections/founder";
import { Hero } from "@/components/sections/hero";
import { ModulesGrid } from "@/components/sections/modules-grid";
import { Pricing } from "@/components/sections/pricing";
import { Referral } from "@/components/sections/referral";
import { Testimonials } from "@/components/sections/testimonials";
import { WorkshopsList } from "@/components/sections/workshops-list";
import { JsonLd } from "@/components/site/json-ld";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: site.name,
          slogan: site.slogan,
          description: site.description,
          url: site.url,
          logo: `${site.url}${BRAND.assetsPath}/favicons/${conceptDir[BRAND.logoConcept]}/icon-512.png`,
        }}
      />
      <Hero />
      <Benefits />
      <ModulesGrid />
      <Founder />
      <Pricing />
      <WorkshopsList />
      <Referral />
      <Testimonials />
      <FaqList />
      <FinalCta />
    </>
  );
}
