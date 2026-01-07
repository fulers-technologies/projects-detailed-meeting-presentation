import localFont from "next/font/local";

export const plusJakarta = localFont({
  src: [
    {
      path: "../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta",
});
