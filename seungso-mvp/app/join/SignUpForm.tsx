"use client";

import { supabase } from "@/lib/supabase/client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./page.module.scss";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      setMessage("약관과 개인정보 수집 동의가 필요합니다.");
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
    <form onSubmit={handleSignUp} className={styles.signupForm}>
      <h2>회원가입</h2>

      {/* 이메일 입력 */}
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="signup-input"
      />

      {/* 비밀번호 입력 */}
      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className={`password-input ${showPassword ? "isShow" : ""}`}
        />
        <span
          className="eye-icon"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      </div>

      {/* 비밀번호 확인 */}
      <div className="password-wrapper">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          className={`password-input ${showConfirmPassword ? "isShow" : ""}`}
        />
        <span
          className="eye-icon"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </span>
      </div>

      {/* 약관/개인정보 동의 */}
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          서비스 약관에 동의합니다.
        </label>
        <label>
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)}
          />
          개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>

      {/* 가입 버튼 */}
      <button type="submit" disabled={loading} className="signup-button">
        {loading ? "가입 중..." : "가입하기"}
      </button>

      {message && <p className="signup-message">{message}</p>}
    </form>
  );
}
