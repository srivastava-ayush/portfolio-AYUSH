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

        let currentStreak = 0;
        let maxStreak = 0;
        let streak = 0;

        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) {
            streak++;
            if (streak > maxStreak) maxStreak = streak;
          } else {
            if (i === days.length - 1) currentStreak = 0;
            streak = 0;
          }
        }

        streak = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) {
            streak++;
          } else {
            if (currentStreak === 0 && streak > 0) currentStreak = streak;
            streak = 0;
          }
        }
        if (streak > 0) currentStreak = streak;

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
