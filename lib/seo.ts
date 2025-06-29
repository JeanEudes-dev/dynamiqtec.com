type SEOProps = {
  title?: string;
  description?: string;
  url: string;
  locale: "en" | "fr";
};

export function generateSEO({ title, description, url, locale }: SEOProps) {
  const siteName = "Dynamiqtec"; // Site name is likely fine as is, or could be localized if desired. For now, keep it simple.

  let defaultTitle: string;
  let defaultDesc: string;

  if (locale === "fr") {
    defaultTitle = "Blog Dynamiqtec";
    defaultDesc =
      "Perspectives choisies à l'intersection de l'IA, du design et de l'ingénierie — rédigées par Jean-Eudes Assogba.";
  } else {
    // Default to English
    defaultTitle = "Dynamiqtec Blog";
    defaultDesc =
      "Curated insights from the intersection of AI, design, and engineering — crafted by Jean-Eudes Assogba.";
  }

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
