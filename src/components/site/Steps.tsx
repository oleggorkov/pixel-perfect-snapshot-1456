import { ClipboardList, FileCheck2, PencilRuler, SearchCheck } from "lucide-react";
import { Reveal, SectionTitle } from "./shared";

const STEPS = [
  { icon: ClipboardList, t: "Получаем исходные данные", d: "Изучаем техническое задание, проектную документацию и особенности объекта." },
  { icon: SearchCheck, t: "Анализируем задачу", d: "Определяем необходимый состав документов, объем работ и сроки выполнения." },
  { icon: PencilRuler, t: "Разрабатываем документацию", d: "Наши специалисты готовят проект с учетом нормативных требований и специфики объекта." },
  { icon: FileCheck2, t: "Передаем готовый проект", d: "Согласовываем результат, вносим необходимые корректировки и передаем документацию заказчику." },
];

export function Steps() {
  return (
    <section id="about" className="relative border-y border-border/60 bg-background-2">
      <div className="tech-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1680px] px-5 py-24 md:px-10 lg:py-28">
        <SectionTitle
          title="От задачи до готового комплекта документов"
          subtitle="Выстраиваем понятный процесс взаимодействия, чтобы заказчик контролировал каждый этап и понимал, что происходит с его проектом."
        />
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 120} className="relative xl:pr-12">
              <div className="flex items-center gap-4">
                <span className="font-display text-6xl font-semibold text-primary/35">0{i + 1}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/60 bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary-glow" />
                </span>
                {i < STEPS.length - 1 && (
                  <span className="relative hidden h-px flex-1 bg-gradient-to-r from-primary-glow/70 to-border xl:block">
                    <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rotate-45 border-r border-t border-primary-glow/70" />
                  </span>
                )}
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
