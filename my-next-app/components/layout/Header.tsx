"use client";

import { Button, Flex } from "@/components/common/LayoutElements";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SideMenu } from "./SideMenu";

export default function Header({ initialUser }: { initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };
    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      },
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    router.push("/member/login");
    router.refresh();
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
            {!isLoading && !user && (
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
            )}
            {user && !isLoading && (
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
      {/* 분리된 사이드메뉴 호출 */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        isLoading={isLoading}
        onLogout={handleLogout}
        pathname={pathname}
      />
    </>
  );
}
