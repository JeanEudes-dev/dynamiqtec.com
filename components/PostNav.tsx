import Link from "next/link";
import { Post } from "contentlayer/generated";

type Props = {
  current: Post;
  all: Post[];
  locale: "en" | "fr";
};

export default function PostNav({ current, all, locale }: Props) {
  const posts = all
    .filter((p) => p.language === locale)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const index = posts.findIndex((p) => p.slug === current.slug);
  const prev = posts[index - 1] ?? null;
  const next = posts[index + 1] ?? null;

  const base = locale === "fr" ? "/fr/blog/" : "/blog/";
  const home = locale === "fr" ? "/fr" : "/";

  return (
    <nav className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 space-y-4">
      <div className="flex gap-2">
        <Link href={home} className="hover:underline">
          {locale === "fr" ? "Accueil" : "Home"}
        </Link>
        <span>/</span>
        <Link href={base} className="hover:underline">
          Blog
        </Link>
        <span>/</span>
        <span className="truncate">{current.title}</span>
      </div>

      <div className="flex justify-between text-xs mt-4">
        {prev ? (
          <Link href={`${base}${prev.slug}`} className="hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`${base}${next.slug}`}
            className="hover:underline text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
