import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 브라우저 환경에서만 sessionStorage를 사용하도록 설정
const isBrowser = typeof window !== "undefined";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // 세션 저장은 켜두되
    storage: isBrowser ? window.sessionStorage : undefined, // 저장소를 sessionStorage로 변경
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
