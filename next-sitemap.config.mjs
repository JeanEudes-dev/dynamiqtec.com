import fs from 'fs/promises';
import path from 'path';

export default {
  siteUrl: "https://dynamiqtec.com",
  generateRobotsTxt: false, // Set to false, we use a static robots.txt
  // Ensure trailingSlash is consistent with your Next.js config (default is false)
  // trailingSlash: false,

  // This transform function is crucial for setting up alternateRefs for each page.
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = "daily";
    let lastmod = new Date().toISOString();

    // Normalize path: remove '/index' if present (next-sitemap might add it)
    // and ensure no trailing slash for consistency, unless your site uses them.
    let cleanPath = path.replace(/\/index$/, "");
    if (cleanPath !== "/" && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }


    const isFrenchPath = cleanPath.startsWith("/fr");
    const englishEquivalentPath = isFrenchPath ? cleanPath.replace("/fr", "") || "/" : cleanPath;
    const frenchEquivalentPath = isFrenchPath ? cleanPath : `/fr${cleanPath === "/" ? "" : cleanPath}`;

    if (cleanPath === "/" || cleanPath === "/fr") {
      priority = 1.0;
    } else if (cleanPath.includes("/blog/")) {
      priority = 0.8;
      changefreq = "weekly";
      // lastmod for blog posts will be handled by additionalPaths or should be undefined here
      // to let additionalPaths override it. If a blog post is NOT in additionalPaths for some reason,
      // this lastmod would be a fallback. Consider setting to undefined if all posts are dynamic.
      lastmod = undefined;
    }

    // next-sitemap will prefix siteUrl to relative paths
    const alternateRefs = [
      { href: englishEquivalentPath, hreflang: "en" },
      { href: frenchEquivalentPath, hreflang: "fr" },
    ];

    return {
      loc: cleanPath, // Use the cleaned path
      changefreq: changefreq,
      priority: priority,
      lastmod: lastmod,
      alternateRefs: alternateRefs,
    };
  },

  additionalPaths: async (config) => {
    // Dynamically import allPosts from Contentlayer.
    // Ensure your contentlayer setup correctly generates this.
    // The path might need adjustment based on your project structure.
    const postsJsonPath = path.join(process.cwd(), '.contentlayer', 'generated', 'Post', '_index.json');
    let allPosts = [];
    try {
      const postsData = await fs.readFile(postsJsonPath, 'utf-8');
      allPosts = JSON.parse(postsData);
    } catch (err) {
      console.error("Failed to read or parse Contentlayer posts JSON for sitemap:", err);
      return []; // Return empty if we can't load posts
    }

    const paths = allPosts.map(post => {
      if (!post.slug || !post.language || !post.date) {
        console.warn('Skipping post due to missing slug, language, or date:', post.title || 'Unknown Title');
        return null; // Skip this post
      }

      const englishPath = `/blog/${post.slug}`;
      // Ensure French path is correctly formed
      const frenchPath = `/fr/blog/${post.slug}`;

      let currentPostPath = '';
      let alternates = [];

      // Ensure language is treated case-insensitively and correctly
      const lang = post.language.toLowerCase();

      if (lang.startsWith('en')) {
        currentPostPath = englishPath;
        alternates = [
          { href: englishPath, hreflang: 'en' }, // relative path
          { href: frenchPath, hreflang: 'fr' },   // relative path
        ];
      } else if (lang.startsWith('fr')) {
        currentPostPath = frenchPath;
        alternates = [
          { href: englishPath, hreflang: 'en' }, // relative path
          { href: frenchPath, hreflang: 'fr' },   // relative path
        ];
      } else {
        console.warn(`Skipping post with unsupported language: ${post.language} for slug: ${post.slug}`);
        return null; // Skip this post
      }

      if (!currentPostPath) return null;

      return {
        loc: currentPostPath,
        lastmod: new Date(post.date).toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
        alternateRefs: alternates,
      };
    }).filter(Boolean); // Filter out any null entries from skipped posts

    return paths;
  },
};
