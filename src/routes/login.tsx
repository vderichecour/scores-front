import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — Clément Portal" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      setError(err.message ?? "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="max-w-md mx-auto px-6 py-20">
        <h1 className="font-display text-4xl font-black mb-2">
          {mode === "login" ? "Connexion" : "Créer un compte"}
        </h1>
        <p className="text-sm opacity-70 mb-8 font-mono uppercase tracking-widest text-xs">
          Espace réservé
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-foreground bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-foreground bg-transparent px-3 py-2 text-sm"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive font-mono">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-foreground text-background text-[11px] font-mono uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? "..." : mode === "login" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 text-xs underline opacity-70 hover:opacity-100"
        >
          {mode === "login"
            ? "Première fois ? Créer le compte admin"
            : "J'ai déjà un compte"}
        </button>

        <div className="mt-8">
          <Link to="/" className="text-xs font-mono uppercase tracking-widest opacity-60 hover:opacity-100">
            ← Retour au site
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
