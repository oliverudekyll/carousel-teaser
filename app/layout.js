import localFont from "next/font/local";
import DynamicFavicon from "../assets/components/DynamicFavicon/DynamicFavicon";

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

// Initial favicon is set to 1, but will be changed by the client component
const initialFavIconIndex = 1;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={`/favicons/favicon-${initialFavIconIndex}.ico`}
          sizes="any"
        />
      </head>
      <body className={`${alpinaTypeWriter.variable}`}>
        <DynamicFavicon />
        {children}
      </body>
    </html>
  );
}
