import "@/app/globals.scss";
import FontAwesomeConfig from "@/components/layout/FontAwesomeConfig";
import Header from "@/components/layout/Header";
import ThemeWrapper from "@/components/layout/ThemeWrapper";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { getMenuItems } from "@/lib/menu";

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
        <ThemeWrapper>
          <ToastProvider>
            <Header menu={menu} />
            <main>{children}</main>
            <footer>Copyright ⓒ 2026 승소환전소.</footer>
          </ToastProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
