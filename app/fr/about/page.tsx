import { generateSEO } from "lib/seo";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "À propos de Jean-Eudes Assogba",
    description:
      "En savoir plus sur Jean-Eudes Assogba – un développeur full-stack et axé sur l'IA.",
    url: "https://dynamiqtec.com/fr/about",
    locale: "fr",
  });
}

export default function About() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">À propos de Jean-Eudes Assogba</h1>
        <p>
          Bonjour, je suis Jean-Eudes — un développeur full-stack passionné par
          l'IA, la performance et le design épuré. Ce blog est mon laboratoire
          personnel pour partager des projets, des idées et des expériences à
          l'intersection du code et de la créativité.
        </p>
        <p>
          Mon objectif est de créer des produits rapides, élégants et durables,
          tout en développant une identité numérique forte à long terme.
          Bienvenue dans mon univers.
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
