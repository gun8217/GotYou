import Header from "@/components/layout/Header";
import { createServerClient } from "@supabase/ssr";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "집행나침반",
  description: "승소 이후 방치되는 권리를 데이터로 되찾다!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. 서버 측에서 쿠키 가져오기 (Next.js 15 대응 await 추가)
  const cookieStore = await cookies();

  // 2. 서버 측 Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  // 3. 서버에서 유저 정보 직접 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* key={user?.id} 를 추가하여 유저 상태에 따른 컴포넌트 인스턴스를 고정합니다. */}
        <Header initialUser={user} key={user?.id ?? "guest"} />
        {children}
      </body>
    </html>
  );
}
