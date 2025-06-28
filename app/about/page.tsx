import { generateSEO } from "lib/seo";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "About Jean-Eudes Assogba",
    description:
      "Learn more about Jean-Eudes Assogba – a full-stack and AI-focused developer.",
    url: "https://dynamiqtec.com/about",
    locale: "en",
  });
}

export default function About() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">About Jean-Eudes Assogba</h1>
        <p>
          Hi, I’m Jean-Eudes — a full-stack developer passionate about AI,
          performance, and clean design. This blog is my personal lab to share
          projects, ideas, and experiments at the intersection of code and
          creativity.
        </p>
        <p>
          My goal is to build fast, elegant, and sustainable products, while
          developing a strong digital identity for the long term. Welcome to my
          world.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        {[
          {
            name: "GitHub",
            icon: <Github size={20} />,
            url: "https://github.com/JeanEudes-dev",
          },
          {
            name: "LinkedIn",
            icon: <Linkedin size={20} />,
            url: "https://www.linkedin.com/in/jean-eudes-assogba/",
          },
          {
            name: "Twitter",
            icon: <Twitter size={20} />,
            url: "https://twitter.com/jeaneudes_dev",
          },
        ].map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-gray-300 dark:border-gray-700 p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white/80 dark:bg-gray-900/70 backdrop-blur-md"
          >
            <span className="font-medium">{social.name}</span>
            <span className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition">
              {social.icon}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
