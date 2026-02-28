/**
 * Format course price for display.
 * Returns "Free" when price is 0, "0", "Free", or empty; otherwise returns "{price}$"
 */
export const formatPrice = (price: string | number | null | undefined): string => {
  if (price == null || price === "") return "Free";
  const p = String(price).trim();
  if (p === "" || p === "Free" || p === "0" || p === "0.0" || p === "0.00") return "Free";
  const num = parseFloat(p);
  if (!Number.isNaN(num) && num === 0) return "Free";
  return `${p}$`;
};
