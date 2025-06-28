import { allPosts } from "contentlayer/generated";
import PostListTable from "components/PostListTable";
import SearchInput from "components/SearchInput";

export default function BlogIndex() {
  const posts = allPosts
    .filter((p) => p.language === "en")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-gray-500 dark:text-gray-400">
          All published articles
        </p>
        <SearchInput posts={posts} locale="en" />
      </div>
      <PostListTable posts={posts} locale="en" />
    </section>
  );
}
