import Image from "next/image";

// A slowly rotating mandala. Used inside cosmic backgrounds.
// Pure CSS animation (see .animate-spin-slow) so it is cheap and smooth.
export function RotatingMandala({
  className = "",
  reverse = false,
}: {
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <Image
        src="/patterns/mandala.svg"
        alt=""
        width={400}
        height={400}
        className={reverse ? "animate-spin-slower" : "animate-spin-slow"}
        priority={false}
      />
    </div>
  );
}
