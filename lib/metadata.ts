import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  lang?: 'en' | 'fr';
}

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage = '/dynamiqtec.png',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author = 'Jean-Eudes Assogba',
  tags = [],
  lang = 'en'
}: SEOProps): Metadata {
  const siteName = 'Dynamiqtec';
  const siteUrl = 'https://dynamiqtec.com';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;
  
  // Generate image URL
  const imageUrl = ogImage.startsWith('/') ? `${siteUrl}${ogImage}` : ogImage;
  
  const metadata: Metadata = {
    title: fullTitle,
    description,
    authors: [{ name: author }],
    creator: author,
    publisher: siteName,
    keywords: tags.join(', '),
    
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: ogType,
      ...(ogType === 'article' && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [author],
        tags,
      }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@jeaneudes_dev',
      images: [imageUrl],
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
    
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
  };

  return metadata;
}

export function generateArticleSchema({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  canonical,
  ogImage,
}: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  canonical: string;
  ogImage: string;
}) {
  const siteUrl = 'https://dynamiqtec.com';
  const imageUrl = ogImage.startsWith('/') ? `${siteUrl}${ogImage}` : ogImage;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
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
        url: `${siteUrl}/dynamiqtec.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${canonical}`,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://dynamiqtec.com${item.url}`,
    })),
  };
}