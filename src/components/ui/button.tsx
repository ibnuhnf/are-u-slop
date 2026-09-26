import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      primary:
        "bg-primary text-primary-contrast hover:bg-primary-hover shadow-xs focus-visible:ring-primary",
      secondary:
        "bg-surface text-ink hover:bg-surface-hover border border-surface-border shadow-xs focus-visible:ring-primary",
      outline:
        "bg-transparent text-ink hover:bg-surface border border-surface-border focus-visible:ring-primary",
      ghost:
        "bg-transparent text-ink hover:bg-surface-hover focus-visible:ring-primary",
      danger:
        "bg-danger text-white hover:opacity-90 shadow-xs focus-visible:ring-danger",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 py-2 text-sm gap-2",
      lg: "h-11 px-5 text-base gap-2.5",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium select-none min-h-[36px]",
          "rounded-md border border-transparent outline-none",
          "interactive-subtle",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
