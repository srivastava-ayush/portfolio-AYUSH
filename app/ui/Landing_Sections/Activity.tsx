
import {GitHubCalendar} from "react-github-calendar";
function Activity() {
  return (
     <section className="relative  flex flex-col justify-center w-full gap-8 md:gap-8">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/50 to-transparent" />
          
          <div className="py-16">
            <span className="flex items-end w-full justify-between">
              <h1 className="text-3xl md:text-[2.7rem] font-semibold text-(--text-color)">
                Activity
                <span className="font-semibold text-[var(--accent-color)]">
                  .
                </span>
              </h1>
            </span>

            <GitHubCalendar 
            theme={{
    light: ["#fff", "#fff", "#fff", "#fff", "#fff"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  }}
           username="srivastava-ayush" /></div>
          </section>
  )
}

export default Activity