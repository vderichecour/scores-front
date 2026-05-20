import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — Clément Portal" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Score = {
  id: string;
  title: string;
  author: string | null;
  composer: string;
  pdf_path: string;
  sort_order: number;
  labels: string[] | null;
};

type FormState = {
  id?: string;
  title: string;
  author: string;
  composer: string;
  sort_order: number;
  pdf_path: string;
  labels: string;
  file?: File | null;
};

const emptyForm: FormState = {
  title: "",
  author: "",
  composer: "",
  sort_order: 0,
  pdf_path: "",
  labels: "",
  file: null,
};

const parseLabels = (s: string): string[] =>
  Array.from(
    new Set(
      s
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
    ),
  );

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadScores = useCallback(async () => {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setScores(data ?? []);
  }, []);

  useEffect(() => {
    const check = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate({ to: "/login" });
        return;
      }
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sessionData.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleData) {
        setError("Compte non autorisé.");
        setChecking(false);
        return;
      }
      setAuthorized(true);
      setChecking(false);
      loadScores();
    };
    check();
  }, [navigate, loadScores]);

  const resetForm = () => {
    setForm(emptyForm);
    setError(null);
    const input = document.getElementById("pdf-input") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const handleEdit = (s: Score) => {
    setForm({
      id: s.id,
      title: s.title,
      author: s.author ?? "",
      composer: s.composer,
      sort_order: s.sort_order,
      pdf_path: s.pdf_path,
      labels: (s.labels ?? []).join(", "),
      file: null,
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (s: Score) => {
    if (!confirm(`Supprimer « ${s.title} » ?`)) return;
    setError(null);
    const { error: delErr } = await supabase.from("scores").delete().eq("id", s.id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    await supabase.storage.from("scores").remove([s.pdf_path]).catch(() => null);
    loadScores();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      let pdfPath = form.pdf_path;
      if (form.file) {
        const ext = form.file.name.split(".").pop() ?? "pdf";
        const fname = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("scores")
          .upload(fname, form.file, { contentType: "application/pdf" });
        if (upErr) throw upErr;
        // Delete previous file if replacing
        if (form.id && form.pdf_path && form.pdf_path !== fname) {
          await supabase.storage.from("scores").remove([form.pdf_path]).catch(() => null);
        }
        pdfPath = fname;
      }
      if (!pdfPath) throw new Error("Un PDF est requis.");

      const payload = {
        title: form.title.trim(),
        author: form.author.trim() || null,
        composer: form.composer.trim(),
        sort_order: form.sort_order,
        pdf_path: pdfPath,
      };

      if (form.id) {
        const { error: updErr } = await supabase
          .from("scores")
          .update(payload)
          .eq("id", form.id);
        if (updErr) throw updErr;
      } else {
        const { error: insErr } = await supabase.from("scores").insert(payload);
        if (insErr) throw insErr;
      }
      resetForm();
      loadScores();
    } catch (err: any) {
      setError(err.message ?? "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (checking) {
    return (
      <>
        <SiteHeader />
        <main className="max-w-4xl mx-auto px-6 py-20 text-sm font-mono">
          Vérification…
        </main>
      </>
    );
  }

  if (!authorized) {
    return (
      <>
        <SiteHeader />
        <main className="max-w-md mx-auto px-6 py-20">
          <h1 className="font-display text-3xl font-black mb-4">Accès refusé</h1>
          <p className="text-sm opacity-80 mb-6">
            Ce compte n'a pas les droits d'administration.
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background"
          >
            Se déconnecter
          </button>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <header className="mb-10 flex items-baseline justify-between flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-2">
              Back-office
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-black">
              Gestion des partitions
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-[11px] font-mono uppercase tracking-widest underline opacity-70 hover:opacity-100"
          >
            Se déconnecter
          </button>
        </header>

        <section className="mb-16 border border-border p-6 md:p-8 bg-accent/[0.03]">
          <h2 className="font-display text-2xl font-bold mb-6">
            {form.id ? "Modifier la partition" : "Ajouter une partition"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest mb-1">
                Titre *
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-foreground bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1">
                Auteur (texte)
              </label>
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full border border-foreground bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1">
                Compositeur *
              </label>
              <input
                required
                placeholder="Ex : Harmonisation : Clément Portal"
                value={form.composer}
                onChange={(e) => setForm({ ...form, composer: e.target.value })}
                className="w-full border border-foreground bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1">
                Ordre
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: Number(e.target.value) })
                }
                className="w-full border border-foreground bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest mb-1">
                Fichier PDF {form.id && "(laisser vide pour conserver l'actuel)"}
              </label>
              <input
                id="pdf-input"
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setForm({ ...form, file: e.target.files?.[0] ?? null })
                }
                className="w-full text-sm"
              />
              {form.pdf_path && (
                <p className="text-xs opacity-60 mt-1 font-mono break-all">
                  Actuel : {form.pdf_path}
                </p>
              )}
            </div>

            {error && (
              <p className="md:col-span-2 text-sm text-destructive font-mono">
                {error}
              </p>
            )}

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 bg-foreground text-background text-[11px] font-mono uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
              >
                {saving ? "Enregistrement…" : form.id ? "Mettre à jour" : "Ajouter"}
              </button>
              {form.id && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-3 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-4 border-b-2 border-foreground pb-3">
            Partitions ({scores.length})
          </h2>
          {scores.length === 0 ? (
            <p className="text-sm opacity-60 py-8">Aucune partition pour l'instant.</p>
          ) : (
            <div className="divide-y divide-border">
              {scores.map((s) => (
                <div
                  key={s.id}
                  className="py-4 grid grid-cols-12 items-baseline gap-3"
                >
                  <div className="col-span-12 md:col-span-6">
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                    {s.author && (
                      <p className="text-xs italic opacity-60">{s.author}</p>
                    )}
                    <p className="text-xs font-mono opacity-70">{s.composer}</p>
                  </div>
                  <div className="col-span-12 md:col-span-6 flex gap-2 md:justify-end flex-wrap">
                    <Link
                      to="/scores"
                      className="text-[11px] font-mono uppercase tracking-widest underline opacity-70 hover:opacity-100"
                    >
                      Voir
                    </Link>
                    <button
                      onClick={() => handleEdit(s)}
                      className="px-3 py-1.5 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(s)}
                      className="px-3 py-1.5 border border-destructive text-destructive text-[11px] font-mono uppercase tracking-widest hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
