"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ArchiveWritePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("일반");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return alert("제목과 파일을 확인해주세요.");

    setIsUploading(true);

    try {
      // 1. Storage에 파일 업로드
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 'uploadData'는 사용하지 않으므로 변수 할당을 제거하거나 _ 처리합니다.
      const { error: uploadError } = await supabase.storage
        .from("archive-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. 업로드된 파일의 Public URL 가져오기
      const {
        data: { publicUrl },
      } = supabase.storage.from("archive-files").getPublicUrl(filePath);

      // 3. Database(archives 테이블)에 정보 저장
      const { error: dbError } = await supabase.from("archives").insert({
        title,
        description,
        category,
        file_url: publicUrl,
        file_name: file.name,
        file_size: file.size,
      });

      if (dbError) throw dbError;

      alert("자료가 성공적으로 등록되었습니다.");
      router.push("/customer/archive");
      router.refresh();
    } catch (error: unknown) {
      // 'any' 대신 'unknown' 사용
      // unknown 타입은 바로 message에 접근할 수 없으므로 타입 가드 적용
      if (error instanceof Error) {
        alert("오류 발생: " + error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">자료 등록 (운영자)</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 border rounded-2xl shadow-sm"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            카테고리
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>일반</option>
            <option>서식</option>
            <option>가이드</option>
            <option>판례</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="자료 제목을 입력하세요"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            상세 설명
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="자료에 대한 설명을 입력하세요"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            파일 업로드
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                  <span>파일 선택</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">또는 드래그 앤 드롭</p>
              </div>
              <p className="text-xs text-gray-500">
                {file
                  ? `선택됨: ${file.name}`
                  : "PDF, HWP, DOCX 등 (최대 50MB)"}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${isUploading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"}`}
        >
          {isUploading ? "업로드 중..." : "자료 등록하기"}
        </button>
      </form>
    </div>
  );
}
