import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Clément Portal" },
      {
        name: "description",
        content:
          "Contactez Clément Portal pour toute question concernant les partitions harmonisées ou composées.",
      },
      { property: "og:title", content: "Contact — Clément Portal" },
      {
        property: "og:description",
        content: "Pour toute question concernant les partitions.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  first_name: z.string().trim().min(1, "Prénom requis").max(100),
  last_name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  message: z.string().trim().min(1, "Message requis").max(5000),
});

type FormState = z.infer<typeof contactSchema>;

const empty: FormState = { first_name: "", last_name: "", email: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    setStatus("sending");
    const { error: insErr } = await supabase
      .from("contact_messages")
      .insert(parsed.data);
    if (insErr) {
      setStatus("idle");
      setError(insErr.message);
      return;
    }
    setStatus("sent");
    setForm(empty);
  };

  const inputClass =
    "w-full border border-foreground bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";

  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <header className="mb-16 md:mb-20 animate-reveal">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Contact
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-balance max-w-4xl">
            M'écrire.
          </h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-reveal [animation-delay:200ms]">
          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div className="border border-accent/40 bg-accent/5 p-8">
                <p className="font-display text-2xl mb-2">Message envoyé.</p>
                <p className="text-sm opacity-80 mb-6">
                  Merci pour votre message. Une réponse vous parviendra dès que possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-4 py-2 border border-foreground text-[11px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
                    Prénom
                  </label>
                  <input
                    required
                    maxLength={100}
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
                    Nom
                  </label>
                  <input
                    required
                    maxLength={100}
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest mb-1 opacity-70">
                    Message
                  </label>
                  <textarea
                    required
                    maxLength={5000}
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass}
                  />
                </div>
                {error && (
                  <p className="sm:col-span-2 text-sm text-destructive font-mono">
                    {error}
                  </p>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="px-6 py-3 bg-foreground text-background text-[11px] font-mono uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
                  >
                    {status === "sending" ? "Envoi…" : "Envoyer le message"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 border-l-0 lg:border-l lg:pl-12 border-border">
            <p className="text-lg leading-relaxed opacity-85">
              Pour toute remarque ou question sur une partition,
              demande d'harmonisation ou un simple commentaire à me faire,
              n'hésitez pas à m'écrire.
            </p>
            <div className="mt-10">
              <p className="font-display text-2xl md:text-3xl leading-snug mb-4 italic">
                « Dans l'essentiel, l'unité ; dans les questions douteuses, la liberté ; en tout, la charité. »
              </p>
              <p className="text-sm font-mono uppercase tracking-widest opacity-60">
                — Jean XXIII
              </p>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
