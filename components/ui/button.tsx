import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 border text-sm font-extrabold whitespace-nowrap outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const buttonVariants = {
  default:
    "border-[var(--coral-dark)] bg-primary text-primary-foreground hover:bg-[var(--coral-dark)]",
  destructive:
    "border-destructive bg-destructive text-destructive-foreground hover:bg-[var(--coral-dark)]",
  outline:
    "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
  secondary:
    "border-secondary-foreground bg-secondary text-secondary-foreground hover:bg-[var(--line)]",
  ghost:
    "border-transparent bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  link: "border-transparent bg-transparent px-0 text-primary underline-offset-4 hover:underline",
  choice:
    "h-auto min-h-14 w-full justify-start border-border bg-card px-3.5 py-2.5 text-left text-foreground hover:border-primary data-[selected=true]:border-primary data-[selected=true]:bg-[var(--coral-soft)] data-[selected=true]:text-[var(--coral-dark)]",
} as const;

const buttonSizes = {
  default: "min-h-12 px-[18px] py-2",
  xs: "min-h-9 px-2 text-xs",
  sm: "min-h-10 px-3",
  lg: "min-h-12 px-6",
  icon: "size-12 px-0",
  "icon-xs": "size-9 px-0",
  "icon-sm": "size-10 px-0",
  "icon-lg": "size-12 px-0",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonBase,
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
