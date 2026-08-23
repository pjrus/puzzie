type IconName =
  | "arrow-left"
  | "arrow-right"
  | "bar-chart"
  | "calendar"
  | "check"
  | "chevron-down"
  | "clock"
  | "flame"
  | "grid"
  | "lightbulb"
  | "menu"
  | "play"
  | "refresh"
  | "spark"
  | "trophy"
  | "x";

export function Icon({
  name,
  size = 18,
  strokeWidth = 2,
  className = "",
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow-left":
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
          <path d="M9 12h10" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "bar-chart":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 16v-5" />
          <path d="M12 16V7" />
          <path d="M16 16v-8" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="17" rx="3" />
          <path d="M16 2.5v4M8 2.5v4M3 9.5h18" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4.5 4.5L19 7" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12.5 22c4.1-.3 7-3.1 7-7.1 0-3.5-2.3-5.8-4.5-8.3-.4 2.2-1.5 3.7-2.8 4.5.2-3.6-1.7-6.6-4.2-8.1.2 3.8-3 5.9-3 10.2C5 18.6 8.1 22 12.5 22Z" />
          <path d="M10 17.5c0-1.2.8-2.2 2-3 .2 1.5 1.2 2.1 1.2 3.2 0 1.1-.8 2-1.8 2s-1.4-.8-1.4-2.2Z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4" />
          <path d="M8.8 15.2c-1.2-.9-2-2.4-2-4.2a5.2 5.2 0 0 1 10.4 0c0 1.8-.8 3.3-2 4.2-.6.5-1 1.1-1.1 1.8h-4.2c-.1-.7-.5-1.3-1.1-1.8Z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="m9 6 9 6-9 6V6Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 11a8 8 0 0 0-14.9-3M4 5v4h4M4 13a8 8 0 0 0 14.9 3M20 19v-4h-4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />
          <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
          <path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4M9 4V2h6v2" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
  }
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label="Puzzie home">
      <span
        className="grid h-9 w-9 place-items-center border-2 border-(--ink) bg-(--coral) text-(--ink)"
        aria-hidden="true"
      >
        <span className="text-lg font-black tracking-[-0.03em]">pz</span>
      </span>
      {!compact && (
        <span className="display-font text-[1.45rem] font-semibold tracking-[-0.03em]">
          puzzie
        </span>
      )}
    </span>
  );
}

export type { IconName };
