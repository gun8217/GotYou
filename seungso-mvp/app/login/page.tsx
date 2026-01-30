"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// 실제 로그인 폼 로직을 별도 컴포넌트로 분리
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    /* 정석 코드
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("로그인 실패: " + error.message);
        return;
    }

    // 정석: 성공 시 data에 들어있는 유저 정보를 활용함
    console.log("환영합니다!", data.user.email); 
    // 이후 메인 화면으로 이동
    router.push("/cases");*/

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/cases");
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h1 style={styles.title}>로그인</h1>

      {reason === "idle" && (
        <p style={styles.info}>
          10분 동안 활동이 없어 보안을 위해 자동 로그아웃되었습니다.
        </p>
      )}

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}

// 2. 메인 페이지 컴포넌트에서 LoginForm을 Suspense로 감싸기
export default function LoginPage() {
  return (
    <div style={styles.container}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  form: {
    width: 360,
    padding: 32,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  info: {
    color: "#555",
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 1.4,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 4,
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 12,
    fontSize: 13,
    textAlign: "center",
  },
};
