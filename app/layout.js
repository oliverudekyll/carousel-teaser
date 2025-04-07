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
  images: [
    {
      url: "/social-preview.jpg",
      width: 1200,
      height: 630,
      alt: "Carousel Selections",
    },
  ],
};

// Initial favicon is set to 1, but will be changed by the client component
const initialFavIconIndex = 1;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
      </head>
      <body className={`${alpinaTypeWriter.variable}`}>{children}</body>
    </html>
  );
}
