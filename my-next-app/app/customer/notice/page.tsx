import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function NoticePage() {
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

  // 최신순으로 공지사항 가져오기 (상단 고정 우선)
  const { data: notices, error } = await supabase
    .from("notices")
    .select("*")
    .order("is_fixed", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-10 text-center">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">공지사항</h1>
        <p className="mt-2 text-gray-500">
          집행나침반의 새로운 소식을 전해드립니다.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-20 text-center">
                번호
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                제목
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-32 text-center">
                작성일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notices?.map((notice, index) => (
              <tr
                key={notice.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 text-sm text-center text-gray-500">
                  {notice.is_fixed ? (
                    <span className="inline-block px-2 py-1 text-xs font-bold text-indigo-600 bg-indigo-50 rounded">
                      중요
                    </span>
                  ) : (
                    notices.length - index
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/customer/notice/${notice.id}`}
                    className="block text-gray-900 font-medium group-hover:text-indigo-600"
                  >
                    {notice.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-500">
                  {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                </td>
              </tr>
            ))}
            {notices?.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-20 text-center text-gray-500"
                >
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
