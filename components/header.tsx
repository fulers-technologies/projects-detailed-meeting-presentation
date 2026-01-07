"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LOGO_PATHS } from "@/lib/constants";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? LOGO_PATHS.blueLight
      : LOGO_PATHS.blueDark;

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname?.startsWith("/project");
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoSrc}
              alt="Fuelers Technologies"
              width={180}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/reports"
                className={`transition-colors ${
                  isActive("/reports")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Reports
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <div className="text-xs text-muted-foreground hidden sm:block">
                Board Meeting •{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
