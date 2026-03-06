const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "interests", label: "Interests" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 text-base sm:text-lg">
        <a
          href="#top"
          className="font-semibold tracking-tight text-zinc-200 hover:text-accent"
        >
          Home
        </a>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-zinc-300">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-md px-2 py-1 text-zinc-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

