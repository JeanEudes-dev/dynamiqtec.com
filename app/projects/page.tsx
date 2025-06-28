import { generateSEO } from "lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEO({
    title: "Projects",
    description: "Selected full-stack and AI builds by Jean-Eudes Assogba.",
    url: "https://dynamiqtec.com/projects",
    locale: "en",
  });
}

const projects = [
  {
    title: "BrollyHub",
    url: "https://brollyhub.com",
    description:
      "Community platform powered by AI: booking, calendars, expert offers, whiteboards, and real-time collaboration.",
    year: 2025,
  },
  {
    title: "RenoSmarter AI",
    url: "https://renosmarter.ai",
    description:
      "AI-powered renovation cost estimator using Voiceflow, Airtable, and domain-tuned prompts.",
    year: 2025,
  },
  {
    title: "Dynamiqtec.com",
    url: "/",
    description:
      "This site. Fully static, multilingual blog and portfolio built with Next.js, MDX, and Gemma translation.",
    year: 2025,
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-gray-500 dark:text-gray-400">
          A selection of long-term builds, experiments, and real-world
          deployments.
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
