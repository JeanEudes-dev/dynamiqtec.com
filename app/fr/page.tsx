import { allPosts } from "contentlayer/generated";
import PostListTable from "components/PostListTable";
import { generateSEO } from "lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    url: "https://dynamiqtec.com/fr",
    locale: "fr",
  });
}

export default function HomeFr() {
  const posts = allPosts
    .filter((p) => p.language === "fr")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Jean-Eudes Assogba
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-prose">
          Un laboratoire numérique pour le développement full-stack et l'IA.
          Minimaliste, multilingue, ultra rapide.
        </p>
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-wider text-gray-400">
          Articles
        </h2>
        <PostListTable posts={posts} locale="fr" />
      </div>
    </section>
  );
}
