import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";

const storyModePlaceholders = [
  {
    rank: 1,
    name: "Red Dead Redemption 2",
    logo: "/games/red-dead-redemption-2.png",
    link: "https://www.igdb.com/games/red-dead-redemption-2",
    notes:
      "Hands down the best game ever made. It truly changed me as a person. Highly recommended!",
  },
  {
    rank: 2,
    name: "Clair Obscur: Expedition 33",
    logo: "/games/clair-obscur-expedition-33.png",
    link: "https://www.igdb.com/games/clair-obscur-expedition-33",
    notes:
      "The music and world-building could not have been better - an absolute gem. Do not let the turn-based combat fool you; it is an extremely immersive game.",
  },
  {
    rank: 3,
    name: "Uncharted 4: A Thief's End",
    logo: "/games/uncharted-4.png",
    link: "https://www.igdb.com/games/uncharted-4-a-thief-s-end",
    notes:
      "The first story mode game I finished, and it still holds a special place in my heart, with Nathan among my top five favorite characters.",
  },
  {
    rank: 4,
    name: "GTA V",
    logo: "/games/gta-v.png",
    link: "https://www.igdb.com/games/grand-theft-auto-v",
    notes:
      "Just an absolute beast of a game, elevated heavily by nostalgia, but in all the best ways.",
  },
  {
    rank: 5,
    name: "Hollow Knight",
    logo: "/games/hollow-knight.png",
    link: "https://www.igdb.com/games/hollow-knight",
    notes:
      "One of the most recent games I completed, and it had such an impact. It is truly a testament to how effective visual storytelling can be without dialogue.",
  },
];

const multiplayerPlaceholders = [
  {
    rank: 1,
    name: "Valorant",
    logo: "/games/valorant.png",
    link: "https://www.igdb.com/games/valorant",
    notes:
      "I am absolutely addicted to this game to a degree that words cannot express.",
  },
  {
    rank: 2,
    name: "PUBG: Battlegrounds",
    logo: "/games/pubg-battlegrounds.png",
    link: "https://www.igdb.com/games/pubg-battlegrounds",
    notes:
      "The sheer number of memories I have from playing this game with friends boosts it to this position.",
  },
  {
    rank: 3,
    name: "World War Z",
    logo: "/games/world-war-z.png",
    link: "https://www.igdb.com/games/world-war-z",
    notes:
      "The gameplay mechanics and the bliss of wiping out thousands of zombies never get old, especially with friends.",
  },
  {
    rank: 4,
    name: "Apex Legends",
    logo: "/games/apex-legends.png",
    link: "https://www.igdb.com/games/apex-legends",
    notes:
      "Its fast-paced nature mixed with the variety in the game makes it consistently enjoyable.",
  },
  {
    rank: 5,
    name: "Counter-Strike 2",
    logo: "/games/counter-strike-2.png",
    link: "https://www.igdb.com/games/counter-strike-2",
    notes:
      "The shared mechanics with Valorant, along with the toxic but hilarious community, keep me hooked.",
  },
];

const achievementsPlaceholders = [
  {
    rank: 1,
    name: "Hitting Immortal on Valorant",
    notes: "Speaks for itself - I was among the top 20k players worldwide.",
  },
  {
    rank: 2,
    name: "Completing the Batman Trilogy 100% in one week",
    notes:
      "Post-exam week break: I just marathon'd all three games to 100% without a break (I hate you Riddler).",
  },
  {
    rank: 3,
    name: "Completing Elden Ring (lol)",
    notes:
      "Might not seem like much, but I suck at soulslikes, so completing this was HUGE.",
  },
];

