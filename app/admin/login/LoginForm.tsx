"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions";

export default function LoginForm() {
  const [error, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          name="username"
          required
          autoFocus
          className="mt-1 w-full rounded-lg border border-black/15 bg-background px-3 py-2 dark:border-white/15"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-lg border border-black/15 bg-background px-3 py-2 dark:border-white/15"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-felt-dark transition hover:bg-gold-light disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
