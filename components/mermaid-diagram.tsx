"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  brandColor?: string;
}

export function MermaidDiagram({
  chart,
  brandColor = "#1D4DFF",
}: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "base",
        themeVariables: {
          primaryColor: `${brandColor}20`,
          primaryTextColor: isDark ? "#ffffff" : "#000000",
          primaryBorderColor: brandColor,
          lineColor: isDark ? "#666666" : "#424242",
          secondaryColor: `${brandColor}10`,
          tertiaryColor: `${brandColor}05`,
          textColor: isDark ? "#ffffff" : "#000000",
          mainBkg: isDark ? "#1f1f1f" : "#ffffff",
          nodeBorder: brandColor,
          clusterBkg: isDark ? "#2a2a2a" : "#f5f5f5",
          clusterBorder: isDark ? "#555555" : "#cccccc",
          edgeLabelBackground: isDark ? "#1f1f1f" : "#ffffff",
        },
        flowchart: {
          curve: "basis",
          padding: 20,
        },
      });

      const renderDiagram = async () => {
        try {
          setIsLoading(true);
          const { svg } = await mermaid.render(
            `mermaid-${Math.random().toString(36).substr(2, 9)}`,
            chart,
          );
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Error rendering mermaid diagram:", error);
          if (ref.current) {
            ref.current.innerHTML = `<div class="text-destructive p-4">Error rendering diagram</div>`;
          }
        } finally {
          setIsLoading(false);
        }
      };

      renderDiagram();
    }
  }, [chart, brandColor, isDark]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">
            Loading diagram...
          </div>
        </div>
      )}
      <div
        ref={ref}
        className="mermaid-diagram overflow-x-auto p-4 bg-muted/30 rounded-lg"
      />
    </div>
  );
}
