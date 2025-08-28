import type { Metadata } from 'next';

type SEOProps = {
  title?: string;
  description?: string;
  url: string;
  locale: "en" | "fr";
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
};

export function generateSEO({ 
  title, 
  description, 
  url, 
  locale, 
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  author = "Jean-Eudes Assogba",
  tags = []
}: SEOProps): Metadata {
  const siteName = "Dynamiqtec";

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

  // Generate proper alternate URLs
  const englishUrl = url.replace("/fr", "") || "https://dynamiqtec.com/";
  const frenchUrl = url.includes("/fr") ? url : url.replace("https://dynamiqtec.com", "https://dynamiqtec.com/fr");

  // Use custom image or fallback to OG generator
  const ogImageUrl = image 
    ? (image.startsWith('http') ? image : `https://dynamiqtec.com/images/${image}`)
    : `https://dynamiqtec.com/api/og?title=${encodeURIComponent(metaTitle)}&locale=${locale}`;

  return {
    title: metaTitle,
    description: metaDesc,
    authors: [{ name: author }],
    creator: author,
    publisher: siteName,
    keywords: tags.length > 0 ? tags.join(', ') : undefined,
    
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url,
      siteName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [author],
        tags,
      }),
    },
    
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      creator: "@jeaneudes_dev",
      images: [ogImageUrl],
    },
    
    alternates: {
      canonical: url,
      languages: {
        en: englishUrl,
        fr: frenchUrl,
      },
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Helper function for generating article structured data
export function generateArticleJsonLd({
  title,
  description,
  url,
  author,
  publishedTime,
  modifiedTime,
  image,
}: {
  title: string;
  description: string;
  url: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
}) {
  const ogImageUrl = image 
    ? (image.startsWith('http') ? image : `https://dynamiqtec.com/images/${image}`)
    : `https://dynamiqtec.com/api/og?title=${encodeURIComponent(title)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [ogImageUrl],
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author,
      url: "https://dynamiqtec.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Dynamiqtec",
      logo: {
        "@type": "ImageObject",
        url: "https://dynamiqtec.com/dynamiqtec.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
