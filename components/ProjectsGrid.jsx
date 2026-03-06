import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </div>
  );
}

