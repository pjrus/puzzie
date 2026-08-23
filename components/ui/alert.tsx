import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = {
  default: "border-border bg-card text-card-foreground",
  info: "border-(--sun-border) bg-(--sun-soft) text-(--sun-foreground)",
  success: "border-(--mint-border) bg-(--mint) text-(--mint-dark)",
  destructive: "border-(--coral-border) bg-(--coral-soft) text-destructive",
} as const;

type AlertVariant = keyof typeof alertVariants;

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: AlertVariant }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
        alertVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 min-h-4 font-extrabold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
