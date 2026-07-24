import type { MaintenanceBanner } from "./types.js";

/**
 * Decide whether the banner should display at a given instant.
 * Rules (mirror AIS-135):
 *   - disabled banner never displays, even inside an active schedule
 *   - enabled banner with no schedule always displays
 *   - enabled banner with a schedule displays only while now is within
 *     [startUtc, endUtc] (inclusive); missing bound = open-ended on that side
 * Implemented and covered by tests as part of the green baseline.
 */
export function shouldDisplay(
  banner: MaintenanceBanner,
  nowUtc: Date = new Date(),
): boolean {
  if (!banner.enabled) return false;
  if (!banner.schedule) return true;

  const now = nowUtc.getTime();
  const { startUtc, endUtc } = banner.schedule;

  if (startUtc !== undefined && now < Date.parse(startUtc)) return false;
  if (endUtc !== undefined && now > Date.parse(endUtc)) return false;
  return true;
}
