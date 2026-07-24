// Domain types for the maintenance-banner mock app.
// These mirror the SHAPE of the FusionAuth Tenant maintenance banner issues
// (config storage, locale messages, optional UTC schedule) in a generic form.

export interface BannerSchedule {
  /** ISO-8601 UTC start, inclusive. Optional. */
  startUtc?: string;
  /** ISO-8601 UTC end, inclusive. Optional. */
  endUtc?: string;
}

export interface MaintenanceBanner {
  enabled: boolean;
  /** Fallback message used when no locale-specific message matches. */
  defaultMessage: string;
  /** Locale code -> message. e.g. { "en-US": "...", "fr": "..." } */
  localizedMessages: Record<string, string>;
  /** Optional activation window in UTC. */
  schedule?: BannerSchedule;
}

/** A tenant's full configuration, stored as a single JSON blob (no migration). */
export interface TenantConfig {
  tenantId: string;
  name: string;
  // NOTE (AIS-134): the maintenance banner field is intentionally NOT yet part
  // of this interface. Implementing AIS-134 adds `maintenanceBanner` here and in
  // the store's (de)serialization without introducing any new storage table.
  [key: string]: unknown;
}

export const MAX_MESSAGE_LENGTH = 500;
