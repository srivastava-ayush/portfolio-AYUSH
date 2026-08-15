import ProfileHeader from "./ProfileHeader";
import CurrentStack from "./CurrentStack";
import SocialLinks from "./SocialLinks";
import Contributions from "./Contributions";
import Bio from "./Bio";

export default function Hero({ onPlay }: { onPlay?: () => void }) {
  return (
    <div className="w-full flex flex-col divide-y divide-[var(--border-color)]">
      <section className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute opacity-7  inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
          }}
        >
          <source src="/misc/bg.mp4" type="video/mp4" />
        </video>
        <ProfileHeader onPlay={onPlay} />
        <SocialLinks />
      </section>
        <CurrentStack />
      <Contributions />
      <Bio />
    </div>
  );
}
