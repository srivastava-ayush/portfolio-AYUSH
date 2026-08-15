import { GitHubCalendar } from "react-github-calendar";
import GitHubStreak from "../../GitHubStreak";
import SectionHeading from "./SectionHeading";

export default function Contributions() {
  return (
    <section className="">
      {/*<SectionHeading command="contributions --verbose" />*/}

      <div className="my-6 px-4 sm:px-6">
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
            blockRadius={0}
            blockMargin={1}
          />
        </div>
      </div>
    </section>
  );
}
