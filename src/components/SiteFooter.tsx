import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-20 px-6 md:px-8 mt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:items-end">
        <div className="max-w-md">
          <h4 className="font-display text-3xl md:text-4xl mb-4">Contact</h4>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6">
            Pour toute question, demande ou proposition, n'hésitez pas à
            m'écrire.
          </p>
          <Link
            to="/contact"
            className="inline-block text-xl md:text-2xl underline decoration-accent decoration-2 underline-offset-8 hover:text-accent transition-colors"
          >
            Formulaire de contact →
          </Link>
        </div>
        <div className="text-left md:text-right font-mono text-[10px] uppercase tracking-widest opacity-40 space-y-2">
          <p>© {new Date().getFullYear()} Clément Portal</p>
          <p>Partitions librement partagées</p>
        </div>
      </div>
    </footer>
  );
}
