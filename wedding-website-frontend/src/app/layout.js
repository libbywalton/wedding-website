import "./globals.css";
import { Beth_Ellen, Patrick_Hand } from "next/font/google";

const beth = Beth_Ellen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-beth",
});

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick",
});

// Colors are controlled via CSS variables in globals.css

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${beth.variable} ${patrick.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
