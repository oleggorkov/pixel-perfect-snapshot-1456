import { Inbox, ClipboardList, FileCheck2, PencilRuler, SearchCheck } from "lucide-react";
import { Reveal, SectionTitle } from "./shared";

const STEPS = [
  { icon: Inbox, t: "Получение заявки", d: "Принимаем запрос, уточняем объект, вид работ и требуемую документацию." },
  { icon: ClipboardList, t: "Изучение исходных данных", d: "Анализируем техническое задание, проектную документацию и особенности объекта." },
  { icon: SearchCheck, t: "Подготовка коммерческого предложения", d: "Определяем состав документов, сроки разработки и стоимость работ." },
  { icon: PencilRuler, t: "Разработка документации", d: "Готовим проект с учетом нормативных требований и специфики объекта." },
  { icon: FileCheck2, t: "Передача готового проекта", d: "Передаем документацию, оперативно вносим корректировки по замечаниям." },
];

export function Steps() {
  return (
    <section id="about" className="relative border-y border-border/60 bg-background-2">
      <div className="tech-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1680px] px-5 py-28 md:px-10 lg:py-36">
        <SectionTitle
          title="От задачи до готового комплекта документов"
          subtitle="Выстраиваем понятный процесс взаимодействия, чтобы заказчик контролировал каждый этап и понимал, что происходит с его проектом."
        />
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5 xl:gap-0">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 120} className="relative xl:pr-12">
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl font-semibold text-primary/30">0{i + 1}</span>
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
