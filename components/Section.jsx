export function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 pt-6 pb-4">
      <div className="flex items-center justify-center gap-3">
        <h2 className="font-[var(--font-cardo)] text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="mt-4">{children}</div>
      <div className="mx-auto mt-14 mb-4 h-px max-w-5xl bg-white/10" />
    </section>
  );
}

