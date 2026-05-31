"use client";

// Small set of shared UI building blocks. Keeping them tiny and in one place
// makes the screens read like plain English.
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

// Shared class string for buttons and button-like links.
export function buttonClasses(variant: Variant = "primary", size: Size = "md"): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-gold/70";
  const sizes: Record<Size, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-saffron-gold to-sacred-orange text-cosmic-indigo shadow-[0_10px_30px_-10px_rgba(231,111,81,0.7)] hover:brightness-105",
    secondary:
      "border border-divine-gold/40 bg-white/5 text-soft-ash backdrop-blur hover:bg-white/10",
    ghost: "text-soft-ash/80 hover:text-soft-ash",
  };
  return `${base} ${sizes[size]} ${variants[variant]}`;
}

// Framer Motion defines its own drag / animation event handlers, so we omit
// the native ones to avoid a type clash when spreading button props.
type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${buttonClasses(variant, size)} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

// Glassmorphism card for dark / cosmic screens.
export function GlassCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`glass-card rounded-3xl ${className}`}>{children}</div>;
}

// Selectable chip used for deity / intention / filter choices.
export function Chip({
  selected = false,
  onClick,
  children,
  className = "",
}: {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2 text-sm transition-all ${
        selected
          ? "border-divine-gold bg-divine-gold/20 text-divine-gold shadow-[0_0_18px_-4px_rgba(255,209,102,0.6)]"
          : "border-white/15 bg-white/5 text-soft-ash/80 hover:border-divine-gold/40"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Rotating mandala loader with a calm message.
export function MandalaLoader({ message = "Preparing your ritual…" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="h-12 w-12 rounded-full border-2 border-divine-gold/30 border-t-divine-gold animate-spin" />
      <p className="font-deva text-sm text-soft-ash/70">{message}</p>
    </div>
  );
}
