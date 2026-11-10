import { Mail, MapPin, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EMAIL, Logo, NAV, PHONE, PHONE_HREF, scrollToId } from "./shared";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-16 md:grid-cols-3 md:px-10">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Проектная документация для строительства</p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollToId(n.id)} className="text-left text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </button>
          ))}
        </nav>
        <div className="space-y-4 text-sm">
          <a href={PHONE_HREF} className="flex items-center gap-3 hover:text-primary-glow"><Phone className="h-4 w-4 text-primary-glow" /> {PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-primary-glow"><Mail className="h-4 w-4 text-primary-glow" /> {EMAIL}</a>
          <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary-glow" /> Работаем по всей России</div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1680px] flex-wrap justify-between gap-4 px-5 py-6 text-xs text-muted-foreground md:px-10">
          <span>© {new Date().getFullYear()} АС-проект. Все права защищены.</span>
          <Dialog>
            <DialogTrigger className="hover:text-foreground">Политика конфиденциальности</DialogTrigger>
            <DialogContent className="border-border bg-background-2">
              <DialogTitle className="font-display">Политика конфиденциальности</DialogTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Персональные данные, указанные в форме заявки (имя, телефон, электронная почта), используются
                исключительно для связи с вами и подготовки коммерческого предложения. Мы не передаем данные третьим
                лицам и храним их в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}
