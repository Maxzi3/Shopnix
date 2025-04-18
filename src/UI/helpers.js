export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "NGN" }).format(
    value
  );
export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}