import { describe, expect, it } from "vitest";
import { formatPhone, validate } from "./contact-form";

describe("contact form", () => {
  it("masks phone as +7 (XXX) XXX-XX-XX", () => {
    expect(formatPhone("89231271600")).toBe("+7 (923) 127-16-00");
  });
  it("requires at least one documentation type", () => {
    const e = validate({ name: "Иван", phone: "+7 (923) 127-16-00", email: "a@b.ru", docs: [], comment: "" });
    expect(e.docs).toBeDefined();
    expect(e.phone).toBeUndefined();
  });
});
