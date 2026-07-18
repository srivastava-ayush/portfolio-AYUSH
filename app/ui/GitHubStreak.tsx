"use client";
import { useEffect, useState } from "react";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export default function GitHubStreak({ username }: { username: string }) {
  const [stats, setStats] = useState<{
    total: number;
    currentStreak: number;
    maxStreak: number;
  } | null>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => r.json())
      .then((data) => {
        const days: ContributionDay[] = data.contributions || [];
        const total = days.reduce((sum, d) => sum + d.count, 0);

        let maxStreak = 0;
        let streak = 0;
        for (let i = 0; i < days.length; i++) {
          if (days[i].count > 0) {
            streak++;
            if (streak > maxStreak) maxStreak = streak;
          } else {
            streak = 0;
          }
        }

        let currentStreak = 0;
        let start = days.length - 1;
        if (days[start]?.count === 0 && start > 0) start--;
        for (let i = start; i >= 0; i--) {
          if (days[i].count > 0) {
            currentStreak++;
          } else {
            break;
          }
        }

        setStats({ total, currentStreak, maxStreak });
      })
      .catch(() => {});
  }, [username]);

  if (!stats) return null;

  return (
    <div className="absolute top-0 left-0 flex items-center gap-4 text-[10px] font-mono text-[#777777] p-2">
      <span className="flex items-center gap-1">
        <span className="text-[#F4F4F4] font-semibold">{stats.total}</span>
        total
      </span>
      <span className="w-px h-3 bg-[#2A2A2A]" />
      <span className="flex items-center gap-1">
        <span className="text-[#F4F4F4] font-semibold">{stats.currentStreak}</span>
        day streak
      </span>
      <span className="w-px h-3 bg-[#2A2A2A]" />
      <span className="flex items-center gap-1">
        <span className="text-[#F4F4F4] font-semibold">{stats.maxStreak}</span>
        max streak
      </span>
    </div>
  );
}
