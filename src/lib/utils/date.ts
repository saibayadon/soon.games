/**
 * Converts a Unix timestamp to a relative time string
 * @param date Unix timestamp in seconds
 * @returns Relative time string (e.g., "today", "in 3 days", "2 hours ago")
 */
export const dateToRelative = (date?: number): string => {
  if (date === undefined) return "";
  const now = Math.floor(Date.now() / 1000);
  const diff = date - now;
  const days = Math.floor(diff / (60 * 60 * 24));

  if (Math.abs(days) < 1) {
    const hours = Math.floor(Math.abs(diff) / (60 * 60));
    if (hours === 0) return "today";

    if (diff > 0) {
      return `in ${hours} hour${hours !== 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }
  }

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return rtf.format(days, "day");
};
