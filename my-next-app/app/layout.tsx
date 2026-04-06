import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { createServerClient } from "@supabase/ssr";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

// 1. 폰트 설정
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-kr", // CSS의 var(--font-noto-sans-kr)와 매칭
  display: "swap",
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
  // Next.js 15에서는 cookies() 호출 시 await이 필요합니다.
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 서버 컴포넌트에서 쿠키를 설정하려고 할 때 발생하는 에러 무시
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    // html 태그에 Noto Sans 변수 클래스를 추가하여 하위 요소들이 변수를 인식하게 함
    <html lang="ko" className={notoSansKr.variable}>
      <body
        /* 1. font-sans: globals.css에서 정의한 Noto Sans가 1순위인 폰트 셋 적용
          2. antialiased: 글꼴 선명도 최적화
        */
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header initialUser={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
