"use client";

import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Header from "../components/Header";
import { IBM_Plex_Serif, Inter, JetBrains_Mono } from "next/font/google";

const plex = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plex.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/dynamiqtec.png" />
        <link rel="apple-touch-icon" href="/dynamiqtec.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main className="max-w-3xl mx-auto py-10 px-4 prose dark:prose-invert">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
