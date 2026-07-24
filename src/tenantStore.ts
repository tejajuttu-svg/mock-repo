import type { TenantConfig } from "./types.js";

/**
 * A trivial in-memory tenant configuration store. The whole tenant config is
 * kept as a single JSON object (round-tripped through JSON.stringify/parse) to
 * mirror "stored as part of the tenant's existing JSON configuration, with no
 * new table, column, or migration" (AIS-134).
 */
export class TenantStore {
  private data = new Map<string, string>();

  save(config: TenantConfig): void {
    this.data.set(config.tenantId, JSON.stringify(config));
  }

  load(tenantId: string): TenantConfig | undefined {
    const raw = this.data.get(tenantId);
    if (raw === undefined) return undefined;
    return JSON.parse(raw) as TenantConfig;
  }

  /**
   * AIS-134 (INTENTIONALLY UNIMPLEMENTED — this is the first agent-ok target).
   *
   * Persist a tenant's maintenance banner as part of the tenant's existing JSON
   * config and read it back, with NO new storage structure. The agent should:
   *   - add a `maintenanceBanner` field to TenantConfig (see src/types.ts)
   *   - implement this method so a saved banner round-trips through load()
   *   - keep everything inside the single JSON blob
   *   - make the skipped test in test/tenantStore.test.ts pass (un-skip it)
   *
   * Acceptance criteria live in Linear issue AIS-134.
   */
  saveBanner(_tenantId: string, _banner: unknown): void {
    throw new Error("AIS-134 not implemented: saveBanner is a stub");
  }
}
