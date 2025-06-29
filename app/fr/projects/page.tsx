import { generateSEO } from "lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Projets",
    description:
      "Sélection de projets full-stack et IA réalisés par Jean-Eudes Assogba.",
    url: "https://dynamiqtec.com/fr/projects",
    locale: "fr",
  });
}

const projects = [
  {
    title: "BrollyHub",
    url: "https://brollyhub.com",
    description:
      "Plateforme communautaire alimentée par l'IA : réservation, calendriers, offres d'experts, tableaux blancs et collaboration en temps réel.",
    year: 2025,
  },
  {
    title: "RenoSmarter AI",
    url: "https://renosmarter.ai",
    description:
      "Estimateur de coûts de rénovation alimenté par l'IA utilisant Voiceflow, Airtable et des invites adaptées au domaine.",
    year: 2025,
  },
  {
    title: "Dynamiqtec.com",
    url: "/",
    description:
      "Ce site. Blog et portfolio multilingues entièrement statiques construits avec Next.js, MDX et Gemma translation.",
    year: 2025,
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projets</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Une sélection de constructions à long terme, d'expériences et de
          déploiements dans le monde réel.
        </p>
      </div>

      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.title} className="group">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block space-y-1 hover:underline"
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-medium">{project.title}</h2>
                <span className="text-sm text-gray-400">{project.year}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
