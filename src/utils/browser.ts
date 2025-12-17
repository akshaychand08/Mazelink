export function detectBrowser(
  userAgent: string
): string {
  const ua = userAgent.toLowerCase();

  if (ua.includes("chrome")) return "Chrome";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("safari")) return "Safari";
  if (ua.includes("edge")) return "Edge";
  if (ua.includes("opera")) return "Opera";

  return "Other";
}
