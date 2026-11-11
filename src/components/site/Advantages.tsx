import { Clock, Ruler, MessagesSquare, ShieldCheck, Target } from "lucide-react";
import { Reveal, SectionTitle } from "./shared";

const ITEMS = [
  { icon: Target, t: "Индивидуальный подход", d: "Учитываем специфику объекта и требования конкретного проекта, а не используем универсальные шаблоны." },
  { icon: Ruler, t: "Инженерная проработка", d: "Изучаем исходные данные и реальные условия выполнения работ, применяем обоснованные технические решения." },
  { icon: Clock, t: "Соблюдение сроков", d: "Фиксируем сроки разработки на старте и выдерживаем их на каждом этапе." },
  { icon: MessagesSquare, t: "Постоянная связь", d: "Поддерживаем коммуникацию с заказчиком на всех этапах разработки документации." },
  { icon: ShieldCheck, t: "Сопровождение проекта", d: "Оперативно рассматриваем замечания, корректируем документацию и помогаем довести проект до результата." },
];

export function Advantages() {
  return (
    <section className="border-y border-border/60 bg-background-2">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-[0.8fr_2fr] lg:py-28">
        <SectionTitle title="Профессиональный подход на каждом этапе" className="lg:mb-0 [&_span]:hidden" />
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={i * 90} className="h-full">
              <div className="group h-full bg-background-2 p-8 transition-colors hover:bg-card">
                <it.icon className="h-9 w-9 text-primary" strokeWidth={1.4} />
                <h3 className="mt-6 font-display text-lg font-semibold">{it.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
