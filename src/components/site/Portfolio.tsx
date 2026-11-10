import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ppr from "@/assets/doc-ppr.jpg";
import tk from "@/assets/doc-tk.jpg";
import crane from "@/assets/doc-crane.jpg";
import genplan from "@/assets/doc-genplan.jpg";
import pos from "@/assets/doc-pos.jpg";
import { Reveal, SectionTitle } from "./shared";

const DOCS = [
  { img: ppr, code: "ППР", t: "Чертежи ППР" },
  { img: tk, code: "ТК", t: "Технологические карты" },
  { img: crane, code: "ППР с ПС", t: "Схемы размещения кранов" },
  { img: genplan, code: "СГП", t: "Генеральные планы площадок" },
  { img: pos, code: "ПОС", t: "Схемы организации строительства" },
];

export function Portfolio() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true });
  const [active, setActive] = useState<number | null>(null);
  const [sel, setSel] = useState(0);

  const onSelect = useCallback(() => embla && setSel(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  const doc = active !== null ? DOCS[active] : null;

  return (
    <section id="portfolio" className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 lg:py-32">
      <div className="flex items-end justify-between gap-6">
        <SectionTitle title="Примеры проектной документации" className="flex-1" />
        <div className="mb-10 hidden gap-3 md:mb-14 md:flex">
          <button aria-label="Назад" onClick={() => embla?.scrollPrev()} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary-glow hover:bg-primary/15">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button aria-label="Вперед" onClick={() => embla?.scrollNext()} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary-glow hover:bg-primary/15">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <Reveal>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-5 flex">
            {DOCS.map((d, i) => (
              <div key={d.t} className="min-w-0 shrink-0 grow-0 basis-[88%] pl-5 sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4">
                <button onClick={() => setActive(i)} className="group block w-full overflow-hidden rounded-lg border border-border text-left transition-colors hover:border-primary-glow">
                  <div className="relative aspect-[4/3] bg-paper">
                    <img src={d.img} alt={d.t} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-card px-5 py-4">
                    <div>
                      <div className="font-display text-sm font-semibold text-primary-glow">{d.code}</div>
                      <div className="text-sm">{d.t}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-primary-glow" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {DOCS.map((d, i) => (
            <button key={d.t} aria-label={`Слайд ${i + 1}`} onClick={() => embla?.scrollTo(i)} className={`h-1 rounded-full transition-all ${sel === i ? "w-10 bg-primary-glow" : "w-5 bg-border"}`} />
          ))}
        </div>
      </Reveal>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-6xl border-border bg-background-2 p-3 sm:p-4">
          <DialogTitle className="px-1 font-display text-base">{doc?.t}</DialogTitle>
          {doc && <img src={doc.img} alt={doc.t} className="w-full rounded bg-paper" />}
          <div className="flex justify-between">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" onClick={() => setActive((a) => ((a ?? 0) + DOCS.length - 1) % DOCS.length)}>
              <ChevronLeft className="h-4 w-4" /> Предыдущий
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" onClick={() => setActive((a) => ((a ?? 0) + 1) % DOCS.length)}>
              Следующий <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
