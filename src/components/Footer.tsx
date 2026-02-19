import { usePortfolio } from "@/context/PortfolioContext";

const Footer = () => {
  const {
    data: { personalInfo },
  } = usePortfolio();

  return (
    <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
    </footer>
  );
};

export default Footer;
