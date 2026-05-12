import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex justify-between items-baseline">
        <Link to="/" className="font-display font-bold text-xl tracking-tight">
          ELIAS VOGEL
        </Link>
        <div className="flex gap-5 md:gap-8 text-xs md:text-sm uppercase tracking-widest font-medium font-mono">
          <Link
            to="/biography"
            activeProps={{ className: "text-accent" }}
            className="hover:text-accent transition-colors"
          >
            Biographie
          </Link>
          <Link
            to="/scores"
            activeProps={{ className: "text-accent" }}
            className="hover:text-accent transition-colors"
          >
            Partitions
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-accent" }}
            className="hover:text-accent transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
