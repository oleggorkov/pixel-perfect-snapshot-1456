import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo, NAV, PHONE, PHONE_HREF, scrollToId } from "./shared";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/70 backdrop-blur-xl transition-colors duration-300",
        scrolled ? "bg-background/90" : "bg-background/55",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1680px] items-center justify-between gap-6 px-5 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex 2xl:gap-10">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(n.id);
              }}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <a href={PHONE_HREF} className="flex items-center gap-2 text-sm font-semibold hover:text-primary-glow">
            <Phone className="h-4 w-4 text-primary-glow" />
            <span className="hidden whitespace-nowrap xl:inline">{PHONE}</span>
          </a>
          <Button variant="hero" onClick={() => go("contact")}>
            Рассчитать стоимость
          </Button>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="h-[calc(100dvh-5rem)] border-t border-border bg-background px-5 py-8 lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="border-b border-border/60 py-4 text-left font-display text-lg"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <a href={PHONE_HREF} className="mt-8 flex items-center gap-2 text-lg font-semibold">
            <Phone className="h-5 w-5 text-primary-glow" /> {PHONE}
          </a>
          <Button variant="hero" size="xl" className="mt-6 w-full" onClick={() => go("contact")}>
            Рассчитать стоимость
          </Button>
        </div>
      )}
    </header>
  );
}
