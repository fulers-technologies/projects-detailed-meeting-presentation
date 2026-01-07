"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PATTERN_PATHS } from "@/lib/constants";

interface BackgroundPatternProps {
  pattern?: "geometric" | "dots" | "waves";
  opacity?: number;
}

export function BackgroundPattern({
  pattern = "geometric",
  opacity = 0.03,
}: BackgroundPatternProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const adjustedOpacity = resolvedTheme === "dark" ? opacity * 0.5 : opacity;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: adjustedOpacity }}
    >
      <Image
        src={PATTERN_PATHS[pattern]}
        alt=""
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
