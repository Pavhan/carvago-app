import { beforeEach, describe, expect, it, vi } from "vitest";

const andMock = vi.fn((...args: unknown[]) => ({ op: "and", args }));
const inArrayMock = vi.fn((column: unknown, values: string[]) => ({
  op: "inArray",
  column,
  values,
}));
const descMock = vi.fn((column: unknown) => ({ op: "desc", column }));
const eqMock = vi.fn((column: unknown, value: string) => ({
  op: "eq",
  column,
  value,
}));
const countMock = vi.fn(() => ({ op: "count" }));

vi.mock("drizzle-orm", () => ({
  and: andMock,
  count: countMock,
  desc: descMock,
  eq: eqMock,
  inArray: inArrayMock,
}));

const orderByMock = vi.fn();
const whereMock = vi.fn(() => ({ orderBy: orderByMock }));
const fromMock = vi.fn(() => ({ where: whereMock }));
const selectMock = vi.fn(() => ({ from: fromMock }));

vi.mock("@/drizzle/db", () => ({
  db: {
    select: selectMock,
  },
}));

vi.mock("@/drizzle/schema", () => ({
  cars: {
    transmission: "transmission-column",
    fuelType: "fuel-type-column",
    createdAt: "created-at-column",
    slug: "slug-column",
  },
}));

vi.mock("@/helpers/sleep", () => ({
  sleep: vi.fn(async () => undefined),
}));

describe("getCars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    orderByMock.mockResolvedValue([{ id: 1 }]);
  });

  it("maps aliases and deduplicates filter values", async () => {
    const { getCars } = await import("@/lib/cars");

    await getCars({
      transmission: ["manual,manual", "manuál"],
      fuelType: "benzín,benzin,nafta",
    });

    expect(inArrayMock).toHaveBeenCalledWith("transmission-column", ["Manuál"]);
    expect(inArrayMock).toHaveBeenCalledWith("fuel-type-column", [
      "Benzín",
      "Nafta",
    ]);
    expect(descMock).toHaveBeenCalledWith("created-at-column");
    expect(orderByMock).toHaveBeenCalledTimes(1);
  });
});
