import { usePortfolio } from "@/context/PortfolioContext";

const Footer = () => {
  const {
    data: { personalInfo },
  } = usePortfolio();

  return (
    <footer className="border-t border-border/90 px-6 py-10">
      <div className="section-shell flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="eyebrow text-muted-foreground">© {new Date().getFullYear()} {personalInfo.name}</p>
        <p className="text-sm text-muted-foreground">Built for thoughtful, product-focused engineering teams.</p>
      </div>
    </footer>
  );
};

export default Footer;
