"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-mono text-[11px] uppercase tracking-[0.15em] transition duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-accent-primary bg-accent-primary px-5 py-3 text-bg-base shadow-glow hover:shadow-glow-strong",
        ghost:
          "border-border bg-transparent px-5 py-3 text-text-primary hover:border-accent-primary hover:bg-accent-primary/10",
        subtle:
          "border-border bg-bg-surface px-4 py-2 text-text-muted hover:text-text-primary",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4 text-[10px]",
        lg: "h-14 px-6 text-[11px]",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
