import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border-primary bg-primary text-primary-foreground",
  secondary: "border-secondary bg-secondary text-secondary-foreground",
  destructive: "border-destructive bg-destructive text-destructive-foreground",
  outline: "border-border bg-transparent text-foreground",
  ghost: "border-transparent text-foreground",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: BadgeVariant;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2.5 py-1 text-[0.69rem] font-black uppercase tracking-[0.08em] whitespace-nowrap",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
