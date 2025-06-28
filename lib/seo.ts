type SEOProps = {
  title?: string;
  description?: string;
  url: string;
  locale: "en" | "fr";
};

export function generateSEO({ title, description, url, locale }: SEOProps) {
  const siteName = "Dynamiqtec";
  const defaultTitle = "Dynamiqtec Blog";
  const defaultDesc =
    "Curated insights from the intersection of AI, design, and engineering — crafted by Jean-Eudes Assogba.";

  const metaTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDesc = description || defaultDesc;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url,
      siteName,
      locale,
      type: "website",
      images: [
        {
          url: `https://dynamiqtec.com/api/og?title=${encodeURIComponent(
            metaTitle
          )}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [
        `https://dynamiqtec.com/api/og?title=${encodeURIComponent(
          metaTitle
        )}&locale=${locale}`,
      ],
    },
    alternates: {
      canonical: url,
      languages: {
        en: url.replace("/fr", ""),
        fr: url.includes("/fr") ? url : `/fr${new URL(url).pathname}`,
      },
    },
  };
}
