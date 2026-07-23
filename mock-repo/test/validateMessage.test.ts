import { describe, it, expect } from "vitest";
import { validateMessage } from "../src/validateMessage.js";

describe("validateMessage (AIS-132)", () => {
  it("accepts ordinary punctuation", () => {
    expect(validateMessage("We're down for maintenance — back at 5:00 p.m.!")).toEqual([]);
  });
  it("rejects markup", () => {
    expect(validateMessage("<script>alert(1)</script>").length).toBeGreaterThan(0);
  });
  it("rejects over-length", () => {
    expect(validateMessage("a".repeat(501)).length).toBeGreaterThan(0);
  });
});
