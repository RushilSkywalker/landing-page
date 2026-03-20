import { profile } from "@/data/profile";
import { Contact } from "@/components/Contact";
import { ExperienceList } from "@/components/ExperienceList";
import { Hero } from "@/components/Hero";
import { HeroScrollArrow } from "@/components/HeroScrollArrow";
import { Navbar } from "@/components/Navbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <Hero profile={profile} />
        <HeroScrollArrow heroId="top" targetId="about" />

        <Section id="about" title="About me">
          <div className="space-y-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            {profile.about?.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ExperienceList items={profile.experience} />
        </Section>

        <Section id="projects" title="Projects">
          <ProjectsGrid projects={profile.projects} />
        </Section>

        <Section id="interests" title="Interests">
          <ul className="mt-10 flex w-full flex-wrap gap-3">
            {profile.interests?.map((i) => (
              <li
                key={i}
                className="flex-1 min-w-[140px] rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-zinc-100"
              >
                {i}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="Contact">
          <Contact contact={profile.contact} />
        </Section>

        <footer className="py-12 text-sm text-zinc-500 dark:text-zinc-400">
        </footer>
      </main>
    </div>
  );
}

