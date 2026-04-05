import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스들을 조건부로 결합하고
 * 중복되거나 충돌하는 클래스를 자동으로 정리해주는 유틸리티 함수입니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
