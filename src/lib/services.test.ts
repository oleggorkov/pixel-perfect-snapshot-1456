import { describe, expect, it } from "vitest";
import { ALL_SERVICES } from "./services";

describe("services catalog", () => {
  it("contains all 9 services from the current site", () => {
    expect(ALL_SERVICES.map((s) => s.code)).toEqual(["ППР", "ППР с ПС", "ППРв", "ТК", "ПОС", "КПС", "СГП", "ПОД", "ПОДД"]);
  });
});
