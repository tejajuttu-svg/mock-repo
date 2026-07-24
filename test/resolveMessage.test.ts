import { describe, it, expect } from "vitest";
import { resolveMessage } from "../src/resolveMessage.js";
import type { MaintenanceBanner } from "../src/types.js";

const banner: MaintenanceBanner = {
  enabled: true,
  defaultMessage: "System maintenance in progress.",
  localizedMessages: { "en-US": "US maintenance notice.", fr: "Maintenance en cours." },
};

describe("resolveMessage (AIS-136)", () => {
  it("uses exact locale match first", () => {
    expect(resolveMessage(banner, "en-US")).toBe("US maintenance notice.");
  });
  it("falls back to language-only match", () => {
    expect(resolveMessage(banner, "fr-CA")).toBe("Maintenance en cours.");
  });
  it("falls back to defaultMessage when nothing matches", () => {
    expect(resolveMessage(banner, "de-DE")).toBe("System maintenance in progress.");
  });
});
