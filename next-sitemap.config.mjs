import fs from 'fs/promises';
import path from 'path';

// Helper to get parent path, e.g. /blog/foo -> /blog, /about -> /
function getParentPath(p) {
  if (p === "/" || p === "") return "/";
  const lastSlash = p.lastIndexOf('/');
  if (lastSlash === 0) return "/"; // path like /about
  return p.substring(0, lastSlash); // path like /blog/foo
}

export default {
  siteUrl: "https://dynamiqtec.com",
  generateRobotsTxt: false, // Set to false, we use a static robots.txt
  // Remove static alternateRefs, as we'll generate them dynamically per page
  // alternateRefs: [
  //   { href: "https://dynamiqtec.com", hreflang: "en" },
  //   { href: "https://dynamiqtec.com/fr", hreflang: "fr" },
  // ],

  // This transform function is crucial for setting up alternateRefs for each page
  // and ensuring all dynamic blog post URLs are correctly formatted.
  transform: async (config, path) => {
    const baseFrPath = path.startsWith("/fr/");
    const englishPath = baseFrPath ? path.replace("/fr", "") : path;
    const frenchPath = baseFrPath ? path : `/fr${path}`;

    // Default priority and changefreq. Can be customized per path.
    let priority = 0.7;
    let changefreq = "daily";

    if (path === "/" || path === "/fr") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.includes("/blog/")) {
      priority = 0.8;
      changefreq = "weekly"; // Or daily if posts are frequent
    }


    // This is a simplified way to handle alternate refs.
    // A more robust solution would involve checking if a translated version
    // actually exists for each path. For example, by querying allPosts.
    // For now, we assume if a path exists, its alternate might exist.
    let enAlternateHref, frAlternateHref;

    // Handle homepage separately, as its alternate refs are just / and /fr
    if (englishPath === "/") {
      enAlternateHref = "/";
      frAlternateHref = "/fr"; // Assuming french version of homepage is /fr
    } else {
      // For other pages, construct href to parent, expecting next-sitemap to append slug
      enAlternateHref = config.siteUrl + getParentPath(englishPath);
      frAlternateHref = config.siteUrl + getParentPath(frenchPath);
    }

    const alternateRefs = [
      {
        href: enAlternateHref,
        hreflang: "en",
      },
    ];
    // END OF PREVIOUS alternateRefs LOGIC - NOW REMOVED FOR AUTO-DETECTION TEST

    // If the current path is an index.html (usually from build output for root paths),
    // next-sitemap might list it. We want the clean path.
    if (path.endsWith("/index.html")) {
        path = path.replace("/index.html", "/");
    }
    // Ensure trailing slash for consistency if desired, or remove if not.
    // next-sitemap usually handles this based on Next.js export trailingSlash config.
    // Default is no trailing slash for Next.js.

    return {
      loc: path, // This will be the path discovered by next-sitemap
      changefreq: changefreq,
      priority: priority,
      lastmod: path.includes("/blog/") ? undefined : new Date().toISOString(),
      alternateRefs: (path === '/' || path === '/fr') ? [
          { href: '/', hreflang: 'en' },
          { href: '/fr', hreflang: 'fr' },
        ] : [
          { href: config.siteUrl, hreflang: 'en' },
          { href: config.siteUrl + '/fr', hreflang: 'fr' },
        ],
    };
  },
  additionalPaths: async (config) => {
    const postsJsonPath = path.join(process.cwd(), '.contentlayer', 'generated', 'Post', '_index.json');
    let allPosts = [];
    try {
      const postsData = await fs.readFile(postsJsonPath, 'utf-8');
      allPosts = JSON.parse(postsData);
    } catch (err) {
      console.error("Failed to read or parse Contentlayer posts JSON:", err);
      return []; // Return empty if we can't load posts
    }

    const paths = [];
    allPosts.forEach(post => {
      // Ensure post.slug and post.language are defined, which they should be based on contentlayer.config.ts
      // The structure of post objects from the JSON might be different from direct import,
      // especially regarding _raw. We need to ensure `slug` and `language` are top-level from computedFields.
      if (!post.slug || !post.language) {
        console.warn('Skipping post due to missing slug or language:', post.title || 'Unknown Title');
        return;
      }

      const englishPath = `/blog/${post.slug}`;
      const frenchPath = `/fr/blog/${post.slug}`;

      let postPath = '';
      if (post.language === 'en') {
        postPath = englishPath;
      } else if (post.language === 'fr') {
        postPath = frenchPath;
      } else {
        // Skip if language is not 'en' or 'fr' or is undefined
        console.warn(`Skipping post with unsupported language: ${post.language} for slug: ${post.slug}`);
        return;
      }

      paths.push({
        loc: postPath,
        changefreq: 'weekly', // As defined for blog posts in transform
        priority: 0.8,
        lastmod: new Date(post.date).toISOString(),
        changefreq: 'weekly',
        alternateRefs: [ // Base URLs, expect next-sitemap to append non-localized path from loc
          { href: config.siteUrl, hreflang: 'en' },
          { href: config.siteUrl + '/fr', hreflang: 'fr' },
        ],
      });
    });
    return paths;
  },
};
