import { describe, expect, it } from "vitest";
import { createSlug } from "@/helpers/createSlug";

describe("createSlug", () => {
  it("normalizes diacritics and separators", () => {
    expect(createSlug("Škoda Octavia RS 2.0 TSI")).toBe("skoda-octavia-rs-2-0-tsi");
  });

  it("trims repeated or edge separators", () => {
    expect(createSlug("  ---BMW---X3--- ")).toBe("bmw-x3");
  });
});
