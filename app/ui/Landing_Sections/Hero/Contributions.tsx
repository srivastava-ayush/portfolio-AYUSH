import { GitHubCalendar } from "react-github-calendar";
import GitHubStreak from "../../GitHubStreak";

export default function Contributions() {
  return (
    <section className="px-4 sm:px-6 py-4">
      <div className="relative border border-[var(--border-color)] bg-[var(--glass-bg-color)] p-3 pt-8 overflow-x-auto">
        <GitHubStreak username="srivastava-ayush" />
        <GitHubCalendar
          username="srivastava-ayush"
          theme={{
            light: ["#fff", "#fff", "#fff", "#fff", "#fff"],
            dark: ["#161b22", "#555555", "#888888", "#BBBBBB", "#F4F4F4"],
          }}
          fontSize={10}
          showTotalCount={false}
        />
      </div>
    </section>
  );
}
