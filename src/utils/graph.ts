type DailyStat = {
  date: string;
  views: number;
  earnings: number;
};

export function formatDailyStats(
  rows: any[]
): DailyStat[] {
  return rows.map(r => ({
    date: r.date,
    views: Number(r.views),
    earnings: Number(r.earnings)
  }));
}
