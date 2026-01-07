"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentProps<
  typeof ProgressPrimitive.Root
> {
  value?: number;
  brandColor?: string;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
  onAnimatedValueChange?: (value: number) => void;
}

function Progress({
  className,
  value,
  brandColor,
  animate = true,
  size = "md",
  onAnimatedValueChange,
  ...props
}: ProgressProps) {
  const [animatedValue, setAnimatedValue] = React.useState(0);

  React.useEffect(() => {
    if (!animate || !value) {
      setAnimatedValue(value || 0);
      onAnimatedValueChange?.(value || 0);
      return;
    }

    // Animate from 0 to target value
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        const newValue = Math.min(increment * currentStep, value);
        setAnimatedValue(newValue);
        onAnimatedValueChange?.(newValue);
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, animate, onAnimatedValueChange]);

  const progressColor = brandColor || "hsl(var(--primary))";
  const useCustomColor = !!brandColor;

  const sizeClasses = {
    sm: "h-2",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative w-full overflow-visible rounded-full",
        sizeClasses[size],
        useCustomColor ? "bg-muted" : "bg-primary/20",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full flex-1 transition-all relative rounded-full",
          !useCustomColor && "bg-primary",
        )}
        style={{
          width: `${animatedValue}%`,
          ...(useCustomColor && { backgroundColor: progressColor }),
          ...(animatedValue > 0 && {
            boxShadow: useCustomColor
              ? size === "lg"
                ? `0 0 15px 3px ${progressColor}90, 0 0 30px 5px ${progressColor}50`
                : `0 0 12px 2px ${progressColor}90, 0 0 24px 4px ${progressColor}50`
              : `0 0 12px 2px hsl(var(--primary) / 0.7), 0 0 24px 4px hsl(var(--primary) / 0.4)`,
          }),
          filter: size === "lg" ? "brightness(1.25)" : "brightness(1.18)",
          animation:
            animatedValue > 0
              ? "progress-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              : "none",
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
