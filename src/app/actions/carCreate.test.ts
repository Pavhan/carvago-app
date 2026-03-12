import { beforeEach, describe, expect, it, vi } from "vitest";

const eqMock = vi.fn((column: unknown, value: string) => ({ column, value }));

const selectLimitMock = vi.fn();
const selectWhereMock = vi.fn(() => ({ limit: selectLimitMock }));
const selectFromMock = vi.fn(() => ({ where: selectWhereMock }));
const selectMock = vi.fn(() => ({ from: selectFromMock }));

const insertValuesMock = vi.fn();
const insertMock = vi.fn(() => ({ values: insertValuesMock }));

const revalidatePathMock = vi.fn();
const redirectMock = vi.fn();

vi.mock("drizzle-orm", () => ({
  eq: eqMock,
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/drizzle/db", () => ({
  db: {
    select: selectMock,
    insert: insertMock,
  },
}));

vi.mock("@/drizzle/schema", () => ({
  cars: {
    slug: "slug-column",
  },
}));

describe("createCarAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    insertValuesMock.mockResolvedValue(undefined);
  });

  it("returns field errors for invalid payload", async () => {
    const { createCarAction } = await import("@/app/actions/carCreate");

    const formData = new FormData();
    formData.set("name", "a");

    const result = await createCarAction({}, formData);

    expect(result.fieldErrors).toBeDefined();
    expect(insertMock).not.toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("creates car with unique slug when base slug already exists", async () => {
    const { createCarAction } = await import("@/app/actions/carCreate");

    selectLimitMock.mockResolvedValueOnce([{ slug: "audi-a6" }]);
    selectLimitMock.mockResolvedValueOnce([]);

    const formData = new FormData();
    formData.set("name", "Audi A6");
    formData.set("imageUrl", "/images/cars/audi-a6-avant.avif");
    formData.set("transmission", "Automat");
    formData.set("fuelType", "Nafta");
    formData.set("price", "1489000");

    await createCarAction({}, formData);

    expect(insertValuesMock).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: "audi-a6-2",
      }),
    );
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(redirectMock).toHaveBeenCalledWith("/cars/audi-a6-2?created=1");
  });
});
