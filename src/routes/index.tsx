import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Steps } from "@/components/site/Steps";
import { Tenders } from "@/components/site/Tenders";
import { Industries } from "@/components/site/Industries";
import { Advantages } from "@/components/site/Advantages";
import { Portfolio } from "@/components/site/Portfolio";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "АС-проект — ППР, ТК, ППР с ПС, ППРв и ПОС по всей России" },
      { name: "description", content: "Инженерно-проектная компания «АС-проект»: разработка проектов производства работ, технологических карт и ПОС для строительных объектов и тендеров." },
      { property: "og:title", content: "АС-проект — документация для уверенного строительства" },
      { property: "og:description", content: "ППР, ТК, ППР с ПС, ППРв и ПОС для строительных объектов по всей России." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Steps />
        <Tenders />
        <Industries />
        <Advantages />
        <Portfolio />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
