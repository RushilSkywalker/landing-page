function LinkButton({ href, children, variant = "solid" }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500";
  const styles =
    variant === "solid"
      ? "bg-foreground text-background hover:opacity-90"
      : "border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

export function ProjectCard({ project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 p-5 dark:border-white/10">
      <h3 className="text-base font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {project.description}
      </p>

      {project.tags?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      {project.links?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.links.map((l) => (
            <LinkButton
              key={`${project.title}-${l.label}`}
              href={l.href}
              variant={l.label === "GitHub" ? "outline" : "solid"}
            >
              {l.label}
            </LinkButton>
          ))}
        </div>
      ) : null}
    </article>
  );
}

