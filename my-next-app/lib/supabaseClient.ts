import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // 세션 유지 활성화
    autoRefreshToken: true, // 토큰 자동 갱신
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});
