export function detectDevice(
  userAgent: string
): "mobile" | "desktop" {
  const ua = userAgent.toLowerCase();

  if (
    ua.includes("mobile") ||
    ua.includes("android") ||
    ua.includes("iphone")
  ) {
    return "mobile";
  }

  return "desktop";
}
