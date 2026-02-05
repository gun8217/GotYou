"use client";

import SessionTimeoutGuard from "@/components/auth/SessionTimeoutGuard";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/member/login" ||
    pathname === "/member/signup" ||
    pathname === "/member/forgot-password";

  return (
    <>
      {!isAuthPage && <SessionTimeoutGuard />}
      {children}
    </>
  );
}
