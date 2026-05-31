// Calm cream "scripture" background for the library and reading screens.
// Kept light and low-contrast so long Hindi text stays comfortable to read.
export function ParchmentBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, #fff8ee 0%, #fdeede 45%, #f3ddc0 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/patterns/mandala.svg')",
          backgroundSize: "360px",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
