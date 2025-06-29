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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Dynamiqtec",
                  url: "https://dynamiqtec.com",
                  logo: "https://dynamiqtec.com/dynamiqtec.png",
                  sameAs: [
                    "https://github.com/JeanEudes-dev",
                    "https://www.linkedin.com/in/jean-eudes-assogba/",
                    "https://twitter.com/jeaneudes_dev",
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Dynamiqtec",
                  url: "https://dynamiqtec.com",
                  // potentialAction: {
                  //   "@type": "SearchAction",
                  //   target: "https://dynamiqtec.com/search?q={search_term_string}",
                  //   "query-input": "required name=search_term_string",
                  // },
                },
              ],
            }),
          }}
        />
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