const lookingForwardPlaceholders = [
  {
    rank: 1,
    name: "GTA 6",
    logo: "/games/gta-6.png",
    link: "https://www.igdb.com/games/grand-theft-auto-vi",
    notes:
      "It goes without saying: this is the most anticipated game in the history of gaming, and I am just as hyped as the next person.",
  },
  {
    rank: 2,
    name: "Resident Evil: Requiem",
    logo: "/games/resident-evil-requiem.png",
    link: "https://www.igdb.com/games/resident-evil-requiem",
    notes:
      "The comeback of Leon Kennedy (my second favorite game character) makes me feel things I cannot express.",
  },
  {
    rank: 3,
    name: "Sekiro: Shadows Die Twice",
    logo: "/games/sekiro-shadows-die-twice.png",
    link: "https://www.igdb.com/games/sekiro-shadows-die-twice",
    notes:
      "I loved playing Elden Ring, and the mechanics in this game seem like a step up.",
  },
  {
    rank: 4,
    name: "Outer Wilds",
    logo: "/games/outer-wilds.png",
    link: "https://www.igdb.com/games/outer-wilds",
    notes:
      "I am a sucker for emotional stories, and I cannot wait to experience what this game will make me feel.",
  },
  {
    rank: 5,
    name: "Ghost of Tsushima",
    logo: "/games/ghost-of-tsushima.png",
    link: "https://www.igdb.com/games/ghost-of-tsushima",
    notes:
      "A long-time member of my to-play list, but I have never gotten around to it. Hopefully I do get to soon.",
  },
];

const currentlyPlayingPlaceholders = [
  {
    name: "Hollow Knight: Silksong",
    logo: "/games/hollow-knight-silksong.png",
    link: "https://www.igdb.com/games/hollow-knight-silksong",
    notes:
      "Being a continuation of one of my favorite games, it does not disappoint. I am looking forward to finishing it soon.",
  },
  {
    name: "Bloons TD 6",
    logo: "/games/bloons-td-6.png",
    link: "https://www.igdb.com/games/bloons-td-6",
    notes:
      "One of my guilty pleasures - a simple tower defense game about monkeys and balloons.",
  },
  {
    name: "Cuphead",
    logo: "/games/cuphead.png",
    link: "https://www.igdb.com/games/cuphead",
    notes:
      "An all-time classic platformer that I currently cannot get enough of (I do have a skill issue).",
  },
];

function GameList({ items, showRank = true }) {
  return (
    <ul className="mt-4 space-y-3 text-zinc-300">
      {items.map((item) => (
        <li key={`${item.rank ?? "na"}-${item.name}`} className="rounded-xl border border-white/10 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              {showRank ? (
                <p className="text-xs uppercase tracking-wide text-zinc-400">
                  #{item.rank}
                </p>
              ) : null}
              <h4 className="mt-1 font-semibold text-zinc-100">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </h4>
            </div>
            <img
              src={item.logo}
              alt={`${item.name} logo`}
              className="h-[67px] w-auto rounded-md border border-white/10 bg-white/5 p-1 object-contain"
            />
          </div>
          <p className="mt-2 text-sm text-zinc-300">{item.notes}</p>
        </li>
      ))}
    </ul>
  );
}

export default function GamingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <section className="flex min-h-[calc(100vh-56px)] items-center justify-center py-10 sm:py-12">
          <div className="max-w-3xl text-center">
            <h1 className="font-(--font-cardo) text-4xl tracking-tight sm:text-5xl">
              Gaming
            </h1>
            <p className="mt-4 text-zinc-300">
              The only environment where I can just reload a previous save after breaking everything.
            </p>
          </div>
        </section>

        <Section id="favorite-games" title="Favorite Games">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <h3 className="font-(--font-cardo) text-xl text-zinc-100">
                Story Mode
              </h3>
              <GameList items={storyModePlaceholders} />
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <h3 className="font-(--font-cardo) text-xl text-zinc-100">
                Multiplayer
              </h3>
              <GameList items={multiplayerPlaceholders} />
            </article>
          </div>
        </Section>

        <Section id="looking-forward" title="Looking Forward to Playing">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <GameList items={lookingForwardPlaceholders} />
          </div>
        </Section>

        <Section id="currently-playing" title="Currently Playing">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <GameList items={currentlyPlayingPlaceholders} showRank={false} />
          </div>
        </Section>

        <Section id="achievements" title="Achievements">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <ul className="space-y-2 text-zinc-300">
              {achievementsPlaceholders.map((item) => (
                <li key={item.name} className="rounded-lg border border-white/10 px-3 py-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    #{item.rank}
                  </p>
                  <p className="mt-1 text-sm text-zinc-100">{item.name}</p>
                  <p className="mt-2 text-sm text-zinc-300">{item.notes}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>
    </div>
  );
}

