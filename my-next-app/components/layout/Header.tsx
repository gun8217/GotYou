"use client";

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import {
  Bell,
  Calculator,
  ChevronRight,
  FileText,
  HelpCircle,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Receipt,
  Search,
  ShieldAlert,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  initialUser: User | null;
}

export default function Header({ initialUser }: HeaderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 세션 체크 로직을 최우선 실행
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } finally {
        setIsLoading(false); // 성공 실패 여부와 상관없이 로딩 종료
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
        if (_event === "SIGNED_OUT") router.refresh();
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, [router]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    closeMenu();
    router.push("/member/login");
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "정말로 탈퇴하시겠습니까?\n탈퇴 시 분석하신 모든 리포트 데이터가 즉시 삭제되며 복구할 수 없습니다.",
    );

    if (confirmed) {
      try {
        alert(
          "탈퇴 요청이 접수되었습니다. 그동안 집행나침반을 이용해 주셔서 감사합니다.",
        );
        await supabase.auth.signOut();
        closeMenu();
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("탈퇴 처리 중 오류 발생:", error);
        alert("탈퇴 처리 중 오류가 발생했습니다. 고객센터로 문의해주세요.");
      }
    }
  };

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;
    return `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 font-bold shadow-sm border border-blue-100"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
    }`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              집행나침반
            </span>
          </Link>

          {/* 우측 액션 영역: 로딩 중에는 빈 공간(w-20)을 유지하여 레이아웃 흔들림 방지 */}
          <div className="flex items-center gap-2 min-w-[40px] justify-end">
            {isLoading ? (
              <div className="w-10 h-10" /> // 로딩 중 빈 공간 유지
            ) : (
              <>
                {!user ? (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link
                      href="/member/login"
                      className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2 transition-colors"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/member/signup"
                      className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-600 shadow-md transition-all active:scale-95"
                    >
                      시작하기
                    </Link>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-3 mr-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-700 leading-none">
                        {user.email?.split("@")[0]}님
                      </span>
                      <span className="text-sm text-slate-500 leading-none">
                        환영합니다!
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6 text-slate-700 group-hover:text-blue-600" />
            </button>
          </div>
        </div>
      </header>

      {/* 사이드바 영역은 기존과 동일 (생략 가능하나 확인용 유지) */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-900">전체 메뉴</h2>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
            {/* 1. 분석 및 관리 세션 (로그인 유저 전용) */}
            {!isLoading && user && (
              <>
                <div className="mt-4 mb-2 px-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Analysis & Management
                  </p>
                </div>

                {/* 나의 분석 리포트 */}
                <Link
                  href="/my-reports"
                  onClick={closeMenu}
                  className={getLinkStyle("/my-reports")}
                >
                  <div className="flex items-center gap-3 text-[15px]">
                    <FileText className="w-5 h-5 opacity-70" />
                    <span>나의 분석 리포트</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-30" />
                </Link>

                {/* 집행 비용/영수증 관리 */}
                <Link
                  href="/expenses"
                  onClick={closeMenu}
                  className={getLinkStyle("/expenses")}
                >
                  <div className="flex items-center gap-3 text-[15px]">
                    <Receipt className="w-5 h-5 opacity-70" />
                    <span>집행 비용/영수증 관리</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-30" />
                </Link>

                {/* --- 신규 추가: 집행 전략 세션 --- */}
                <div className="mt-8 mb-2 px-4">
                  <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.2em]">
                    Execution Strategy
                  </p>
                </div>

                {/* 강제집행 현실 가이드 (팩트 폭격 화면) */}
                <Link
                  href="/strategy"
                  onClick={closeMenu}
                  className={getLinkStyle("/strategy")}
                >
                  <div className="flex items-center gap-3 text-[15px]">
                    <ShieldAlert className="w-5 h-5 text-orange-500 opacity-80" />
                    <span className="font-semibold text-slate-700">
                      집행 전략 & 현실 가이드
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-30" />
                </Link>

                {/* 가성비 계산기 (신규) */}
                <Link
                  href="/strategy/calculator"
                  onClick={closeMenu}
                  className={getLinkStyle("/strategy/calculator")}
                >
                  <div className="flex items-center gap-3 text-[15px]">
                    <Calculator className="w-5 h-5 text-blue-600 opacity-80" />
                    <span className="font-semibold text-slate-700">
                      집행 가성비 계산기
                    </span>
                  </div>
                  <div className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-black">
                    HOT
                  </div>
                </Link>
              </>
            )}

            {/* 2. 서비스 가이드 세션 (공통) */}
            <div className="mt-8 mb-2 px-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Service Guide
              </p>
            </div>

            <Link
              href="/customer/notice"
              onClick={closeMenu}
              className={getLinkStyle("/customer/notice")}
            >
              <div className="flex items-center gap-3 text-[15px]">
                <Bell className="w-5 h-5 opacity-70" />
                <span>공지사항</span>
              </div>
            </Link>

            <Link
              href="/customer/archive"
              onClick={closeMenu}
              className={getLinkStyle("/customer/archive")}
            >
              <div className="flex items-center gap-3 text-[15px]">
                <FileText className="w-5 h-5 opacity-70" />
                <span>법률 서식 자료실</span>
              </div>
            </Link>

            <Link
              href="/customer/faq"
              onClick={closeMenu}
              className={getLinkStyle("/customer/faq")}
            >
              <div className="flex items-center gap-3 text-[15px]">
                <HelpCircle className="w-5 h-5 opacity-70" />
                <span>자주 묻는 질문</span>
              </div>
            </Link>

            <Link
              href="/customer/contact"
              onClick={closeMenu}
              className={getLinkStyle("/customer/contact")}
            >
              <div className="flex items-center gap-3 text-[15px]">
                <MessageCircle className="w-5 h-5 opacity-70" />
                <span>1:1 문의하기</span>
              </div>
            </Link>
          </nav>

          <div className="p-6 bg-slate-50 border-t border-slate-100">
            {isLoading ? (
              <div className="h-20 animate-pulse bg-slate-200 rounded-xl" /> // 사이드바 하단 로딩 스켈레톤
            ) : (
              <>
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {user.email}
                        </p>
                        <p className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                          정회원
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50"
                      >
                        <LogOut className="w-4 h-4 text-slate-400" />
                        로그아웃
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="w-full py-2 text-xs text-slate-400 hover:text-red-500 underline underline-offset-4 font-medium"
                      >
                        회원탈퇴
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/member/login"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm"
                    >
                      <LogIn className="w-4 h-4" />
                      로그인
                    </Link>
                    <Link
                      href="/member/signup"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm"
                    >
                      <UserPlus className="w-4 h-4" />
                      회원가입
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
