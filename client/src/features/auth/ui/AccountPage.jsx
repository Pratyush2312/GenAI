import BrandMark from "./BrandMark.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function AccountPage({ user, onLogout, error }) {
  return (
    <main className="min-h-screen bg-canvas px-5 py-6 sm:px-10">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <BrandMark />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-canvas" onClick={onLogout} type="button">Sign out</button>
        </div>
      </header>
      <section className="mx-auto flex min-h-[78vh] max-w-6xl items-center">
        <div className="max-w-2xl pb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Your space is ready</p>
          <h1 className="text-5xl font-semibold leading-tight tracking-[-0.05em] text-ink sm:text-6xl">Hello, {user.name.split(" ")[0]}.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-muted">You’re signed in as {user.email}. Your Downbot account is all set.</p>
          {error && <p className="auth-error mt-6 max-w-lg rounded-xl border px-4 py-3 text-sm" role="alert">{error}</p>}
          <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-sm font-semibold text-accent">{user.name.slice(0, 1).toUpperCase()}</span>
            <div>
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              <p className="mt-0.5 text-xs text-muted">Downbot account</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
