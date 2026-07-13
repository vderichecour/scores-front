import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/scores", label: "Partitions" },
  { to: "/resources", label: "Ressources" },
  { to: "/biography", label: "Biographie" },
  { to: "/contact", label: "Contact" },
] as const;

const navLinkClass =
  "hover:text-accent transition-colors uppercase tracking-widest font-medium font-mono";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="font-display font-bold text-xl tracking-tight">
          CLÉMENT PORTAL
        </Link>

        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium font-mono">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-accent" }}
              className={navLinkClass}
            >
              {label}
            </Link>
          ))}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle className="font-display text-left text-xl tracking-tight">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-6 text-sm uppercase tracking-widest font-medium font-mono">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  activeProps={{ className: "text-accent" }}
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
