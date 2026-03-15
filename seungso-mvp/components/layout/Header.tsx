"use client";
import { useAuth } from "@/components/auth/AuthContext";
import SideMenu from "@/components/layout/SideMenu";
import Button from "@/components/ui/Button";
import { MenuItem } from "@/lib/menu";
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ menu }: { menu: MenuItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isVerifying, setIsVerifying] = useState(false);

  // [수정] 로그인 UI를 강제로 숨겨야 하는 경로들
  // 1. 로그인 페이지 자체 (/member/login)
  // 2. 비밀번호 찾기/재설정 관련 페이지들
  const isHideAuthUI =
    pathname === "/member/login" ||
    pathname.includes("forgot-password") ||
    pathname.includes("reset-password");

  useEffect(() => {
    const checkVerifying = () => {
      const verifying = sessionStorage.getItem("is_verifying") === "true";
      setIsVerifying(verifying);
    };

    checkVerifying();
    window.addEventListener("storage", checkVerifying);
    const interval = setInterval(checkVerifying, 100);

    return () => {
      window.removeEventListener("storage", checkVerifying);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push("/");
  };

  const closeSideMenu = async () => {
    setIsMenuOpen(false);
  };

  // 최종 판단: 인증되었더라도 '숨김 경로'에 있거나 '탈퇴 검증 중'이면 비로그인 UI 출력
  const showUserMenu = isAuthenticated && !isVerifying && !isHideAuthUI;

  const filterMenu = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) => {
        if (item.requiresAuth === true && !showUserMenu) return false;
        if (item.requiresAuth === false && showUserMenu) return false;
        return true;
      })
      .map((item) => ({
        ...item,
        children: item.children ? filterMenu(item.children) : undefined,
      }));
  };

  const filteredMenu = filterMenu(menu);

  return (
    <>
      <header>
        <div className="inner">
          <nav aria-label="상단 주요 메뉴">
            <Link href="/" className="logo">
              <span>
                <Image src={logo} alt="집행나침반 로고" />
              </span>
              <b>집행나침반</b>
            </Link>

            <div className="menuGroup">
              <Button
                styleType="icon"
                onClick={() => setIsMenuOpen(true)}
                style={{ marginBottom: "-1px", lineHeight: "21px" }}
              >
                메뉴
              </Button>

              {showUserMenu ? (
                <>
                  <Link href="/member">마이페이지</Link>
                  <Button styleType="icon" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/member/login" onClick={closeSideMenu}>
                    로그인
                  </Link>
                  <Link href="/member/signup" onClick={closeSideMenu}>
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <SideMenu menu={filteredMenu} onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}
