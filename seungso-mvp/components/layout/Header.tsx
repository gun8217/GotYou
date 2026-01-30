"use client";
import SideMenu from "@/components/layout/SideMenu";
import { MenuItem } from "@/lib/menu";
import { supabase } from "@/lib/supabase/client";
import logo from "@/public/images/logo.svg";
import {
  faArrowRightFromBracket,
  faBars,
  faUser,
  faUserCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <>
        <nav aria-label="상단 주요 메뉴">
          <Link href="/" className="logo">
            <span>
              <Image src={logo} alt="승소환전소 로고" />
            </span>
            <b>승소환전소</b>
          </Link>
        </nav>
      </>
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
              <button onClick={() => setIsMenuOpen(true)}>
                <FontAwesomeIcon icon={faBars} size="lg" aria-label="메뉴" />
              </button>
            )}

            {user ? (
              <>
                <Link href="/join">
                  <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                    aria-label="회원정보"
                  />
                </Link>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    size="lg"
                    aria-label="로그아웃"
                  />
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <FontAwesomeIcon icon={faUserCheck} aria-label="로그인" />
                </Link>
                <Link href="/join">
                  <FontAwesomeIcon icon={faUserPlus} aria-label="회원가입" />
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
