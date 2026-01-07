import type { Metadata } from "next";
import "./globals.css";
import { plusJakarta } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Fulers Technologies - Board Presentation",
  description:
    "Executive dashboard for Fulers Technologies LLC project portfolio",
  icons: {
    icon: "/assets/logo-sign-background-blue-512px.svg",
  },
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
