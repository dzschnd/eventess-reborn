import type { FC } from "react";
import Hero from "./Hero";
import CatalogPreview from "./CatalogPreview";
import Features from "./Features";
import InvitationPreview from "./InvitationPreview";
import Faq from "./Faq";
import Cta from "./Cta";
import { PageLayout } from "../../layouts/PageLayout";
import ScrollReveal from "./components/ScrollReveal";

const Home: FC = () => {
  return (
    <PageLayout className="gap-[160px] px-4 pb-[160px] pt-[40px] sm:pb-[172px] md:pb-[190px] md:pt-[58px]">
      <ScrollReveal delay={120}>
        <Hero />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <CatalogPreview />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <Features />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <InvitationPreview />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <Faq />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <Cta />
      </ScrollReveal>
    </PageLayout>
  );
};

export default Home;
