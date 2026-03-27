import { HeroScrollArrow } from "@/components/HeroScrollArrow";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";

export default function BlogPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <section
          id="blog-hero"
          className="flex min-h-[calc(100vh-56px)] items-center justify-center py-10 sm:py-12"
        >
          <div className="max-w-3xl text-center">
            <h1 className="font-(--font-cardo) text-4xl tracking-tight sm:text-5xl">
              Blogs
            </h1>
            <p className="mt-4 text-zinc-300">
              Writing down ideas, experiments, and lessons from building on the web.
            </p>
          </div>
        </section>
        <HeroScrollArrow heroId="blog-hero" targetId="pinned-post" />

        <Section id="pinned-post" title="Pinned Post">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-accent">Pinned</p>
                <h3 className="mt-2 font-(--font-cardo) text-2xl text-zinc-100">
                  Placeholder pinned post title
                </h3>
                <p className="mt-2 text-sm text-zinc-400">Month Year • X min read</p>
              </div>
              <img
                src="/profile-placeholder.svg"
                alt="Pinned post placeholder thumbnail"
                className="h-[67px] w-auto rounded-md border border-white/10 bg-white/5 p-1 object-contain"
              />
            </div>
            <p className="mt-3 text-sm text-zinc-300">
              Placeholder summary text for the pinned post. Replace with your actual article intro.
            </p>
          </div>
        </Section>

        <Section id="latest-posts" title="Latest Posts">
          <div className="space-y-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-(--font-cardo) text-xl text-zinc-100">
                    Placeholder latest post #1
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">Month Year • Published</p>
                </div>
                <img
                  src="/profile-placeholder.svg"
                  alt="Latest post placeholder thumbnail"
                  className="h-[67px] w-auto rounded-md border border-white/10 bg-white/5 p-1 object-contain"
                />
              </div>
              <p className="mt-3 text-sm text-zinc-300">
                Placeholder summary text for latest post #1.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-(--font-cardo) text-xl text-zinc-100">
                    Placeholder latest post #2
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">Month Year • Published</p>
                </div>
                <img
                  src="/profile-placeholder.svg"
                  alt="Latest post placeholder thumbnail"
                  className="h-[67px] w-auto rounded-md border border-white/10 bg-white/5 p-1 object-contain"
                />
              </div>
              <p className="mt-3 text-sm text-zinc-300">
                Placeholder summary text for latest post #2.
              </p>
            </article>
          </div>
        </Section>

        <Section id="upcoming-post" title="Upcoming Post">
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-zinc-300 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-(--font-cardo) text-xl text-zinc-100">
                  Placeholder upcoming post title
                </h3>
                <p className="mt-2 text-sm text-zinc-400">Draft in progress</p>
              </div>
              <img
                src="/profile-placeholder.svg"
                alt="Upcoming post placeholder thumbnail"
                className="h-[67px] w-auto rounded-md border border-white/10 bg-white/5 p-1 object-contain"
              />
            </div>
            <p className="mt-3 text-sm text-zinc-300">
              Placeholder summary text for the upcoming post.
            </p>
          </div>
        </Section>
      </main>
    </div>
  );
}

