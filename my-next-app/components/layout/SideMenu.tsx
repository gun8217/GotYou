"use client";

import { Badge, Box, Button, Flex } from "@/components/common/LayoutElements";
import { User } from "@supabase/supabase-js";
import {
  Bell,
  Calculator,
  ChevronRight,
  FileText,
  LogIn,
  LogOut,
  MessageCircle,
  Receipt,
  ShieldAlert,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  isLoading: boolean;
  onLogout: () => void;
  pathname: string;
}

export function SideMenu({
  isOpen,
  onClose,
  user,
  isLoading,
  onLogout,
  pathname,
}: SideMenuProps) {
  // 회원탈퇴 로직 추가 (SideMenu 내부에서 처리하거나 Props로 받아도 됩니다)
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "정말로 탈퇴하시겠습니까?\n탈퇴 시 분석하신 모든 리포트 데이터가 즉시 삭제되며 복구할 수 없습니다.",
    );

    if (confirmed) {
      try {
        // 실제 운영 시에는 여기서 Supabase RPC나 API를 통해 데이터를 삭제하는 로직이 필요합니다.
        alert(
          "탈퇴 요청이 접수되었습니다. 그동안 집행나침반을 이용해 주셔서 감사합니다.",
        );
        await onLogout(); // 로그아웃 처리 및 메인 이동
      } catch (error) {
        console.error("탈퇴 처리 중 오류 발생:", error);
        alert("탈퇴 처리 중 오류가 발생했습니다.");
      }
    }
  };

  // 활성화된 메뉴 스타일 처리
  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;
    return `group flex items-center justify-between px-4 py-3 rounded transition-all ${
      isActive
        ? "bg-blue-50 text-blue-600 font-bold border border-blue-100"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
    }`;
  };

  return (
    <>
      {/* 배경 오버레이 (클릭 시 닫힘) */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 사이드바 본체 (가이드: Radius 0px) */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Flex direction="col" align="stretch" className="h-full">
          {/* 1. 사이드바 상단 헤더 */}
          <Flex justify="between" className="p-5 border-b border-slate-100">
            <h2 className="text-md font-bold text-slate-900">전체 메뉴</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </Flex>

          {/* 2. 네비게이션 메뉴 리스트 */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {!isLoading && user && (
              <>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-2 mb-1">
                  Analysis
                </p>
                <Link
                  href="/my-reports"
                  onClick={onClose}
                  className={getLinkStyle("/my-reports")}
                >
                  <Flex gap={3}>
                    <FileText size={18} className="opacity-70" />
                    <span>나의 분석 리포트</span>
                  </Flex>
                  <ChevronRight size={14} className="opacity-30" />
                </Link>
                <Link
                  href="/expenses"
                  onClick={onClose}
                  className={getLinkStyle("/expenses")}
                >
                  <Flex gap={3}>
                    <Receipt size={18} className="opacity-70" />
                    <span>비용 관리</span>
                  </Flex>
                  <ChevronRight size={14} className="opacity-30" />
                </Link>

                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest px-4 mt-6 mb-1">
                  Strategy
                </p>
                <Link
                  href="/strategy"
                  onClick={onClose}
                  className={getLinkStyle("/strategy")}
                >
                  <Flex gap={3}>
                    <ShieldAlert size={18} className="text-orange-500" />
                    <span>현실 가이드</span>
                  </Flex>
                </Link>
                <Link
                  href="/strategy/calculator"
                  onClick={onClose}
                  className={getLinkStyle("/strategy/calculator")}
                >
                  <Flex gap={3}>
                    <Calculator size={18} className="text-blue-600" />
                    <span>가성비 계산기</span>
                  </Flex>
                  <Badge variant="blue">HOT</Badge>
                </Link>
              </>
            )}

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-6 mb-1">
              Support
            </p>
            <Link
              href="/customer/notice"
              onClick={onClose}
              className={getLinkStyle("/customer/notice")}
            >
              <Flex gap={3}>
                <Bell size={18} className="opacity-70" />
                <span>공지사항</span>
              </Flex>
            </Link>
            <Link
              href="/customer/contact"
              onClick={onClose}
              className={getLinkStyle("/customer/contact")}
            >
              <Flex gap={3}>
                <MessageCircle size={18} className="opacity-70" />
                <span>1:1 문의</span>
              </Flex>
            </Link>
          </nav>

          {/* 3. 사이드바 하단 정보 및 로그아웃 (가이드: Radius 0px) */}
          <Box
            padding="sm"
            className="bg-slate-50 border-t border-slate-100 rounded-none"
          >
            {!isLoading &&
              (user ? (
                <Flex direction="col" gap={3} align="stretch">
                  <Flex gap={3}>
                    <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold rounded">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate">{user.email}</p>
                      <Badge variant="blue">정회원</Badge>
                    </div>
                  </Flex>

                  <Flex direction="col" gap={1} align="stretch">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onLogout}
                      className="w-full"
                    >
                      <LogOut size={14} className="mr-2" /> 로그아웃
                    </Button>

                    {/* 회원탈퇴 버튼 추가: 너무 튀지 않게 서브 텍스트로 처리 */}
                    <button
                      onClick={handleDeleteAccount}
                      className="py-2 text-[11px] text-slate-400 hover:text-red-500 underline underline-offset-4 font-medium transition-colors"
                    >
                      회원탈퇴
                    </button>
                  </Flex>
                </Flex>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/member/login" onClick={onClose}>
                    <Button variant="outline" size="sm" className="w-24 w-full">
                      <LogIn size={14} className="mr-2" />
                      로그인
                    </Button>
                  </Link>
                  <Link href="/member/signup" onClick={onClose}>
                    <Button variant="primary" size="sm" className="w-full">
                      <UserPlus size={14} className="mr-2" />
                      가입
                    </Button>
                  </Link>
                </div>
              ))}
          </Box>
        </Flex>
      </aside>
    </>
  );
}
