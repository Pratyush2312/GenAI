import { useState } from "react";
import { Link } from "react-router";
import BrandMark from "./BrandMark.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function AuthPage({ mode, onSubmit, onClearError, error, isLoading }) {
  const isRegister = mode === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(isRegister ? { name, email, password } : { email, password });
  };

  return (
    <main className="min-h-screen bg-canvas px-5 py-6 sm:px-8 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 lg:px-10 lg:py-10">
      <section className="relative hidden min-h-[calc(100vh-5rem)] overflow-hidden rounded-[28px] bg-brand-panel p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-[280px] w-[280px] rounded-full border border-white/10" />
        <BrandMark light />
        <div className="relative max-w-lg pb-10">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/60">A little more clarity</p>
          <h1 className="text-5xl font-medium leading-[1.08] tracking-[-0.045em] xl:text-6xl">Good ideas start with a better conversation.</h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/70">One calm place to think, explore, and make something of what’s on your mind.</p>
        </div>
        <p className="text-xs text-white/50">Your AI workspace, thoughtfully made.</p>
      </section>

      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[440px] flex-col justify-center py-8 lg:min-h-[calc(100vh-5rem)]">
        <div className="mb-10 flex items-center justify-between lg:mb-14">
          <div className="lg:hidden"><BrandMark /></div>
          <ThemeToggle />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Welcome to Downbot</p>
          <h2 className="text-[32px] font-semibold tracking-[-0.04em] text-ink">{isRegister ? "Create your account" : "Welcome back"}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {isRegister ? "A clear headspace is just a few details away." : "Pick up where your curiosity left off."}
          </p>
        </div>

        <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
          {isRegister && (
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Your name</span>
              <input autoComplete="name" className="field" name="name" onChange={(event) => setName(event.target.value)} placeholder="Ada Lovelace" required minLength={2} maxLength={50} value={name} />
            </label>
          )}
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Email address</span>
            <input autoComplete="email" className="field" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Password</span>
            <input autoComplete={isRegister ? "new-password" : "current-password"} className="field" name="password" onChange={(event) => setPassword(event.target.value)} placeholder={isRegister ? "At least 8 characters" : "Enter your password"} required minLength={isRegister ? 8 : undefined} type="password" value={password} />
            {isRegister && <span className="mt-2 block text-xs text-muted">Use at least 8 characters, including a letter and a number.</span>}
          </label>

          {error && <p className="auth-error rounded-xl border px-4 py-3 text-sm" role="alert">{error}</p>}

          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#294d3b] focus:outline-none focus:ring-4 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60" disabled={isLoading} type="submit">
            {isLoading ? "Please wait…" : isRegister ? "Create account" : "Sign in"}
            {!isLoading && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-muted">
          {isRegister ? "Already have an account?" : "New to Downbot?"}{" "}
          <Link className="font-semibold text-accent hover:underline" onClick={onClearError} to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
        <p className="mt-12 text-center text-xs leading-5 text-muted">By continuing, you agree to use Downbot thoughtfully and responsibly.</p>
      </section>
    </main>
  );
}
