import { format, formatDistanceToNow } from "date-fns";
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "NGN" }).format(
    value
  );
export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function formatDate(dateString, dateFormat = "MMMM d, yyyy") {
  return format(new Date(dateString), dateFormat);
}

export function formatTimeAgo(dateString) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}