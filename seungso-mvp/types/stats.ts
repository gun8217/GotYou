import { createClient } from "@supabase/supabase-js";

// 1. 환경변수에서 정보를 가져와 supabase 클라이언트를 생성합니다.
// Next.js 환경이라면 .env.local 파일에 아래 키값들이 있어야 합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// 2. 타입 정의 (이전과 동일)
export interface NotaryStat {
  id: number;
  stats_ym: string;
  execution_count: number;
  year: number;
  month: number;
}

export interface ChartData {
  labels: string[];
  counts: number[];
}

// 3. 년도별 합계 추출 함수
export const fetchYearlyStats = async (): Promise<ChartData> => {
  const { data, error } = await supabase
    .from("notary_stats")
    .select("year, execution_count")
    // 2014년 이상, 2019년 이하 데이터만 가져오기
    .gte("year", 2014)
    .lte("year", 2019)
    .order("year", { ascending: true });

  if (error || !data || data.length === 0) {
    console.error("데이터 로드 실패:", error?.message);
    return { labels: [], counts: [] };
  }

  // 데이터 합산 로직 (기존과 동일)
  const yearlyMap = data.reduce((acc: Record<number, number>, cur) => {
    const y = cur.year;
    acc[y] = (acc[y] || 0) + (cur.execution_count || 0);
    return acc;
  }, {});

  return {
    // [2014, 2015, ... 2019]
    labels: Object.keys(yearlyMap).map((year) => `${year}년`),
    counts: Object.values(yearlyMap),
  };
};
