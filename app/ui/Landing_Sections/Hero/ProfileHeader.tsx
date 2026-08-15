import AvatarFlip from "./AvatarFlip";
import FlipText from "./FlipText";

const taglines = [
  "Full-Stack Engineer from India.",
  "Building & shipping products from concept to deployment.",
  "I rice Linux.",
  "snack on oranges.",
];

export default function ProfileHeader({ onPlay }: { onPlay?: () => void }) {
  return (
    <section className="relative grid grid-cols-1 sm:grid-cols-[auto_1fr]">
     
      <figure className="relative flex items-center justify-center sm:justify-start border-b sm:border-b-0 sm:border-r border-[var(--border-color)]">
        <button
          type="button"
          onClick={onPlay}
          title="Play Orange Rolling"
          aria-label="Play Orange Rolling"
          className="relative block cursor-pointer bg-transparent border-0 p-0"
        >
          <AvatarFlip />
        </button>
      </figure>

      <div className="flex flex-col justify-center gap-2.5 px-0 py-8 sm:py-10">
        <div className="border-y border-[var(--border-color)] flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="font-mono px-4 font-bold text-3xl md:text-[2.7rem] leading-none text-[var(--text-color)]">
            Ayush<span className="text-[var(--secondary-text)]"> Srivastava</span>
          </h1>
          <span className="text-xs font-mono text-[var(--secondary-text)]/50">
            आयुष श्रीवास्तव
          </span>
        </div>

        <FlipText phrases={taglines} />
      </div>
    </section>
  );
}
