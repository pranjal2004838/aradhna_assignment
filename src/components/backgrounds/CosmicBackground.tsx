import { FloatingParticles } from "./FloatingParticles";
import { RotatingMandala } from "./RotatingMandala";

// Cosmic / astrology background used on landing, login, Guruji and Sankalp.
// Layers: base gradient -> rotating mandalas -> radial glow -> particles.
export function CosmicBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--gradient-cosmic)" }}
      aria-hidden="true"
    >
      <RotatingMandala className="absolute -top-40 -right-40 w-[520px] opacity-20" />
      <RotatingMandala className="absolute -bottom-48 -left-40 w-[460px] opacity-15" reverse />
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-mantra-glow/10 blur-3xl" />
      <FloatingParticles />
    </div>
  );
}
