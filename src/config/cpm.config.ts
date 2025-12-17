export type CPMRate = {
  country: string;
  device: "mobile" | "desktop";
  rate: number;
};

export const CPM_RATES: CPMRate[] = [
  { country: "US", device: "desktop", rate: 8.5 },
  { country: "US", device: "mobile", rate: 6.2 },
  { country: "IN", device: "desktop", rate: 2.1 },
  { country: "IN", device: "mobile", rate: 1.4 },
  { country: "OTHER", device: "desktop", rate: 1.0 },
  { country: "OTHER", device: "mobile", rate: 0.7 }
];

export function getCPM(country: string, device: "mobile" | "desktop") {
  return (
    CPM_RATES.find(
      (c) => c.country === country && c.device === device
    ) ||
    CPM_RATES.find(
      (c) => c.country === "OTHER" && c.device === device
    )
  )!.rate;
}
