import type { Metadata } from "next";
import "./globals.css";
import { plusJakarta } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Fuelers Technologies - Board Presentation",
  description:
    "Executive dashboard for Fuelers Technologies LLC project portfolio",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakarta.variable} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
