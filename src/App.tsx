import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Index from "./pages/Index";
import Resume from "./pages/Resume";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const App = () => (
  <PortfolioProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </PortfolioProvider>
);

export default App;
