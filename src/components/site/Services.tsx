import { ArrowRight } from "lucide-react";
import { Reveal, SectionTitle, scrollToId } from "./shared";

const ICON = "h-14 w-14 text-primary-glow";
const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const icons = [
  // helmet
  <svg key="a" viewBox="0 0 64 64" className={ICON} {...s}><path d="M8 44h48v6H8zM12 44c0-12 8-22 20-22s20 10 20 22" /><path d="M26 22v-6h12v6M32 16v28M20 30v14M44 30v14" /></svg>,
  // blueprint roll
  <svg key="b" viewBox="0 0 64 64" className={ICON} {...s}><path d="M10 14h40v36H10z" /><path d="M50 14a4 4 0 0 1 4 4v32a4 4 0 0 0-4-4" /><path d="M16 22h14v10H16zM34 22h10M34 28h10M16 38h28M16 44h20" /></svg>,
  // crane
  <svg key="c" viewBox="0 0 64 64" className={ICON} {...s}><path d="M20 56V10M26 56V10M20 10h6M8 16h48M20 16L8 22M26 16l20-6M50 16v14M46 30h8v6h-8zM14 56h18" /><path d="M20 24l6 6M26 24l-6 6M20 36l6 6M26 36l-6 6" /></svg>,
  // height worker
  <svg key="d" viewBox="0 0 64 64" className={ICON} {...s}><circle cx="26" cy="12" r="4" /><path d="M26 16v16l-6 14M26 32l8 14M18 24h16M40 56l14-30M8 56h48M44 46h8" /><path d="M34 22l6-4" /></svg>,
  // buildings
  <svg key="e" viewBox="0 0 64 64" className={ICON} {...s}><path d="M6 56h52M10 56V28h14v28M24 56V14h16v42M40 56V24h14v32" /><path d="M29 20h6M29 28h6M29 36h6M29 44h6M14 34h6M14 42h6M44 30h6M44 38h6M44 46h6" /></svg>,
];

const SERVICES = [
  { code: "ППР", name: "Проект производства работ", text: "Комплексная документация для организации и безопасного выполнения строительно-монтажных работ. Определяем последовательность операций, ресурсы, механизмы и требования к организации строительной площадки." },
  { code: "ТК", name: "Технологическая карта", text: "Подробное описание технологии выполнения отдельных видов строительных и монтажных работ. Разрабатываем как самостоятельный документ, так и в составе проекта производства работ." },
  { code: "ППР с ПС", name: "Проект производства работ с применением подъемных сооружений", text: "Разработка документации для безопасного использования башенных, автомобильных и других видов кранов, подъемников и подъемных механизмов." },
  { code: "ППРв", name: "Проект производства работ на высоте", text: "Организация работ на высоте с учетом требований безопасности, применяемого оборудования, средств защиты и особенностей строительного объекта." },
  { code: "ПОС", name: "Проект организации строительства", text: "Комплексное планирование строительства объекта: организация площадки, этапы работ, логистика, ресурсы и общая последовательность реализации проекта." },
];

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-[1680px] px-5 py-24 md:px-10 lg:py-32">
      <SectionTitle
        title="Документация, которая помогает строить"
        subtitle="Разрабатываем полный комплекс проектной и технологической документации для строительных, монтажных и производственных работ."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {SERVICES.map((sv, i) => (
          <Reveal key={sv.code} delay={i * 90}>
            <article className="card-eng group flex h-full flex-col p-7">
              {icons[i]}
              <div className="mt-7 font-display text-2xl font-semibold">{sv.code}</div>
              <div className="mt-1 text-sm font-semibold text-primary-glow">{sv.name}</div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{sv.text}</p>
              <button
                onClick={() => scrollToId("contact")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-primary-glow"
              >
                Подробнее <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export const DOC_TYPES = SERVICES.map((s) => s.code);
