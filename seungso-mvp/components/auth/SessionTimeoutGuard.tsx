"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const IDLE_LIMIT = 10 * 60 * 1000;
const LAST_ACTIVITY_KEY = "lastActivity";

export default function SessionTimeoutGuard() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentPath = () =>
    window.location.pathname + window.location.search;

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace(
      `/member/login?reason=idle&redirect=${encodeURIComponent(getCurrentPath())}`,
    );
  }, [router]);

  const resetTimer = useCallback(() => {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const last = parseInt(localStorage.getItem(LAST_ACTIVITY_KEY) || "0", 10);
      if (Date.now() - last >= IDLE_LIMIT) {
        logout();
      }
    }, IDLE_LIMIT);
  }, [logout]);

  useEffect(() => {
    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    const handleStorage = (e: StorageEvent) => {
      if (e.key === LAST_ACTIVITY_KEY) {
        resetTimer();
      }
    };
    window.addEventListener("storage", handleStorage);

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      window.removeEventListener("storage", handleStorage);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  return null;
}
