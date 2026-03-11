"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";

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

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

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

  if (multiplier > 1.75) multiplier = 1.75;
  return multiplier;
}

function calculateBattleScore(stats) {
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

export default function PokemonBattlePage() {
  const [firstPokemon, setFirstPokemon] = useState("");
  const [secondPokemon, setSecondPokemon] = useState("");
  const [loading, setLoading] = useState(false);
  const [battleData, setBattleData] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  async function handleBattle(e) {
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
      const [first, second] = await Promise.all([
        fetchPokemonStats(firstPokemon),
        fetchPokemonStats(secondPokemon),
      ]);

      const firstBase = calculateBattleScore(first.stats);
      const secondBase = calculateBattleScore(second.stats);

      const firstMult = getTypeMultiplier(first.types, second.types);
      const secondMult = getTypeMultiplier(second.types, first.types);

      const firstScore = firstBase * firstMult;
      const secondScore = secondBase * secondMult;

      const firstName = formatPokemonName(first.name);
      const secondName = formatPokemonName(second.name);

      let title;
      let explanation;

      if (firstScore > secondScore) {
        title = `${firstName.toUpperCase()} wins!`;
        explanation = `${firstName} comes out on top in this stat-based matchup against ${secondName}.`;
      } else if (secondScore > firstScore) {
        title = `${secondName.toUpperCase()} wins!`;
        explanation = `${secondName} edges past ${firstName} with stronger overall stats in this battle.`;
      } else {
        title = "It's a draw!";
        explanation = `${firstName} and ${secondName} are evenly matched with very similar overall stats.`;
      }

      setBattleData({ title, explanation, first, second });

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
              Pokémon Battle Arena
            </h1>
            <p className="mt-4 text-zinc-300">
              Pick any two Pokémon and see who would win in a 1v1 matchup.
            </p>
          </div>
        </section>

        <Section id="battle" title="Choose Your Fighters">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm text-zinc-300">
              Enter the names of both Pokémon you want to pit against each other.
            </p>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleBattle}
            >
              <input
                type="text"
                value={firstPokemon}
                onChange={(e) => setFirstPokemon(e.target.value)}
                placeholder="First Pokémon (e.g. Garchomp)"
                className="flex-1 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              />
              <input
                type="text"
                value={secondPokemon}
                onChange={(e) => setSecondPokemon(e.target.value)}
                placeholder="Second Pokémon (e.g. Dragonite)"
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
                        First Pokémon
                      </p>
                      <img
                        src={battleData.first.sprite}
                        alt={battleData.first.name}
                        className="mx-auto my-2 h-20 w-20 rounded-full border border-white/10 bg-black object-contain"
                      />
                      <h3 className="font-(--font-cardo) text-lg capitalize text-zinc-100">
                        {formatPokemonName(battleData.first.name)}
                      </h3>
                      <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {battleData.first.types.map((t) => (
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
                                {battleData.first.stats[key] ?? "—"}
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
                        Second Pokémon
                      </p>
                      <img
                        src={battleData.second.sprite}
                        alt={battleData.second.name}
                        className="mx-auto my-2 h-20 w-20 rounded-full border border-white/10 bg-black object-contain"
                      />
                      <h3 className="font-(--font-cardo) text-lg capitalize text-zinc-100">
                        {formatPokemonName(battleData.second.name)}
                      </h3>
                      <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {battleData.second.types.map((t) => (
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
                                {battleData.second.stats[key] ?? "—"}
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
      </main>
    </div>
  );
}

