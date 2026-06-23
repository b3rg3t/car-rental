import { describe, expect, test } from "vitest";
import { CarTypes } from "../../models/enums/carTypes";
import { calculatePrice } from "./calculatePrice";

describe("calculatePrice", () => {
  test("calculates small car rental price by full days", () => {
    const price = calculatePrice(
      "2026-06-01T10:00",
      "2026-06-02T09:00",
      CarTypes.SmallCar,
      1000,
      1100,
    );

    expect(price).toBe(22);
  });

  test("calculates combi rental price with kilometers", () => {
    const price = calculatePrice(
      "2026-06-01T10:00",
      "2026-06-02T09:00",
      CarTypes.Combi,
      1000,
      1100,
    );

    expect(price).toBe(22 * 1.3 + 1.5 * 100);
  });

  test("calculates truck rental price with extended rate", () => {
    const price = calculatePrice(
      "2026-06-01T10:00",
      "2026-06-02T09:00",
      CarTypes.Truck,
      1000,
      1100,
    );

    expect(price).toBe(22 * 1.5 + 1.5 * 100 * 1.5);
  });

  test("rounds up partial rental days", () => {
    const price = calculatePrice(
      "2026-06-01T10:00",
      "2026-06-01T15:00",
      CarTypes.SmallCar,
      1000,
      1000,
    );

    expect(price).toBe(22);
  });

  test("returns zero when end date is before start date", () => {
    const price = calculatePrice(
      "2026-06-02T10:00",
      "2026-06-01T10:00",
      CarTypes.SmallCar,
      1000,
      1100,
    );

    expect(price).toBe(0);
  });
});
