import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-display text-2xl font-bold">Admin Login</h1>
      <p className="mt-2 text-sm text-foreground/70">
        Sign in to manage tables and bookings.
      </p>
      <LoginForm />
    </div>
  );
}
