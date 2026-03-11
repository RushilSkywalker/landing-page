"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";

const favouritePokemon = {
  main: {
    name: "Typhlosion",
    id: 157, // Johto Pokédex / National Dex ID for Typhlosion
    sprite: "/pokemon-placeholder.png",
    notes:
      "My all-time favourite starter. Typhlosion has been with me since my earliest Pokémon games, and it still feels iconic every time I pick it.",
  },
  honourableMentions: [
    {
      name: "Groudon",
      id: 0,
      sprite: "/pokemon-placeholder.png",
      notes: "Add a short note about why Groudon is here.",
    },
    {
      name: "Alakazam",
      id: 0,
      sprite: "/pokemon-placeholder.png",
      notes: "Add a short note about why Alakazam is here.",
    },
    {
      name: "Infernape",
      id: 0,
      sprite: "/pokemon-placeholder.png",
      notes: "Add a short note about why Infernape is here.",
    },
  ],
};

export default function PokemonPage() {
  const [favouriteSprites, setFavouriteSprites] = useState({});

  async function fetchPokemonStats(name) {
    const normalized = name.trim().toLowerCase();
    if (!normalized) {
      throw new Error("Please enter a Pokémon name.");
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${normalized}`);
    if (!res.ok) {
      throw new Error(`Could not find Pokémon "${name}". Check the spelling and try again.`);
    }
    const data = await res.json();

    const stats = {};
    data.stats.forEach((s) => {
      stats[s.stat.name] = s.base_stat;
    });

    return {
      name: data.name,
      id: data.id,
      sprite: data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default,
      stats,
    };
  }

  useEffect(() => {
    async function loadFavouriteSprites() {
      try {
        const names = [
          favouritePokemon.main.name,
          ...favouritePokemon.honourableMentions.map((p) => p.name),
        ];

        const entries = await Promise.all(
          names.map(async (name) => {
            try {
              const data = await fetchPokemonStats(name);
              return [name, data.sprite];
            } catch {
              return [name, null];
            }
          }),
        );

        const map = {};
        entries.forEach(([name, sprite]) => {
          if (sprite) map[name] = sprite;
        });

        setFavouriteSprites(map);
      } catch {
        // Fail silently for favourites; battle comparison already surfaces API errors.
      }
    }

    loadFavouriteSprites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <section className="flex min-h-[calc(100vh-56px)] items-center justify-center py-10 sm:py-12">
          <div className="max-w-3xl text-center">
            <h1 className="font-(--font-cardo) text-4xl tracking-tight sm:text-5xl">
              Pokémon
            </h1>
            <p className="mt-4 text-zinc-300">
              A space to show off my favourite Pokémon and pit them against
              yours in a simple 1v1 matchup using data from the PokéAPI.
            </p>
          </div>
        </section>

        <Section id="favourites" title="My Favourite Pokémon">
          <div className="flex flex-col gap-8">
            <article className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
              <img
                src={
                  favouriteSprites[favouritePokemon.main.name] ||
                  favouritePokemon.main.sprite
                }
                alt={favouritePokemon.main.name}
                className="mb-4 h-28 w-28 rounded-full border border-white/10 bg-white/5 object-contain"
              />
              <h3 className="font-(--font-cardo) text-xl text-zinc-100">
                {favouritePokemon.main.name}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
                Pokédex ID: {favouritePokemon.main.id || "TBD"}
              </p>
              <p className="mt-3 text-sm text-zinc-300">
                {favouritePokemon.main.notes}
              </p>
            </article>

            <div>
              <h4 className="font-(--font-cardo) text-lg text-zinc-100">
                Honourable Mentions
              </h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {favouritePokemon.honourableMentions.map((p) => (
                  <article
                    key={p.name}
                    className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                  >
                    <img
                      src={favouriteSprites[p.name] || p.sprite}
                      alt={p.name}
                      className="mb-3 h-20 w-20 rounded-full border border-white/10 bg-white/5 object-contain"
                    />
                    <h5 className="font-(--font-cardo) text-base text-zinc-100">
                      {p.name}
                    </h5>
                    <p className="mt-2 text-[10px] uppercase tracking-wide text-zinc-500">
                      Pokédex ID: {p.id || "TBD"}
                    </p>
                    <p className="mt-2 text-xs text-zinc-300">{p.notes}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

