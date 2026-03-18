"use client";

import {
  AlertTriangle,
  AlignLeft,
  ArrowLeft,
  Calendar,
  Check,
  Paperclip,
  Plus,
  Receipt,
  Tag,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "인지대/송달료",
      detail: "강남법원 우편 발송",
      amount: 5200,
      date: "2024-03-10",
      fileName: "receipt_01.pdf",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // 삭제 대상 추적을 위한 상태 추가
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    detail: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "인지대/송달료",
    detail: "",
    amount: "",
    fileName: "",
  });

  const handleAddSubmit = () => {
    if (!formData.detail || !formData.amount) {
      alert("세부내용과 금액을 입력해주세요.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...formData,
      amount: parseInt(formData.amount.toString().replace(/,/g, "")),
    };

    setExpenses([newEntry, ...expenses]);
    setIsModalOpen(false);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      category: "인지대/송달료",
      detail: "",
      amount: "",
      fileName: "",
    });
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  // 커스텀 모달용 삭제 실행 함수
  const confirmDelete = () => {
    if (deleteTarget) {
      setExpenses(expenses.filter((ex) => ex.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* 고정 상단 헤더 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-2xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/my-reports"
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-slate-900">지출 내역 관리</h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1.5 shadow-md shadow-blue-100 active:scale-95 transition-all hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> 내역 추가
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-6 py-8">
        {/* 요약 카드 */}
        <div className="bg-slate-900 rounded-[32px] p-6 text-white mb-8 shadow-xl shadow-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            현재까지 누적 지출
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">
              {totalAmount.toLocaleString()}
            </span>
            <span className="text-lg font-bold text-slate-400">원</span>
          </div>
        </div>

        {/* 지출 리스트 섹션 */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-400 ml-1">
            지출 상세 목록 ({expenses.length})
          </h2>
          {expenses.length > 0 ? (
            expenses.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {item.date}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900">{item.detail}</p>
                    {item.fileName && (
                      <p className="text-[11px] text-blue-500 flex items-center gap-1 mt-1 font-medium bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                        <Paperclip className="w-3 h-3" /> {item.fileName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <p className="font-black text-slate-900 text-lg">
                    {item.amount.toLocaleString()}원
                  </p>
                  <button
                    onClick={() =>
                      setDeleteTarget({ id: item.id, detail: item.detail })
                    }
                    className="text-slate-200 hover:text-red-500 p-1 transition-colors"
                    title="내역 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">
                등록된 지출 내역이 없습니다.
              </p>
            </div>
          )}
        </div>

        {/* 입력 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  지출 정보 입력
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2 ml-1">
                    <Calendar className="w-3.5 h-3.5" /> 지출 일자
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2 ml-1">
                    <Tag className="w-3.5 h-3.5" /> 비목
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option>인지대/송달료</option>
                    <option>집행관 수수료</option>
                    <option>자산/주소 조회비</option>
                    <option>교통비/식대</option>
                    <option>기타 비용</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2 ml-1">
                    <AlignLeft className="w-3.5 h-3.5" /> 세부내용
                  </label>
                  <input
                    type="text"
                    placeholder="예: 판결문 정본 송달료"
                    value={formData.detail}
                    onChange={(e) =>
                      setFormData({ ...formData, detail: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 mb-2 ml-1">
                    지출 금액 (원)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2 ml-1">
                    <Paperclip className="w-3.5 h-3.5" /> 첨부 서류 (PDF/이미지)
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fileName: e.target.files?.[0]?.name || "",
                        })
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full px-4 py-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400 flex items-center justify-center gap-2 group-hover:border-blue-400 transition-all font-medium">
                      {formData.fileName ? (
                        <span className="text-blue-600">
                          {formData.fileName}
                        </span>
                      ) : (
                        "파일을 선택하세요"
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddSubmit}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all mt-4"
                >
                  <Check className="w-5 h-5" /> 내역 저장하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🚨 커스텀 삭제 확인 모달 */}
        {deleteTarget && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
              onClick={() => setDeleteTarget(null)}
            />
            <div className="relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  지출 내역 삭제
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  <span className="font-bold text-slate-900">
                    &ldquo;{deleteTarget.detail}&rdquo;
                  </span>
                  <br />
                  내역을 삭제하시겠습니까?
                  <br />
                  <span className="text-red-500 font-semibold underline underline-offset-4 font-bold">
                    삭제 후에는 복구가 불가능합니다.
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    <Undo2 className="w-4 h-4" /> 취소
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="py-4 bg-red-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-100 hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> 삭제하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
