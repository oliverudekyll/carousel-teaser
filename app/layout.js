import localFont from "next/font/local";

import "@styles/_reset.css";
import "@styles/globals.css";
import "@styles/variables.css";
import "@styles/typography.css";

const alpinaTypeWriter = localFont({
  src: [
    {
      path: "../assets/fonts/GT-Alpina-Typewriter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/GT-Alpina-Typewriter-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-alpina-typewriter",
});

export const metadata = {
  title: "Carousel Selections",
  description:
    "Õllegalerii is now called Carousel Selections - the boutique import agency for independent beer, wine and experiences 🎠 ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${alpinaTypeWriter.variable}`}>{children}</body>
    </html>
  );
}
