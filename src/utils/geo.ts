import geoip from "geoip-lite";

export function getCountryFromIP(ip: string): string {
  const geo = geoip.lookup(ip);
  return geo?.country || "OTHER";
}
