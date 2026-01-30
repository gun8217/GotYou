// app/api/notary-stats/route.ts
import { createClient } from "@/utils/supabase/server";

interface NotaryStat {
  id: number;
  stats_ym: string;
  execution_count: number;
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notary_stats")
    .select("id, stats_ym, execution_count");

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data as NotaryStat[]);
}
