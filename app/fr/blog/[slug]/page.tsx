import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Mdx from "components/Mdx";
import PostNav from "components/PostNav";

export async function generateStaticParams() {
  return allPosts
    .filter((p) => p.language === "fr")
    .map((post) => ({ slug: post.slug }));
}

export default function BlogPostFr({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (p) => p.slug === params.slug && p.language === "fr"
  );

  if (!post) notFound();

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <Image
          src="/me.jpeg"
          alt={post.author}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{post.author}</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("fr", { dateStyle: "long" })}
        </time>
      </div>
      <Image
        src={`/images/${post.coverImage}`}
        alt={post.title}
        width={800}
        height={400}
        className="rounded-md"
      />
      <Mdx code={post.body.code} />
      <PostNav current={post} all={allPosts} locale="fr" />
    </article>
  );
}
