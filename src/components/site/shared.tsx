import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const PHONE = "8 923-127-16-00";
export const PHONE_HREF = "tel:+79231271600";
export const EMAIL = "as-proekt.info@yandex.ru";

export const NAV = [
  { id: "services", label: "Услуги" },
  { id: "industries", label: "Отрасли" },
  { id: "tenders", label: "Тендеры" },
  { id: "portfolio", label: "Портфолио" },
  { id: "about", label: "О компании" },
  { id: "contact", label: "Контакты" },
];

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: {
  title: ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 md:mb-14", className)}>
      <div className="flex items-center gap-6">
        <h2 className="font-display text-2xl font-semibold leading-tight md:text-4xl">{title}</h2>
        <span className="hidden h-px flex-1 bg-gradient-to-r from-primary/70 to-transparent md:block" />
      </div>
      {subtitle && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="flex items-center gap-3"
      aria-label="АС-проект — на главную"
    >
      <svg viewBox="0 0 48 40" className="h-9 w-11 text-primary-glow" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 38h44M6 38V18l8-6v26M14 38V8l10-6v36M24 38V12l10 4v22M34 38V22l8 3v13" />
        <path d="M17 14h4M17 20h4M17 26h4M27 20h4M27 26h4M9 24h3M9 30h3" />
      </svg>
      <div className="leading-tight">
        <div className="font-display text-lg font-semibold">АС-проект</div>
        {!compact && (
          <div className="hidden text-[11px] text-muted-foreground xl:block">
            Проектная документация для строительства
          </div>
        )}
      </div>
    </a>
  );
}

/** Decorative thin blueprint linework overlay. */
export function Blueprint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none text-primary-glow", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      aria-hidden
    >
      <rect x="60" y="80" width="420" height="300" />
      <path d="M60 180h420M60 280h420M200 80v300M340 80v300" strokeDasharray="4 6" />
      <circle cx="560" cy="200" r="150" strokeDasharray="2 5" />
      <circle cx="560" cy="200" r="90" />
      <path d="M560 50v300M410 200h300" />
      <path d="M40 420h520M40 410v20M560 410v20M200 415v10M340 415v10" />
      <path d="M620 420l80-260M620 420h120M700 160l40 260" />
      <rect x="100" y="470" width="180" height="90" />
      <path d="M100 500h180M100 530h180M160 470v90" />
    </svg>
  );
}
