import type { Metadata } from "next";
import "./globals.css";
import { plusJakarta } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Fulers Technologies - Board Presentation",
  description:
    "Executive dashboard for Fulers Technologies LLC project portfolio. Comprehensive overview of IMS, MNGO, and VisionIQ projects with real-time progress tracking and analytics.",
  icons: {
    icon: "/assets/logo-sign-background-blue-512px.svg",
    apple: "/assets/logo-sign-background-blue-512px.svg",
  },
  openGraph: {
    title: "Fulers Technologies - Board Presentation",
    description:
      "Executive dashboard for Fulers Technologies LLC project portfolio. Comprehensive overview of IMS, MNGO, and VisionIQ projects.",
    url: "https://Fulers-portfolio.vercel.app",
    siteName: "Fulers Technologies",
    images: [
      {
        url: "/assets/logo-sign-background-blue-512px.png",
        width: 1200,
        height: 630,
        alt: "Fulers Technologies Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fulers Technologies - Board Presentation",
    description:
      "Executive dashboard for Fulers Technologies LLC project portfolio",
    images: ["/assets/logo-sign-background-blue-512px.png"],
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
