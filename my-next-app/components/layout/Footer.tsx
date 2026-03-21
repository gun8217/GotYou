"use client";

import { Box, Flex } from "@/components/common/LayoutElements";
import { clsx, type ClassValue } from "clsx";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    service: [
      { label: "집행 전략 가이드", href: "/strategy" },
      { label: "가성비 계산기", href: "/strategy/calculator" },
      { label: "법률 서식 자료실", href: "/customer/archive" },
    ],
    support: [
      { label: "공지사항", href: "/customer/notice" },
      { label: "자주 묻는 질문", href: "/customer/faq" },
      { label: "1:1 문의하기", href: "/customer/contact" },
    ],
  };

  return (
    // 배경색 #333에 맞춰 상단 테두리 농도 조절
    <footer className="bg-[#333] border-t border-white/10 pt-8 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* 1. 브랜드 섹션 */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              {/* 로고가 어두운 배경에서 안 보일 경우 brightness-0 invert 적용 고려 */}
              <div className="relative w-7 h-7 opacity-80 group-hover:opacity-100 transition-opacity brightness-0 invert">
                <Image
                  src="/images/logo.svg"
                  alt="집행나침반 로고"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-black text-white tracking-tighter">
                집행나침반
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-[240px]">
              채무자 데이터 분석 기반의 강제집행 실익 판단 솔루션. <br />
              당신의 정당한 권리를 가이드합니다.
            </p>
          </div>

          {/* 2. 서비스 링크 */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-widest mb-4">
              Service
            </h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. 고객 지원 */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-widest mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. 고객센터 정보 - 배경을 어두운 톤에 맞춰 반투명으로 변경 */}
          <div className="md:col-span-4">
            <Box
              className={cn("bg-white/5 border border-white/10 rounded-lg p-6")}
            >
              <h4 className="text-[11px] font-bold text-slate-300 mb-3 tracking-wider">
                CS CENTER
              </h4>
              <p className="text-2xl font-black text-blue-400 mb-1">
                1544-XXXX
              </p>
              <p className="text-[10px] text-slate-500 font-semibold mb-4">
                평일 10:00 - 18:00 (주말/공휴일 휴무)
              </p>
              <Flex
                gap={2}
                align="center"
                className="pt-4 border-t border-white/10"
              >
                <Mail size={14} className="text-slate-500" />
                <span className="text-[11px] text-slate-300 font-bold">
                  help@gotyounom.com
                </span>
              </Flex>
            </Box>
          </div>
        </div>

        {/* 구분선 색상 변경 */}
        <hr className="border-white/10 mb-10" />

        {/* 하단 정보 영역 */}
        <Flex
          justify="between"
          align="end"
          className="flex-col md:flex-row gap-8"
        >
          <div className="space-y-4">
            <Flex gap={4} className="text-[12px] font-bold">
              <Link
                href="/member/terms"
                className="text-slate-400 hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/member/privacy"
                className="text-white hover:underline underline-offset-4 transition-all"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/member/disclaimer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                면책고지
              </Link>
            </Flex>

            <div className="text-[10px] text-slate-500 font-medium leading-loose space-y-1">
              <p>상호명: 잡았다요놈 | 대표자: OOO | 사업자등록번호: 준비중</p>
              <p>
                문의 및 피드백:
                <Link
                  href="mailto:help@gotyou.com"
                  className="text-slate-400 hover:text-white ml-1 transition-colors"
                >
                  help@gotyou.com
                </Link>
                <span className="mx-2">|</span>
                주소: 서울특별시 OO구 ...
              </p>
              <p className="text-slate-600 font-bold mt-2 uppercase tracking-widest">
                © {currentYear} GOTYOU. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>

          {/* 인증 배지/아이콘 색상 변경 */}
          <Flex gap={4} className="pb-1">
            <div
              title="보안 인증"
              className="p-2 rounded border border-white/10 bg-white/5"
            >
              <ShieldCheck
                size={24}
                className="text-slate-500"
                strokeWidth={1.5}
              />
            </div>
            <div
              title="상담 대기"
              className="p-2 rounded border border-white/10 bg-white/5"
            >
              <MessageSquare
                size={24}
                className="text-slate-500"
                strokeWidth={1.5}
              />
            </div>
          </Flex>
        </Flex>
      </div>
    </footer>
  );
}
