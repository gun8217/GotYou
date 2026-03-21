"use client";

import { Button } from "@/components/common/LayoutElements";

interface SignupFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  disabled: boolean;
}

export default function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  disabled,
}: SignupFormProps) {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
          이메일 주소
        </label>
        <input
          type="email"
          required
          className="w-full border border-slate-200 bg-white px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-0 rounded-none placeholder:text-slate-300"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
          비밀번호
        </label>
        <input
          type="password"
          required
          minLength={6}
          className="w-full border border-slate-200 bg-white px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-0 rounded-none placeholder:text-slate-300"
          placeholder="6자 이상의 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-4 mt-2 text-sm font-bold uppercase tracking-widest shadow-lg shadow-blue-100"
        disabled={loading || disabled}
      >
        {loading ? "Processing..." : "Create Account"}
      </Button>
    </form>
  );
}
