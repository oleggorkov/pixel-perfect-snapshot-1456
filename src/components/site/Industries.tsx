import { ArrowUpRight } from "lucide-react";
import industrial from "@/assets/ind-industrial.jpg";
import civil from "@/assets/ind-civil.jpg";
import infra from "@/assets/ind-infra.jpg";
import energy from "@/assets/ind-energy.jpg";
import { Reveal, SectionTitle } from "./shared";

const ITEMS = [
  { img: industrial, t: "Промышленное строительство", d: "Заводы, фабрики, производственные комплексы и технические сооружения." },
  { img: civil, t: "Гражданское строительство", d: "Жилые комплексы, общественные здания, коммерческие объекты." },
  { img: infra, t: "Инфраструктура", d: "Автомобильные дороги, мосты, инженерные сети и транспортные сооружения." },
  { img: energy, t: "Энергетика", d: "Электростанции, подстанции и объекты энергетической инфраструктуры." },
];

export function Industries() {
  return (
    <section id="industries" className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 lg:py-32">
      <SectionTitle
        title="Работаем с объектами разного масштаба"
        subtitle="Разрабатываем документацию для различных направлений строительства и промышленности."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {ITEMS.map((it, i) => (
          <Reveal key={it.t} delay={i * 100}>
            <article className="group relative h-[380px] overflow-hidden rounded-lg border border-border transition-colors hover:border-primary-glow/70 2xl:h-[440px]">
              <img src={it.img} alt={it.t} loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold">{it.t}</h3>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-glow/60 transition-colors group-hover:bg-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
