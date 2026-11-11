import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES, SERVICE_NAMES, type Service } from "@/lib/services";
import { Reveal, SectionTitle, scrollToId } from "./shared";

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const ICONS: Record<string, ReactNode> = {
  helmet: <><path d="M8 44h48v6H8zM12 44c0-12 8-22 20-22s20 10 20 22" /><path d="M26 22v-6h12v6M32 16v28" /></>,
  crane: <><path d="M20 56V10M26 56V10M8 16h48M20 16L8 22M26 16l20-6M50 16v14M46 30h8v6h-8zM14 56h18" /><path d="M20 24l6 6M26 24l-6 6M20 36l6 6M26 36l-6 6" /></>,
  height: <><circle cx="26" cy="12" r="4" /><path d="M26 16v16l-6 14M26 32l8 14M18 24h16M40 56l14-30M8 56h48" /></>,
  doc: <><path d="M14 8h26l10 10v38H14z" /><path d="M40 8v10h10M22 28h20M22 36h20M22 44h12" /></>,
  buildings: <><path d="M6 56h52M10 56V28h14v28M24 56V14h16v42M40 56V24h14v32" /><path d="M29 20h6M29 28h6M29 36h6M29 44h6" /></>,
  calendar: <><path d="M8 14h48v40H8zM8 24h48M20 8v10M44 8v10" /><path d="M16 32h14M22 40h18M34 48h14" /></>,
  plan: <><path d="M8 10h48v44H8z" /><path d="M16 18h16v14H16zM38 18h10v8H38zM16 40h32M8 46h48" strokeDasharray="3 4" /><circle cx="43" cy="38" r="5" /></>,
  demolish: <><path d="M10 56V30h20v26M8 56h48M30 40l8-4M40 12l12 12-6 6-12-12z" /><path d="M46 30L36 40" /></>,
  road: <><path d="M20 56L28 8M44 56L36 8M32 14v6M32 28v6M32 42v8" /><path d="M8 56h48" /></>,
};
function Icon({ name }: { name: string }) {
  return <svg viewBox="0 0 64 64" className="h-10 w-10 text-primary" {...s} aria-hidden>{ICONS[name]}</svg>;
}

export function orderService(name: string) {
  window.dispatchEvent(new CustomEvent("as:select-service", { detail: name }));
  scrollToId("contact");
}

export function Services() {
  const [open, setOpen] = useState<Service | null>(null);
  return (
    <section id="services" className="relative mx-auto max-w-[1680px] px-5 py-28 md:px-10 lg:py-36">
      <SectionTitle
        title="Комплексная разработка проектной и технологической документации"
        subtitle="Разрабатываем документацию для строительных, монтажных, демонтажных и производственных работ с учетом специфики каждого объекта."
      />
      <Accordion type="multiple" defaultValue={SERVICE_CATEGORIES.map((c) => c.id)} className="grid gap-6">
        {SERVICE_CATEGORIES.map((cat, ci) => (
          <AccordionItem key={cat.id} value={cat.id} className="rounded-lg border border-border bg-background-2 px-5 md:px-8">
            <AccordionTrigger className="py-7 hover:no-underline">
              <div className="flex items-baseline gap-5 text-left">
                <span className="font-display text-sm text-primary-glow">0{ci + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-primary md:text-2xl">{cat.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm font-normal text-muted-foreground md:text-base">{cat.lead}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {cat.services.map((sv, i) => (
                  <Reveal key={sv.code} delay={i * 80}>
                    <article className="card-eng flex h-full flex-col p-7">
                      <div className="flex items-start justify-between gap-4">
                        <Icon name={sv.icon} />
                        <span className="rounded bg-accent px-2.5 py-1 text-xs font-bold text-primary">{sv.code}</span>
                      </div>
                      <h4 className="mt-6 text-lg font-semibold leading-snug">{sv.name}</h4>
                      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">{sv.text}</p>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                        <button onClick={() => setOpen(sv)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-glow">
                          Подробнее <ArrowRight className="h-4 w-4" />
                        </button>
                        <Button size="sm" variant="glow" onClick={() => orderService(sv.name)}>Заказать расчет</Button>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-xl">
          {open && (
            <>
              <DialogHeader>
                <div className="mb-2"><Icon name={open.icon} /></div>
                <DialogTitle className="text-xl leading-snug">{open.name} <span className="text-primary">({open.code})</span></DialogTitle>
                <DialogDescription className="pt-2 text-base leading-relaxed">{open.text}</DialogDescription>
              </DialogHeader>
              {open.note && <p className="border-l-2 border-primary pl-4 text-sm text-muted-foreground">{open.note}</p>}
              <Button variant="hero" className="mt-2 w-fit" onClick={() => { const n = open.name; setOpen(null); orderService(n); }}>
                Заказать расчет <ArrowRight />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export const DOC_TYPES = SERVICE_NAMES;
