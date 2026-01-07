"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface AnimatedProgressWithLabelProps {
  value: number;
  brandColor: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  showPercentage?: boolean;
}

export function AnimatedProgressWithLabel({
  value,
  brandColor,
  size = "md",
  label,
  showPercentage = true,
}: AnimatedProgressWithLabelProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  return (
    <div className="space-y-3">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-semibold text-foreground">
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              className={
                size === "lg"
                  ? "text-3xl font-extrabold"
                  : "text-sm font-semibold"
              }
              style={{ color: brandColor }}
            >
              {Math.round(animatedValue)}%
            </span>
          )}
        </div>
      )}
      <Progress
        value={value}
        brandColor={brandColor}
        size={size}
        animate={true}
        onAnimatedValueChange={setAnimatedValue}
      />
    </div>
  );
}
