export function ExperienceList({ items }) {
  if (!items?.length) return null;

  return (
    <ol className="space-y-4">
      {items.map((item, idx) => (
        <li
          key={`${item.event}-${item.role}-${idx}`}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm dark:border-white/10"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="font-medium tracking-tight">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-100 hover:text-accent"
                  >
                    {item.event}
                  </a>
                ) : (
                  item.event
                )}{" "}
                <span className="text-zinc-400">· {item.role}</span>
              </h3>
              {item.location ? (
                <p className="text-sm text-zinc-400">
                  {item.location}
                </p>
              ) : null}
            </div>
            {item.year ? (
              <p className="text-sm text-zinc-400">{item.year}</p>
            ) : null}
          </div>
          {item.bullets?.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-200">
              {item.bullets.map((b, bIdx) => (
                <li key={bIdx}>{b}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

