export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 text-base sm:text-lg">
        <a
          href="/"
          className="font-semibold tracking-tight text-zinc-200 hover:text-accent"
        >
          Home
        </a>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-zinc-300">
            <li className="relative">
              <details className="group">
                <summary className="cursor-pointer list-none rounded-md px-2 py-1 text-zinc-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                  Hobbies
                </summary>
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-black/90 p-2 shadow-lg backdrop-blur">
                  <a
                    href="/gaming"
                    className="mb-2 block rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  >
                    Gaming
                  </a>
                  <a
                    href="/pokemon"
                    className="block rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  >
                    Pokémon
                  </a>
                </div>
              </details>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

