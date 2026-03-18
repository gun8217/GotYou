"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("일반문의");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/member/login");
      return;
    }

    const { error } = await supabase.from("contacts").insert({
      user_id: user.id,
      user_email: user.email,
      title,
      category,
      content,
    });

    if (error) {
      alert("등록 중 오류가 발생했습니다.");
    } else {
      alert("문의가 정상적으로 접수되었습니다.");
      router.push("/customer/contact/list"); // 문의 내역 리스트로 이동
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">1:1 문의하기</h1>
        <p className="mt-2 text-gray-500">
          궁금하신 점을 남겨주시면 정성껏 답변해 드리겠습니다.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 border rounded-3xl shadow-sm"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            문의 유형
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none border"
          >
            <option>일반문의</option>
            <option>이용방법</option>
            <option>오류제보</option>
            <option>기타</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="w-full border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none border"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            문의 내용
          </label>
          <textarea
            rows={6}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 상세히 입력해 주세요"
            className="w-full border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none border"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:bg-gray-400"
        >
          {loading ? "접수 중..." : "문의 등록하기"}
        </button>
      </form>
    </div>
  );
}
