"use client";

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 1. usePathname 추가
import { useEffect, useState } from "react";

interface HeaderProps {
  initialUser: User | null;
}

export default function Header({ initialUser }: HeaderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 2. 현재 경로 가져오기

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (_event === "SIGNED_OUT") router.refresh();
      },
    );
    return () => authListener.subscription.unsubscribe();
  }, [router]);

  // 3. 페이지 이동 시 사이드바를 닫는 헬퍼 함수
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    closeMenu();
    router.push("/member/login");
    router.refresh();
  };

  // 4. 활성화된 링크 스타일 결정 함수
  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;
    return `px-4 py-3 rounded-lg transition-colors font-medium ${
      isActive
        ? "bg-indigo-50 text-indigo-600 shadow-sm" // 활성 상태
        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600" // 기본 상태
    }`;
  };

  const getSubLinkStyle = (path: string) => {
    const isActive = pathname === path;
    return `py-2 px-3 rounded-md text-base transition-colors ${
      isActive
        ? "text-indigo-600 font-bold bg-indigo-50/50"
        : "text-gray-600 hover:text-indigo-600"
    }`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg">
              🧭
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              집행나침반
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/member/login"
                  className="text-sm font-semibold text-gray-600 hover:text-indigo-600 px-3 py-2"
                >
                  로그인
                </Link>
                <Link
                  href="/member/signup"
                  className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  시작하기
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  <b className="text-gray-900">{user.email?.split("@")[0]}</b>님
                  환영합니다
                </span>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="ml-2 p-2 rounded-xl hover:bg-gray-100 border border-gray-100"
            >
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
                className="text-gray-700"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      {/* 사이드 메뉴 */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">메뉴</h2>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            <Link href="/" onClick={closeMenu} className={getLinkStyle("/")}>
              홈 바로가기
            </Link>
            <Link
              href="/search"
              onClick={closeMenu}
              className={getLinkStyle("/search")}
            >
              나침반 검색
            </Link>

            <div className="mt-6 px-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Support
              </p>
              <nav className="flex flex-col gap-1">
                <Link
                  href="/customer/notice"
                  onClick={closeMenu}
                  className={getSubLinkStyle("/customer/notice")}
                >
                  공지사항
                </Link>
                <Link
                  href="/customer/archive"
                  onClick={closeMenu}
                  className={getSubLinkStyle("/customer/archive")}
                >
                  자료실
                </Link>
                <Link
                  href="/customer/faq"
                  onClick={closeMenu}
                  className={getSubLinkStyle("/customer/faq")}
                >
                  자주 묻는 질문
                </Link>
                <Link
                  href="/customer/contact"
                  onClick={closeMenu}
                  className={getSubLinkStyle("/customer/contact")}
                >
                  1:1 문의하기
                </Link>
              </nav>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100">
            {user ? (
              <div className="space-y-4">
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">
                    Signed in as
                  </p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/member/login"
                  onClick={closeMenu}
                  className="py-3 bg-indigo-50 text-indigo-600 text-center rounded-xl font-bold text-sm"
                >
                  로그인
                </Link>
                <Link
                  href="/member/signup"
                  onClick={closeMenu}
                  className="py-3 bg-indigo-600 text-white text-center rounded-xl font-bold text-sm"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
