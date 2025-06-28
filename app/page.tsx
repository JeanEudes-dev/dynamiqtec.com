import { allPosts } from "contentlayer/generated";
import PostListTable from "components/PostListTable";
import { generateSEO } from "lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    url: "https://dynamiqtec.com",
    locale: "en",
  });
}

export default function HomePage() {
  const posts = allPosts
    .filter((p) => p.language === "en")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Dynamiqtec Blog
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-prose">
          Curated insights from the intersection of AI, design, and engineering
          — crafted by Jean-Eudes Assogba.
        </p>
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-wider text-gray-400">
          Latest Posts
        </h2>
        <PostListTable posts={posts} locale="en" />
      </div>
    </section>
  );
}
