/**
 * Format date/time for display across the app.
 * Output format: D.M.YYYY, HH:mm:ss (e.g. 22.2.2026, 17:25:21)
 */
export function formatDateTime(
  value: string | Date | null | undefined
): string {
  if (value == null || value === "") return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "-";
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${d}.${m}.${y}, ${hh}:${mm}:${ss}`;
}
