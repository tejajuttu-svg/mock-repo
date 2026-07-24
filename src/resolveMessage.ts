import type { MaintenanceBanner } from "./types.js";

/**
 * Resolve the banner message for a requested locale using fallback order:
 *   1. exact locale match (e.g. "en-US")
 *   2. language-only match (e.g. "en")
 *   3. defaultMessage
 * Mirrors AIS-136. This is implemented and covered by tests as part of the
 * green baseline.
 */
export function resolveMessage(
  banner: MaintenanceBanner,
  requestedLocale: string,
): string {
  const messages = banner.localizedMessages ?? {};

  if (requestedLocale && messages[requestedLocale] !== undefined) {
    return messages[requestedLocale];
  }

  const language = requestedLocale?.split("-")[0];
  if (language && messages[language] !== undefined) {
    return messages[language];
  }

  return banner.defaultMessage;
}
