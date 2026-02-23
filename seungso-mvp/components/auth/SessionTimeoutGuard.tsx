"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const IDLE_LIMIT = 10 * 60 * 1000; // 10분
const CHECK_INTERVAL = 30 * 1000; // 30초마다 검사
const LAST_ACTIVITY_KEY = "lastActivity";

export default function SessionTimeoutGuard() {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentPath = () =>
    window.location.pathname + window.location.search;

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    router.replace(
      `/member/login?reason=idle&redirect=${encodeURIComponent(
        getCurrentPath(),
      )}`,
    );
  }, [router]);

  const updateActivity = useCallback(() => {
    sessionStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  }, []);

  useEffect(() => {
    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => window.addEventListener(event, updateActivity));

    // 최초 활동 시간 세팅
    updateActivity();

    intervalRef.current = setInterval(() => {
      const last = parseInt(
        sessionStorage.getItem(LAST_ACTIVITY_KEY) || "0",
        10,
      );

      if (!last) {
        logout();
        return;
      }

      if (Date.now() - last > IDLE_LIMIT) {
        logout();
      }
    }, CHECK_INTERVAL);

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity),
      );
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [updateActivity, logout]);

  // 브라우저 종료 시 로그아웃 (보조책)
  useEffect(() => {
    const handleUnload = () => {
      supabase.auth.signOut();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return null;
}
