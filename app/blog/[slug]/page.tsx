import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Mdx from "components/Mdx";
import PostNav from "components/PostNav";
import { generateSEO, generateArticleJsonLd } from "lib/seo";
import { Metadata } from "next";

export async function generateStaticParams() {
  return allPosts
    .filter((p) => p.language === "en")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = allPosts.find(
    (p) => p.slug === params.slug && p.language === "en"
  );
  
  if (!post) {
    return { title: "Post not found | Dynamiqtec" };
  }
  
  const url = `https://dynamiqtec.com/blog/${params.slug}`;

  return generateSEO({
    title: post.title,
    description: post.description,
    url,
    locale: "en",
    type: "article",
    image: post.coverImage,
    publishedTime: post.date,
    author: post.author,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (p) => p.slug === params.slug && p.language === "en"
  );

  if (!post) notFound();

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <Image
          src="/me.png"
          alt={post.author}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{post.author}</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en", { dateStyle: "long" })}
        </time>
      </div>
      {post.coverImage && (
        <Image
          src={`/images/${post.coverImage}`}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-md"
        />
      )}
      <Mdx code={post.body.code} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleJsonLd({
            title: post.title,
            description: post.description,
            url: `https://dynamiqtec.com/blog/${post.slug}`,
            author: post.author,
            publishedTime: new Date(post.date).toISOString(),
            image: post.coverImage,
          })),
        }}
      />

      <PostNav current={post} all={allPosts} locale="en" />
    </article>
  );
}
