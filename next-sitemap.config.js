// Import 'allPosts' to generate paths. This might require this config to be .mjs or use dynamic import,
// or to pre-generate a list of posts if direct import is problematic in this context.
// For simplicity in this environment, I'll assume direct import works or a helper script
// would populate this data. In a real scenario, this needs careful setup.
// const { allPosts } = require(".contentlayer/generated/Post/index.js"); // Adjust path as needed

module.exports = {
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
    const alternateRefs = [
      {
        href: config.siteUrl + englishPath,
        hreflang: "en",
      },
      {
        href: config.siteUrl + frenchPath,
        hreflang: "fr",
      },
    ];

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
      lastmod: new Date().toISOString(), // Use current date as placeholder
      alternateRefs: alternateRefs,
    };
  },
  // additionalPaths: async (config) => {
  //   // If next-sitemap doesn't automatically find all posts from contentlayer,
  //   // we can generate them here.
  //   // This requires `allPosts` to be accessible here.
  //   const posts = allPosts; // This line is problematic in a standard .js config
  //   const paths = [];
  //   posts.forEach(post => {
  //     const englishPath = `/blog/${post.slug}`;
  //     const frenchPath = `/fr/blog/${post.slug}`;
  //     if (post.language === 'en') {
  //       paths.push({
  //         loc: englishPath,
  //         changefreq: 'weekly',
  //         priority: 0.7,
  //         lastmod: new Date(post.date).toISOString(),
  //         alternateRefs: [
  //           { href: config.siteUrl + englishPath, hreflang: 'en'},
  //           { href: config.siteUrl + frenchPath, hreflang: 'fr'}
  //         ]
  //       });
  //     } else { // language === 'fr'
  //       paths.push({
  //         loc: frenchPath,
  //         changefreq: 'weekly',
  //         priority: 0.7,
  //         lastmod: new Date(post.date).toISOString(),
  //         alternateRefs: [
  //           { href: config.siteUrl + englishPath, hreflang: 'en'},
  //           { href: config.siteUrl + frenchPath, hreflang: 'fr'}
  //         ]
  //       });
  //     }
  //   });
  //   return paths;
  // },
};
