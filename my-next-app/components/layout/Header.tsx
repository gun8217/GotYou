"use client";

import { logout } from "@/app/member/login/actions";
import { Button, Flex } from "@/components/common/LayoutElements";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SideMenu } from "./SideMenu";

export default function Header({ initialUser }: { initialUser: User | null }) {
  // 🌟 핵심: 서버가 준 데이터로 상태를 고정합니다.
  // useEffect를 삭제하여 브라우저가 멋대로 세션을 재검토하지 못하게 막습니다.
  const [user, setUser] = useState<User | null>(initialUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout(); // 서버 쿠키 삭제 (actions.ts)
    setUser(null);
    setIsMenuOpen(false);
    // 🌟 로그아웃 후에는 완전히 깨끗한 상태로 만들기 위해 페이지를 새로고침하며 이동합니다.
    window.location.href = "/member/login";
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tighter">
              집행나침반
            </span>
          </Link>

          <Flex gap={2} justify="end">
            {/* 🌟 서버 데이터(user)가 있으면 로그인 정보, 없으면 로그인 버튼 - 딱 한 가지만 출력 */}
            {!user ? (
              <Flex gap={1} className="hidden sm:flex">
                <Link href="/member/login">
                  <Button variant="ghost" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/member/signup">
                  <Button variant="ghost" size="sm">
                    회원가입
                  </Button>
                </Link>
              </Flex>
            ) : (
              <div className="hidden sm:block mr-2 text-xs font-bold text-slate-700">
                {user.email?.split("@")[0]}님
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
          </Flex>
        </div>
      </header>

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        isLoading={false} // 서버에서 이미 결정됐으므로 로딩 상태는 필요 없습니다.
        onLogout={handleLogout}
        pathname={pathname}
      />
    </>
  );
}
