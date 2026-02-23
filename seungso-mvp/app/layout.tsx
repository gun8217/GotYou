import "@/app/globals.scss";
import { AuthProvider } from "@/components/auth/AuthContext";
import ClientLayout from "@/components/layout/ClientLayout";
import FontAwesomeConfig from "@/components/layout/FontAwesomeConfig";
import Header from "@/components/layout/Header";
import ThemeWrapper from "@/components/layout/ThemeWrapper";
import Flex from "@/components/ui/Flex";
import Text from "@/components/ui/Text";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { getMenuItems } from "@/lib/menu";
import Link from "next/link";

export const metadata = {
  title: {
    default: "승소환전소",
    template: "%s | 승소환전소",
  },
  description: "승소환전소에 오신 것을 환영합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = getMenuItems();

  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <FontAwesomeConfig />
      </head>
      <body>
        <AuthProvider>
          <ThemeWrapper>
            <ToastProvider>
              <ClientLayout>
                <Header menu={menu} />
                <main>{children}</main>
                <footer>
                  <Text size="xs" color="info" as="p">
                    Copyright ⓒ 2026 승소환전소.
                  </Text>
                  <Flex justify="center" className="footMenu">
                    <Link href="/member/terms?tab=terms">이용약관</Link>
                    <Link href="/member/terms?tab=privacy">
                      개인정보처리방침
                    </Link>
                  </Flex>
                </footer>
              </ClientLayout>
            </ToastProvider>
          </ThemeWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
