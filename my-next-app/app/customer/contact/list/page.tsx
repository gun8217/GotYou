"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

// 1. Contact 인터페이스 정의
interface Contact {
  id: string | number;
  status: string;
  title: string;
  created_at: string;
  // 추가로 사용하는 컬럼이 있다면 여기에 더 작성하세요.
}

export default function ContactListPage() {
  // 2. any[] 대신 Contact[] 사용
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      // data가 null일 수 있으므로 빈 배열로 처리
      setContacts((data as Contact[]) || []);
    };
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">내 문의 내역</h1>
        <Link
          href="/customer/contact"
          className="text-indigo-600 font-semibold"
        >
          + 새 문의하기
        </Link>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        {contacts.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  상태
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  제목
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  날짜
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        item.status === "답변완료"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-20 text-center text-gray-400">
            문의 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
