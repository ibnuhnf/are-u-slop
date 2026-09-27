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
      primary: "bg-primary text-primary-contrast hover:bg-primary-hover shadow-xs",
      secondary:
        "bg-surface text-ink border border-surface-border hover:bg-surface-hover hover:border-surface-border-hover shadow-xs",
      outline:
        "bg-transparent text-ink border border-surface-border hover:bg-surface",
      ghost: "bg-transparent text-ink hover:bg-surface-hover",
      danger: "bg-danger text-primary-contrast hover:opacity-90 shadow-xs",
    };

    /* Asymmetric padding: horizontal 1.25-1.5x vertikal. Row height 32/36/44px. */
    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-sm gap-2",
      lg: "h-11 px-5 text-sm gap-2.5",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium select-none whitespace-nowrap",
          "rounded-md border border-transparent outline-none",
          "interactive-subtle",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
