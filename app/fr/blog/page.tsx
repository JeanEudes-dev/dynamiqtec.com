import { allPosts } from "contentlayer/generated";
import PostListTable from "components/PostListTable";
import SearchInput from "components/SearchInput";
import { generateSEO } from "lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Articles de Blog | Dynamiqtec",
    description:
      "Parcourez tous les articles publiés par Dynamiqtec sur l'IA, le design et l'ingénierie logicielle.",
    url: "https://dynamiqtec.com/fr/blog",
    locale: "fr",
  });
}

export default function BlogFrIndex() {
  const posts = allPosts
    .filter((p) => p.language === "fr")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Tous les articles publiés
        </p>
        <SearchInput posts={posts} locale="fr" />
      </div>
      <PostListTable posts={posts} locale="fr" />
    </section>
  );
}
