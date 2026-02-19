import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultPortfolioData, DEFAULT_RESUME_URL, PORTFOLIO_STORAGE_KEY, type PortfolioData } from "@/data/portfolio";
import { fetchPortfolioFromServer, savePortfolioToServer } from "@/lib/portfolioServer";
import { isSupabaseConfigured } from "@/lib/supabase";

interface PortfolioContextValue {
  data: PortfolioData;
  resumeUrl: string;
  isLoading: boolean;
  isServerConfigured: boolean;
  setData: (value: PortfolioData) => void;
  saveData: (value: PortfolioData) => Promise<void>;
  resetData: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

function readStoredData(): PortfolioData {
  if (typeof window === "undefined") return defaultPortfolioData;

  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return defaultPortfolioData;

    const parsed = JSON.parse(raw) as PortfolioData;
    return {
      ...defaultPortfolioData,
      ...parsed,
      personalInfo: {
        ...defaultPortfolioData.personalInfo,
        ...parsed.personalInfo,
      },
    };
  } catch {
    return defaultPortfolioData;
  }
}

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(() => readStoredData());
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    let active = true;
    void (async () => {
      try {
        const remote = await fetchPortfolioFromServer();
        if (active && remote) {
          setData({
            ...defaultPortfolioData,
            ...remote,
            personalInfo: {
              ...defaultPortfolioData.personalInfo,
              ...remote.personalInfo,
            },
          });
        }
      } catch {
        // Fall back to local state when server fetch fails.
      } finally {
        if (active) setIsLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const resumeUrl = useMemo(() => {
    return data.resume?.dataUrl || DEFAULT_RESUME_URL;
  }, [data.resume]);

  const saveData = async (value: PortfolioData) => {
    setData(value);
    await savePortfolioToServer(value);
  };

  const value: PortfolioContextValue = {
    data,
    resumeUrl,
    isLoading,
    isServerConfigured: isSupabaseConfigured,
    setData,
    saveData,
    resetData: () => setData(defaultPortfolioData),
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
