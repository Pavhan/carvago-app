import { describe, expect, it } from "vitest";
import { createQueryString } from "@/lib/createQueryString";

describe("createQueryString", () => {
  it("deduplicates and normalizes comma-separated values", () => {
    const result = createQueryString(
      {
        transmission: "manual,manual, automat",
        fuelType: "benzin",
      },
      {
        name: "fuelType",
        value: ["benzin", "nafta", "benzin"],
      },
    );

    const params = new URLSearchParams(result.slice(1));

    expect(params.get("transmission")).toBe("manual,automat");
    expect(params.get("fuelType")).toBe("benzin,nafta");
  });

  it("removes query parameter when value is empty", () => {
    const result = createQueryString(
      {
        transmission: ["manual"],
        fuelType: ["benzin"],
      },
      {
        name: "fuelType",
        value: [],
      },
    );

    const params = new URLSearchParams(result.slice(1));

    expect(params.get("transmission")).toBe("manual");
    expect(params.has("fuelType")).toBe(false);
  });
});
