import { describe, it, expect } from "vitest";
import { shouldDisplay } from "../src/shouldDisplay.js";
import type { MaintenanceBanner } from "../src/types.js";

const base: MaintenanceBanner = { enabled: true, defaultMessage: "x", localizedMessages: {} };

describe("shouldDisplay (AIS-135)", () => {
  it("hides when disabled even within schedule", () => {
    const b = { ...base, enabled: false, schedule: { startUtc: "2020-01-01T00:00:00Z", endUtc: "2999-01-01T00:00:00Z" } };
    expect(shouldDisplay(b, new Date("2025-01-01T00:00:00Z"))).toBe(false);
  });
  it("shows when enabled with no schedule", () => {
    expect(shouldDisplay(base, new Date())).toBe(true);
  });
  it("respects schedule window", () => {
    const b = { ...base, schedule: { startUtc: "2025-01-01T00:00:00Z", endUtc: "2025-01-02T00:00:00Z" } };
    expect(shouldDisplay(b, new Date("2025-01-01T12:00:00Z"))).toBe(true);
    expect(shouldDisplay(b, new Date("2025-02-01T00:00:00Z"))).toBe(false);
  });
});
