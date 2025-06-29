import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Mdx from "components/Mdx";
import PostNav from "components/PostNav";
import { generateSEO } from "lib/seo";
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
  const url = `https://dynamiqtec.com/blog/${params.slug}`;

  return generateSEO({
    title: post?.title,
    description: post?.description,
    url,
    locale: "en",
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://dynamiqtec.com/blog/${post.slug}`,
            },
            headline: post.title,
            description: post.description,
            image: post.coverImage
              ? `https://dynamiqtec.com/images/${post.coverImage}`
              : `https://dynamiqtec.com/api/og?title=${encodeURIComponent(
                  post.title
                )}&locale=en`, // Fallback to OG image
            datePublished: new Date(post.date).toISOString(),
            dateModified: new Date(post.date).toISOString(), // Assuming date is last mod date too
            author: {
              "@type": "Person",
              name: post.author, // Assuming post.author is "Jean-Eudes Assogba"
            },
            publisher: {
              "@type": "Organization",
              name: "Dynamiqtec",
              logo: {
                "@type": "ImageObject",
                url: "https://dynamiqtec.com/dynamiqtec.png",
              },
            },
          }),
        }}
      />

      <PostNav current={post} all={allPosts} locale="en" />
    </article>
  );
}
