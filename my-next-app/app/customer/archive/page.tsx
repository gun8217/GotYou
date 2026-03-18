import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";

// 파일 용량을 읽기 좋게 변환하는 함수
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default async function ArchivePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const { data: archives, error } = await supabase
    .from("archives")
    .select("*")
    .order("created_at", { ascending: false });

  // 💡 아래 로직을 추가해서 'error' 변수를 사용하세요.
  if (error) {
    console.error("데이터 로드 에러:", error.message);
    // 필요하다면 사용자에게 에러 화면을 보여줄 수 있습니다.
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 text-left border-l-4 border-indigo-600 pl-6">
        <h1 className="text-3xl font-bold text-gray-900">자료실</h1>
        <p className="mt-2 text-gray-500 font-medium">
          실무에 필요한 각종 서식과 가이드북을 다운로드하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archives?.map((item) => (
          <div
            key={item.id}
            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-600 group-hover:text-white transition-colors"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded tracking-wider uppercase">
                {item.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
              {item.description || "상세 설명이 없습니다."}
            </p>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
              <div className="flex gap-3">
                <span>{formatBytes(item.file_size || 0)}</span>
                <span>•</span>
                <span>다운로드 {item.download_count}회</span>
              </div>
              <Link
                href={`/customer/archive/${item.id}`}
                className="text-indigo-600 font-bold hover:underline"
              >
                상세보기
              </Link>
            </div>
          </div>
        ))}

        {archives?.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
            등록된 자료가 아직 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
