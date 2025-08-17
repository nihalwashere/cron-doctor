/**
 * cron-doctor v0.0.1
 * Readable, safe cron jobs for humans.
 * This is a seed release to reserve the npm name. The public API below is stable,
 * and will expand in future minor versions.
 */

export function humanize(expr, { tz } = {}) {
  const text = `Cron: "${expr}"`;
  return tz ? `${text} (timezone: ${tz})` : text;
}

export function validate(expr, { tz } = {}) {
  // Minimal placeholder: just checks field count 5–7
  const parts = String(expr).trim().split(/\s+/);
  const ok = parts.length >= 5 && parts.length <= 7;
  return {
    ok,
    issues: ok
      ? []
      : [{ code: "syntax", severity: "error", message: "Expected 5–7 fields" }],
    inferredDialect:
      parts.length === 7
        ? "quartz-7"
        : parts.length === 6
        ? "standard-6"
        : "standard-5",
    tz: tz || null,
  };
}

export function normalize(expr, { toDialect }) {
  // Minimal placeholder: return original until full impl lands
  if (!toDialect) throw new Error("normalize() requires { toDialect }");
  return expr;
}

export function next(expr, { limit = 3 } = {}) {
  // Minimal placeholder
  const now = Date.now();
  return Array.from(
    { length: limit },
    (_, i) => new Date(now + (i + 1) * 60_000)
  );
}
