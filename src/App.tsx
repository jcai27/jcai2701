import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "@/context/PortfolioContext";

const Index = lazy(() => import("./pages/Index"));
const Resume = lazy(() => import("./pages/Resume"));
const BeyondWork = lazy(() => import("./pages/BeyondWork"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <PortfolioProvider>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/beyond-work" element={<BeyondWork />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </PortfolioProvider>
);

export default App;
