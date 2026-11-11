import { ArrowRight, Building2, GraduationCap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import img from "@/assets/tender-building.jpg";
import { Blueprint, Reveal, scrollToId } from "./shared";

const DIRS = [
  { icon: Wrench, t: "Капитальный ремонт зданий и сооружений" },
  { icon: GraduationCap, t: "Строительство школ и больниц" },
  { icon: Building2, t: "Строительство жилых комплексов" },
];

export function Tenders() {
  return (
    <section id="tenders" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1680px] items-stretch lg:grid-cols-[1fr_1.15fr]">
        <div className="relative z-10 px-5 py-28 md:px-10 lg:py-36 lg:pr-16">
          <Reveal>
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              <span className="h-px w-10 bg-primary-glow" /> Тендеры и госзаказ
            </div>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-[44px]">
              Документация для крупных строительных проектов <span className="text-gradient">и тендеров</span>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Помогаем строительным компаниям, подрядчикам и проектным организациям подготовить необходимую
              документацию для участия в проектах и выполнения строительных работ.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Разрабатываем проектную документацию для объектов капитального ремонта, строительства социальных
              учреждений, жилых комплексов и производственных зданий.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-10 grid gap-4 sm:grid-cols-3">
            {DIRS.map((d) => (
              <div key={d.t} className="border-l-2 border-primary/70 bg-background-2 p-4">
                <d.icon className="h-7 w-7 text-primary-glow" strokeWidth={1.4} />
                <div className="mt-3 text-sm font-semibold leading-snug">{d.t}</div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={250}>
            <Button variant="hero" size="xl" className="mt-10" onClick={() => scrollToId("contact")}>
              Обсудить тендер <ArrowRight />
            </Button>
          </Reveal>
        </div>
        <div className="relative min-h-[420px] lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]">
          <img src={img} alt="Строительство крупного общественного здания" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/30" />
          <Blueprint className="absolute inset-0 h-full w-full opacity-30" />
          <div className="absolute bottom-6 right-6 border border-primary-glow/50 bg-background/70 px-5 py-4 backdrop-blur-md">
            <div className="font-display text-3xl font-semibold text-primary-glow">44-ФЗ · 223-ФЗ</div>
            <div className="text-xs text-muted-foreground">Документация для участия в закупках</div>
          </div>
        </div>
      </div>
    </section>
  );
}
