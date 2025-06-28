import { allPosts } from "contentlayer/generated";
import PostListTable from "components/PostListTable";
import SearchInput from "components/SearchInput";
import { generateSEO } from "lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = allPosts.find(
    (p) => p.slug === params.slug && p.language === "en"
  );
  const url = `https://dynamiqtec.com/blog/${params.slug}`;

  return generateSEO({
    title: post?.title,
    description: post?.description,
    url,
    locale: "en",
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
