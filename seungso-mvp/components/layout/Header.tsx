"use client";
import { useAuth } from "@/components/auth/AuthContext";
import SideMenu from "@/components/layout/SideMenu";
import Button from "@/components/ui/Button";
import { MenuItem } from "@/lib/menu";
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ menu }: { menu: MenuItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push("/");
  };

  const closeSideMenu = async () => {
    setIsMenuOpen(false);
  };

  const filterMenu = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) => {
        if (item.requiresAuth === true && !isAuthenticated) return false;
        if (item.requiresAuth === false && isAuthenticated) return false;
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
                <Image src={logo} alt="승소환전소 로고" />
              </span>
              <b>승소환전소</b>
            </Link>

            <div className="menuGroup">
              <Button
                styleType="icon"
                onClick={() => setIsMenuOpen(true)}
                style={{ marginBottom: "-1px", lineHeight: "21px" }}
              >
                메뉴
              </Button>

              {isAuthenticated ? (
                <>
                  <Link href="/member">회원정보</Link>
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
