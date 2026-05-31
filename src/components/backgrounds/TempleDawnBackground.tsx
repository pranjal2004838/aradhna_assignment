import Image from "next/image";

// Warm "temple at dawn" background for home, jaap and completion screens.
// Layers: dawn gradient -> diya glow -> temple silhouette at the bottom.
export function TempleDawnBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--gradient-temple-dawn)" }}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-divine-gold/30 blur-3xl" />
      <Image
        src="/illustrations/temple-silhouette.svg"
        alt=""
        width={1200}
        height={240}
        priority={false}
        className="absolute bottom-0 left-0 w-full opacity-40"
      />
    </div>
  );
}
