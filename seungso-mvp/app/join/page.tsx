"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("회원가입 응답:", { data, error });

      if (error) {
        setMessage(`회원가입 실패: ${error.message}`);
        return;
      }

      if (data?.user) {
        setMessage(`회원가입 성공! 사용자 ID: ${data.user.id}`);
      } else {
        setMessage("회원가입은 되었지만 사용자 정보를 불러오지 못했습니다.");
      }
    } catch (err) {
      console.error("회원가입 중 예외 발생:", err);
      setMessage("예상치 못한 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} style={styles.form}>
      <h2 style={styles.title}>회원가입</h2>

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
        minLength={6}
        style={styles.input}
      />

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "가입 중..." : "가입하기"}
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    width: 320,
    margin: "0 auto",
    padding: 24,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
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
  message: {
    marginTop: 12,
    fontSize: 13,
    textAlign: "center",
    color: "#333",
  },
};
