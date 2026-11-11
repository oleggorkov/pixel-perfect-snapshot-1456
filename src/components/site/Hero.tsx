import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-crane.jpg";
import { Blueprint, scrollToId } from "./shared";

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function useParallax(factor = 0.15) {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY * factor);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);
  return y;
}

const STATS = [
  { n: 5, l: "лет опыта" },
  { n: 500, l: "реализованных проектов" },
  { n: 50, l: "довольных заказчиков" },
];

export function Hero() {
  const y = useParallax(0.18);
  return (
    <section id="top" className="relative flex min-h-[720px] items-center overflow-hidden pt-20 lg:min-h-[800px]">
      <div className="absolute inset-0" style={{ transform: `translate3d(0, ${y}px, 0) scale(1.08)` }}>
        <img
          src={heroImg}
          alt="Строящееся монолитное здание с башенным краном"
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-[70%_center]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      <Blueprint className="absolute right-0 top-20 h-full w-2/3 opacity-25" />
      <div className="tech-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(90deg,black,transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1680px] px-5 py-16 md:px-10">
        <div className="max-w-[760px] animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-10 bg-primary" />
            Профессиональная разработка строительной документации
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl xl:text-[68px]">
            Разрабатываем документацию <span className="text-primary">для уверенного строительства</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            ППР, технологические карты, проекты организации строительства и другая инженерная документация для объектов по всей России.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="hero" size="xl" onClick={() => scrollToId("contact")}>
              Обсудить проект <ArrowRight />
            </Button>
            <Button variant="glow" size="xl" onClick={() => scrollToId("services")}>
              Наши услуги <ArrowRight />
            </Button>
          </div>
          <div className="mt-14 flex flex-wrap gap-y-6">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className={i > 0 ? "border-l border-border pl-6 pr-6 sm:pl-10 sm:pr-10" : "pr-6 sm:pr-10"}
              >
                <div className="font-display text-4xl font-semibold text-primary md:text-5xl">
                  <Counter to={s.n} />
                </div>
                <div className="mt-2 max-w-[130px] text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
