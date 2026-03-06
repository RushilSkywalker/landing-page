function SocialIcon({ label }) {
  const common = "h-4 w-4";

  if (label === "GitHub") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={common}
        fill="currentColor"
      >
        <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.5 3.44 21.72 8.21 23.27C8.82 23.38 9.04 23.02 9.04 22.71C9.04 22.43 9.03 21.73 9.03 20.88C6 21.51 5.22 19.72 5.22 19.72C4.67 18.33 3.88 17.96 3.88 17.96C2.78 17.21 3.96 17.23 3.96 17.23C5.17 17.31 5.81 18.47 5.81 18.47C6.89 20.33 8.64 19.8 9.32 19.5C9.43 18.73 9.73 18.21 10.06 17.92C7.73 17.63 5.29 16.62 5.29 12.6C5.29 11.41 5.72 10.45 6.43 9.7C6.32 9.41 5.93 8.26 6.53 6.65C6.53 6.65 7.45 6.35 9.03 7.47C9.9 7.23 10.83 7.11 11.76 7.11C12.69 7.11 13.62 7.23 14.49 7.47C16.07 6.35 16.99 6.65 16.99 6.65C17.59 8.26 17.2 9.41 17.09 9.7C17.8 10.45 18.23 11.41 18.23 12.6C18.23 16.64 15.78 17.62 13.44 17.91C13.86 18.27 14.24 18.98 14.24 20.08C14.24 21.61 14.22 22.76 14.22 23.04C14.22 23.35 14.44 23.72 15.06 23.6C19.84 22.03 23.27 17.5 23.27 12.5C23.27 5.87 17.9 0.5 11.27 0.5H12Z" />
      </svg>
    );
  }

  if (label === "Twitter") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={common}
        fill="currentColor"
      >
        <path d="M19.8 7.25C20.52 6.72 21.14 6.06 21.6 5.3C20.94 5.6 20.23 5.8 19.49 5.9C20.25 5.45 20.83 4.75 21.1 3.93C20.39 4.34 19.61 4.63 18.8 4.78C18.13 4.06 17.17 3.64 16.14 3.64C14.17 3.64 12.58 5.23 12.58 7.2C12.58 7.49 12.61 7.77 12.67 8.04C9.72 7.89 7.06 6.5 5.26 4.32C4.95 4.84 4.77 5.45 4.77 6.1C4.77 7.33 5.4 8.41 6.36 9.02C5.77 9 5.2 8.84 4.69 8.58V8.62C4.69 10.36 5.93 11.8 7.59 12.13C7.29 12.21 6.97 12.26 6.64 12.26C6.41 12.26 6.19 12.24 5.97 12.2C6.42 13.61 7.75 14.63 9.33 14.66C8.1 15.57 6.57 16.11 4.9 16.11C4.62 16.11 4.35 16.1 4.08 16.07C5.67 17.07 7.55 17.64 9.57 17.64C16.14 17.64 19.74 12.32 19.74 7.62C19.74 7.47 19.74 7.36 19.73 7.25H19.8Z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={common}
        fill="currentColor"
      >
        <path d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7ZM7 4H17C18.66 4 20 5.34 20 7V17C20 18.66 18.66 20 17 20H7C5.34 20 4 18.66 4 17V7C4 5.34 5.34 4 7 4ZM17.5 6C16.95 6 16.5 6.45 16.5 7C16.5 7.55 16.95 8 17.5 8C18.05 8 18.5 7.55 18.5 7C18.5 6.45 18.05 6 17.5 6ZM12 7C9.79 7 8 8.79 8 11C8 13.21 9.79 15 12 15C14.21 15 16 13.21 16 11C16 8.79 14.21 7 12 7ZM12 9C13.1 9 14 9.9 14 11C14 12.1 13.1 13 12 13C10.9 13 10 12.1 10 11C10 9.9 10.9 9 12 9Z" />
      </svg>
    );
  }

  return null;
}

export function Contact({ contact }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Email</p>
          <a
            href={`mailto:${contact.email}`}
            className="text-base font-medium text-zinc-100 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            {contact.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {contact.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm font-medium text-zinc-100 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <SocialIcon label={l.label} />
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

