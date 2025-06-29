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
          Blog Dynamiqtec
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-prose">
          Perspectives choisies à l'intersection de l'IA, du design et de
          l'ingénierie — rédigées par Jean-Eudes Assogba.
        </p>
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-wider text-gray-400">
          Derniers Articles
        </h2>
        <PostListTable posts={posts} locale="fr" />
      </div>
    </section>
  );
}
