export type FormValues = {
  name: string;
  phone: string;
  email: string;
  docs: string[];
  comment: string;
};

/** Formats any digits into +7 (XXX) XXX-XX-XX. */
export function formatPhone(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("8") || d.startsWith("7")) d = d.slice(1);
  d = d.slice(0, 10);
  if (!d) return "";
  let out = "+7 (" + d.slice(0, 3);
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += "-" + d.slice(6, 8);
  if (d.length > 8) out += "-" + d.slice(8, 10);
  return out;
}

export function validate(v: FormValues): Partial<Record<keyof FormValues, string>> {
  const e: Partial<Record<keyof FormValues, string>> = {};
  if (v.name.trim().length < 2) e.name = "Укажите имя";
  if (v.phone.replace(/\D/g, "").length !== 11) e.phone = "Введите номер полностью";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Проверьте адрес почты";
  if (v.docs.length === 0) e.docs = "Выберите хотя бы один вид документации";
  if (v.comment.length > 1000) e.comment = "Не более 1000 символов";
  return e;
}
