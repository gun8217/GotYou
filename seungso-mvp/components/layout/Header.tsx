"use client";
import SideMenu from "@/components/layout/SideMenu";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { MenuItem } from "@/lib/menu";
import { supabase } from "@/lib/supabase/client";
import logo from "@/public/images/logo.svg";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ menu }: { menu: MenuItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading)
    return (
      <header>
        <nav aria-label="상단 주요 메뉴">
          <Link href="/" className="logo">
            <span>
              <Image src={logo} alt="승소환전소 로고" />
            </span>
            <b>승소환전소</b>
          </Link>
        </nav>
      </header>
    );

  return (
    <>
      <header>
        <nav aria-label="상단 주요 메뉴">
          <Link href="/" className="logo">
            <span>
              <Image src={logo} alt="승소환전소 로고" />
            </span>
            <b>승소환전소</b>
          </Link>
          <div className="menuGroup">
            {user && (
              <Button styleType="icon" onClick={() => setIsMenuOpen(true)}>
                <Icon icon="bars" size="lg" aria-label="메뉴" />
              </Button>
            )}

            {user ? (
              <>
                <Link href="/member/signup">
                  <Icon icon="user" size="lg" aria-label="회원정보" />
                </Link>
                <Button styleType="icon" onClick={() => handleLogout()}>
                  <Icon
                    icon="arrow-right-from-bracket"
                    size="lg"
                    aria-label="로그아웃"
                  />
                </Button>
              </>
            ) : (
              <>
                <Link href="/member/login">
                  <Icon icon="user-check" size="lg" aria-label="로그인" />
                  로그인
                </Link>
                <Link href="/member/signup">
                  <Icon icon="user-plus" size="lg" aria-label="회원가입" />
                  회원가입
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <SideMenu menu={menu} onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}
