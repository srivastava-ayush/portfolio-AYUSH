import { GithubLogo, LinkedinLogo, XLogo, Envelope } from "@phosphor-icons/react";

const socialLinks = [
  { href: "https://github.com/srivastava-ayush", icon: GithubLogo, label: "GitHub" },
  { href: "https://www.linkedin.com/in/constayush/", icon: LinkedinLogo, label: "LinkedIn" },
  { href: "https://www.x.com/srivastava-ayush/", icon: XLogo, label: "X" },
  { href: "mailto:constayush@gmail.com", icon: Envelope, label: "Mail" },
];

export default function SocialLinks() {
  return (
    <section className="border-t border-[var(--border-color)] relative flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
      <div className="flex items-center gap-2">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className="flex items-center justify-center size-9 border border-[var(--border-color)] bg-[var(--glass-bg-color)] rounded-md text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:border-[var(--accent-color)] transition-all duration-200"
          >
            <Icon size={17} weight="fill" className="opacity-80 hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      <a
        onClick={() => window.open("/misc/ayush_resume_intern.pdf", "_blank")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-[var(--secondary-text)] border border-[var(--border-color)] bg-[var(--resume-btn-color)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] rounded-md transition-all duration-200 cursor-pointer"
      >
        <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="size-3">
          <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36z" />
        </svg>
        Resume
      </a>
    </section>
  );
}
