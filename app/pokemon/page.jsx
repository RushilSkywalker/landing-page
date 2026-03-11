"use client";

import { useEffect, useRef, useState } from "react";
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
      notes: "The obviously better Legendary(The ocean sucks).",
    },
    {
      name: "Alakazam",
      id: 0,
      sprite: "/pokemon-placeholder.png",
      notes: "When i first started playing Pokémon, I fell in love with the design, and it has always stuck with me.",
    },
    {
      name: "Infernape",
      id: 0,
      sprite: "/pokemon-placeholder.png",
      notes: "Ash's Infernape was HIM and there is no debate.",
    },
  ],
};

export default function PokemonPage() {
  const [userPokemon, setUserPokemon] = useState("");
  const [loading, setLoading] = useState(false);
  const [battleData, setBattleData] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [error, setError] = useState(null);
  const [favouriteSprites, setFavouriteSprites] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);

  const STAT_LABELS = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
  };

  function formatPokemonName(name) {
    if (!name) return "";
    return name
      .split(/[-\s]+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

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

    const types = data.types.map((t) => t.type.name);

    return {
      name: data.name,
      id: data.id,
      sprite: data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default,
      stats,
      types,
    };
  }

  // Very simplified offensive type effectiveness.
  // This is intentionally lightweight and just boosts obvious advantages.
  const TYPE_ADVANTAGE = {
    fire: ["grass", "bug", "ice", "steel"],
    water: ["fire", "ground", "rock"],
    grass: ["water", "ground", "rock"],
    electric: ["water", "flying"],
    ground: ["fire", "electric", "poison", "rock", "steel"],
    rock: ["fire", "ice", "flying", "bug"],
    fighting: ["normal", "rock", "ice", "dark", "steel"],
    psychic: ["fighting", "poison"],
    dark: ["psychic", "ghost"],
    ghost: ["psychic", "ghost"],
    ice: ["grass", "ground", "flying", "dragon"],
    dragon: ["dragon"],
    fairy: ["dragon", "fighting", "dark"],
  };

  function getTypeMultiplier(attackerTypes, defenderTypes) {
    if (!attackerTypes || !defenderTypes) return 1;

    let multiplier = 1;

    attackerTypes.forEach((atk) => {
      const strongAgainst = TYPE_ADVANTAGE[atk];
      if (!strongAgainst) return;

      defenderTypes.forEach((def) => {
        if (strongAgainst.includes(def)) {
          multiplier *= 1.25; // small boost for each favourable matchup
        }
      });
    });

    // Clamp so it never gets too extreme
    if (multiplier > 1.75) multiplier = 1.75;
    return multiplier;
  }

  function calculateBattleScore(stats) {
    // Simple weighted sum: favor offensive stats slightly.
    const hp = stats["hp"] || 0;
    const atk = stats["attack"] || 0;
    const def = stats["defense"] || 0;
    const spAtk = stats["special-attack"] || 0;
    const spDef = stats["special-defense"] || 0;
    const speed = stats["speed"] || 0;

    const offense = atk * 1.1 + spAtk * 1.1;
    const defense = def * 0.9 + spDef * 0.9;

    return hp * 0.8 + offense + defense + speed * 0.7;
  }

  async function handleCompare(e) {
    e.preventDefault();
    setError(null);
    setBattleData(null);
    setShowOutcome(false);

    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setLoading(true);

    try {
      const [mine, theirs] = await Promise.all([
        fetchPokemonStats(favouritePokemon.main.name),
        fetchPokemonStats(userPokemon),
      ]);

      const myBaseScore = calculateBattleScore(mine.stats);
      const theirBaseScore = calculateBattleScore(theirs.stats);

      const myTypeMultiplier = getTypeMultiplier(mine.types, theirs.types);
      const theirTypeMultiplier = getTypeMultiplier(theirs.types, mine.types);

      const myScore = myBaseScore * myTypeMultiplier;
      const theirScore = theirBaseScore * theirTypeMultiplier;

      let title;
      let explanation;
      const myName = formatPokemonName(mine.name);
      const theirName = formatPokemonName(theirs.name);

      if (myScore > theirScore) {
        title = `${myName.toUpperCase()} wins!`;
        explanation = `Never doubted my King Typhlosion, of course ${theirName} lost.`;
      } else if (theirScore > myScore) {
        title = `${theirName.toUpperCase()} wins!`;
        explanation =
          "Statistically Typhlosion might have lost, but in my heart I know he wins them all.";
      } else {
        title = "It's a draw!";
        explanation = `${myName} and ${theirName} are evenly matched with very similar overall stats.`;
      }

      setBattleData({ title, explanation, mine, theirs, myScore, theirScore });

      const id = setTimeout(() => {
        setShowOutcome(true);
        setTimeoutId(null);
      }, 3000);
      setTimeoutId(id);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching Pokémon data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

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
              return [
                name,
                {
                  sprite: data.sprite,
                  id: data.id,
                },
              ];
            } catch {
              return [name, null];
            }
          }),
        );

        const map = {};
        entries.forEach(([name, details]) => {
          if (details) map[name] = details;
        });

        setFavouriteSprites(map);
      } catch {
        // Fail silently for favourites; battle comparison already surfaces API errors.
      }
    }

    loadFavouriteSprites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (battleData && typeof window !== "undefined") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [battleData]);
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
              One of my earliest interests, and a little API spice to battle my favourites against yours.
            </p>
          </div>
        </section>

        <Section id="favourites" title="My Favourite Pokémon">
          <div className="flex flex-col gap-8">
            <article className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
              <img
                src={
                  favouriteSprites[favouritePokemon.main.name]?.sprite ||
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
                      src={favouriteSprites[p.name]?.sprite || p.sprite}
                      alt={p.name}
                      className="mb-3 h-20 w-20 rounded-full border border-white/10 bg-white/5 object-contain"
                    />
                    <h5 className="font-(--font-cardo) text-base text-zinc-100">
                      {p.name}
                    </h5>
                    <p className="mt-2 text-[10px] uppercase tracking-wide text-zinc-500">
                      Pokédex ID: {favouriteSprites[p.name]?.id || p.id || "TBD"}
                    </p>
                    <p className="mt-2 text-xs text-zinc-300">{p.notes}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="user-input" title="Your Favourite Pokémon">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm text-zinc-300">
              Enter the name of your favourite Pokémon and see how they fare
              against the GOAT Typhlosion.
            </p>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleCompare}
            >
              <input
                type="text"
                value={userPokemon}
                onChange={(e) => setUserPokemon(e.target.value)}
                placeholder="e.g. Garchomp"
                className="flex-1 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              />
              <button
                type="submit"
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-black hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                disabled={loading}
              >
                {loading ? "Fighting..." : "Fight!"}
              </button>
            </form>

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}

            {battleData && (
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-200">
                  <div className="mt-1 mb-4 flex items-center justify-center text-xl font-(--font-cardo) text-zinc-300">
                    Battle Preview
                  </div>
                  <div className="mt-1 flex flex-col items-stretch gap-4 sm:flex-row">
                  <article className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-zinc-400">
                      The GOAT
                    </p>
                    <img
                      src={battleData.mine.sprite}
                      alt={battleData.mine.name}
                      className="mx-auto my-2 h-20 w-20 rounded-full border border-white/10 bg-black object-contain"
                    />
                    <h3 className="font-(--font-cardo) text-lg capitalize text-zinc-100">
                      {formatPokemonName(battleData.mine.name)}
                    </h3>
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      {battleData.mine.types.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-200">
                      {["hp", "attack", "defense", "special-attack", "special-defense", "speed"].map(
                        (key) => (
                          <div key={key} className="flex items-center justify-between gap-2">
                            <dt className="text-zinc-400">
                              {STAT_LABELS[key] || key.replace("-", " ")}
                            </dt>
                            <dd className="font-semibold">
                              {battleData.mine.stats[key] ?? "—"}
                            </dd>
                          </div>
                        ),
                      )}
                    </dl>
                  </article>

                  <div className="flex items-center justify-center text-xl font-(--font-cardo) text-zinc-300">
                    VS
                  </div>

                  <article className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-zinc-400">
                      Your pick
                    </p>
                    <img
                      src={battleData.theirs.sprite}
                      alt={battleData.theirs.name}
                      className="mx-auto my-2 h-20 w-20 rounded-full border border-white/10 bg-black object-contain"
                    />
                    <h3 className="font-(--font-cardo) text-lg capitalize text-zinc-100">
                      {formatPokemonName(battleData.theirs.name)}
                    </h3>
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      {battleData.theirs.types.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-200">
                      {["hp", "attack", "defense", "special-attack", "special-defense", "speed"].map(
                        (key) => (
                          <div key={key} className="flex items-center justify-between gap-2">
                            <dt className="text-zinc-400">
                              {STAT_LABELS[key] || key.replace("-", " ")}
                            </dt>
                            <dd className="font-semibold">
                              {battleData.theirs.stats[key] ?? "—"}
                            </dd>
                          </div>
                        ),
                      )}
                    </dl>
                  </article>
                  </div>
                </div>

                {!showOutcome && (
                  <div className="rounded-xl border border-dashed border-white/20 bg-black/40 p-4 text-center text-sm text-zinc-300">
                    Calculating winner…
                  </div>
                )}

                {showOutcome && (
                  <div className="rounded-xl border border-accent/70 bg-accent/10 p-4 text-sm text-zinc-200">
                    <p className="font-semibold text-center text-base text-accent">
                      {battleData.title}
                    </p>
                    <p className="mt-2 text-center text-zinc-200">{battleData.explanation}</p>
                    <p className="mt-3 text-center text-[10px] text-zinc-500">
                      This is just a fun approximation based on base stats (HP, Attack, Defense,
                      Special Attack, Special Defense, Speed) from the PokéAPI.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Section>

        <div className="mt-10 mb-8 flex justify-center">
          <a
            href="/pokemon-battle"
            className="rounded-full border border-accent/60 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Pokémon Battle!
          </a>
        </div>

      </main>
    </div>
  );
}

