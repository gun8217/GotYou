"use client";

import { Input } from "@/components/common/FormElements";

interface SignupFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
}

export default function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
}: SignupFormProps) {
  return (
    <div className="space-y-5">
      <Input
        label="이메일 주소"
        type="email"
        placeholder="name@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="비밀번호"
        type="password"
        placeholder="8자 이상(대·소문자, 숫자 포함)의 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
