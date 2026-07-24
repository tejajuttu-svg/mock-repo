import { describe, it, expect } from "vitest";
import { TenantStore } from "../src/tenantStore.js";
import type { TenantConfig } from "../src/types.js";

describe("TenantStore baseline (green)", () => {
  it("round-trips a tenant config through JSON", () => {
    const store = new TenantStore();
    const cfg: TenantConfig = { tenantId: "t1", name: "Acme" };
    store.save(cfg);
    expect(store.load("t1")).toEqual(cfg);
  });
});

// AIS-134 target: the agent should implement saveBanner + the maintenanceBanner
// field, then UN-SKIP this test and make it pass. It is skipped so the baseline
// is green before the agent runs.
describe.skip("TenantStore maintenance banner (AIS-134)", () => {
  it("persists a banner inside the tenant JSON and reads it back", () => {
    const store = new TenantStore();
    const cfg: TenantConfig = { tenantId: "t2", name: "Globex" };
    store.save(cfg);
    const banner = {
      enabled: true,
      defaultMessage: "Scheduled maintenance.",
      localizedMessages: { fr: "Maintenance planifiée." },
      schedule: { startUtc: "2025-01-01T00:00:00Z" },
    };
    store.saveBanner("t2", banner);
    const loaded = store.load("t2") as any;
    expect(loaded.maintenanceBanner).toEqual(banner);
  });
});
