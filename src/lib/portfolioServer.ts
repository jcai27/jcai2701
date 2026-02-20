import type { PortfolioData } from "@/data/portfolio";
import { assetsBucket, isSupabaseConfigured, portfolioTable, supabase } from "@/lib/supabase";

const PORTFOLIO_ROW_ID = "default";

export async function fetchPortfolioFromServer(): Promise<PortfolioData | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from(portfolioTable)
    .select("content")
    .eq("id", PORTFOLIO_ROW_ID)
    .maybeSingle();

  if (error) throw error;
  if (!data?.content) return null;

  return data.content as PortfolioData;
}

export async function savePortfolioToServer(content: PortfolioData): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase
    .from(portfolioTable)
    .upsert(
      {
        id: PORTFOLIO_ROW_ID,
        content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

  if (error) throw error;
}

function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

export async function uploadAsset(file: File, folder: "resumes" | "avatars" | "logos" | "hobbies"): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const path = `${folder}/${Date.now()}-${safeFileName(file.name)}`;

  const { error } = await supabase.storage.from(assetsBucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || undefined,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(assetsBucket).getPublicUrl(path);
  return data.publicUrl;
}
