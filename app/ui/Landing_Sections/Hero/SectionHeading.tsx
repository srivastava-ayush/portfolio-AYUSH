export default function SectionHeading({ command }: { command: string }) {
  return (
    <div className="flex items-center w-full border-y border-[var(--border-color)]">
      <span className="px-2 border-r border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">
        $
      </span>
      <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">
        {command}
      </span>
    </div>
  );
}
