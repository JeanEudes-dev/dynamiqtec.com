import Link from "next/link";
import { Post } from "contentlayer/generated";

type Props = {
  posts: Post[];
  locale: "en" | "fr";
  showViews?: boolean; // placeholder for future analytics
};

export default function PostListTable({
  posts,
  locale,
  showViews = false,
}: Props) {
  return (
    <div className="w-full mt-6">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead className="text-gray-500 dark:text-gray-400 text-left">
          <tr className="border-b border-gray-800">
            <th className="py-2 w-1/6 font-normal">date</th>
            <th className="py-2 font-normal">title</th>
            {showViews && (
              <th className="py-2 w-1/6 font-normal text-right">views</th>
            )}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const year = new Date(post.date).getFullYear();
            const url = `/${locale === "en" ? "" : "fr/"}blog/${post.slug}`;
            const formatted = new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
            });

            return (
              <tr
                key={post.slug}
                className="border-b border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              >
                <td className="py-2 text-gray-400">{formatted}</td>
                <td className="py-2">
                  <Link href={url} className="hover:underline font-medium">
                    {post.title}
                  </Link>
                </td>
                {showViews && (
                  <td className="py-2 text-right text-gray-500">—</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
