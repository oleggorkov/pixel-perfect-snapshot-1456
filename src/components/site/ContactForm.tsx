import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPhone, validate, type FormValues } from "@/lib/contact-form";
import { DOC_TYPES } from "./Services";
import { Blueprint, Reveal } from "./shared";

const empty: FormValues = { name: "", phone: "", email: "", docs: [], comment: "" };

const field =
  "h-13 w-full rounded-md border bg-background px-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary-glow focus:bg-background";

export function ContactForm() {
  const [v, setV] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const on = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      setDone(false);
      setV((p) => (p.docs.includes(name) ? p : { ...p, docs: [...p.docs, name] }));
      setErrors((x) => ({ ...x, docs: undefined }));
    };
    window.addEventListener("as:select-service", on);
    return () => window.removeEventListener("as:select-service", on);
  }, []);

  const set = <K extends keyof FormValues>(k: K, val: FormValues[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setDone(true);
    toast.success("Заявка отправлена", { description: "Специалист свяжется с вами в ближайшее время." });
  };

  const err = (k: keyof FormValues) =>
    errors[k] ? <p className="mt-1.5 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <section id="contact" className="relative overflow-hidden border-y border-border/60 bg-background-2">
      <div className="tech-grid absolute inset-0 opacity-60" />
      <Blueprint className="absolute -left-40 top-0 h-full w-[700px] opacity-20" />
      <Blueprint className="absolute -right-40 bottom-0 h-full w-[700px] rotate-180 opacity-20" />
      <div className="relative mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:py-32">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-[44px]">
            Есть задача по проекту? <span className="text-primary">Давайте обсудим</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Расскажите о вашем объекте, и мы поможем определить необходимый состав документации, сроки разработки и стоимость работ.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-glow)] border-t-4 border-t-primary md:p-10">
            {done ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary-glow" strokeWidth={1.4} />
                <h3 className="mt-6 font-display text-2xl font-semibold">Спасибо, {v.name.split(" ")[0]}!</h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Заявка принята. Мы перезвоним на номер {v.phone} и подготовим расчет стоимости.
                </p>
                <Button variant="glow" className="mt-8" onClick={() => { setV(empty); setDone(false); }}>
                  Отправить еще одну заявку
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <input aria-label="Имя" placeholder="Имя" value={v.name} onChange={(e) => set("name", e.target.value)} className={cn(field, errors.name ? "border-destructive" : "border-input")} maxLength={80} />
                    {err("name")}
                  </div>
                  <div>
                    <input aria-label="Телефон" type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" value={v.phone} onChange={(e) => set("phone", formatPhone(e.target.value))} className={cn(field, errors.phone ? "border-destructive" : "border-input")} />
                    {err("phone")}
                  </div>
                  <div>
                    <input aria-label="Электронная почта" type="email" placeholder="Электронная почта" value={v.email} onChange={(e) => set("email", e.target.value)} className={cn(field, errors.email ? "border-destructive" : "border-input")} maxLength={120} />
                    {err("email")}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-sm text-muted-foreground">Выберите услугу (можно несколько)</div>
                  <div className="flex flex-wrap gap-2">
                    {DOC_TYPES.map((d) => {
                      const on = v.docs.includes(d);
                      return (
                        <button
                          type="button"
                          key={d}
                          aria-pressed={on}
                          onClick={() => set("docs", on ? v.docs.filter((x) => x !== d) : [...v.docs, d])}
                          className={cn(
                            "rounded-md border px-3.5 py-2 text-left text-[13px] font-medium transition-all",
                            on ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary-glow",
                          )}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                  {err("docs")}
                </div>
                <div>
                  <textarea aria-label="Комментарий" placeholder="Комментарий: объект, сроки, особенности" value={v.comment} onChange={(e) => set("comment", e.target.value)} rows={4} maxLength={1000} className={cn(field, "h-auto py-3", errors.comment ? "border-destructive" : "border-input")} />
                  {err("comment")}
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  <Button type="submit" variant="hero" size="xl" disabled={sending}>
                    {sending ? "Отправляем…" : "Получить расчет стоимости"} <ArrowRight />
                  </Button>
                  <p className="max-w-xs text-xs text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
