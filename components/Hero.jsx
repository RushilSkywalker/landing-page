import Image from "next/image";

export function Hero({ profile }) {
  return (
    <section
      id="top"
      className="flex min-h-[calc(100vh-56px)] items-center justify-center py-10 sm:py-12"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="shrink-0">
          <div className="relative size-32 overflow-hidden rounded-2xl border border-black/10 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 sm:size-36">
            <Image
              src={profile.avatar?.src || "/profile-placeholder.svg"}
              alt={profile.avatar?.alt || `${profile.name} portrait`}
              fill
              className="object-cover"
              priority
              sizes="144px"
            />
          </div>
        </div>
        <div className="max-w-2xl">
          <h1 className="font-[var(--font-cardo)] text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-zinc-300">Computer Science Student</p>
        </div>
      </div>
    </section>
  );
}

