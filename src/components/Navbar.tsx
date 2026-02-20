import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Beyond Work", href: "/beyond-work" },
  { label: "Projects", href: "/#projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const {
    data: { personalInfo },
  } = usePortfolio();

  const handleClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname !== "/") {
        window.location.href = href;
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isRouteActive = (href: string) => {
    return href.startsWith("/") && !href.startsWith("/#") && location.pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          {personalInfo.name}
        </Link>

        <ul className="hidden md:flex gap-8">
          {navItems.map((item) =>
            item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`text-sm transition-colors hover:text-foreground ${isRouteActive(item.href) ? "text-foreground underline decoration-primary/60 underline-offset-8" : "text-muted-foreground"}`}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label}>
                <button onClick={() => handleClick(item.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </button>
              </li>
            )
          )}
        </ul>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) =>
              item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm transition-colors hover:text-foreground ${isRouteActive(item.href) ? "text-foreground underline decoration-primary/60 underline-offset-4" : "text-muted-foreground"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label}>
                  <button onClick={() => handleClick(item.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
