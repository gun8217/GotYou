"use client";

interface SignupFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  disabled: boolean; // 약관 동의 여부에 따라 버튼 활성화 제어
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
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div className="space-y-4">
        {/* 이메일 입력 섹션 */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase ml-1">
            이메일 주소
          </label>
          <input
            type="email"
            required
            className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all sm:text-sm"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 비밀번호 입력 섹션 */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase ml-1">
            비밀번호
          </label>
          <input
            type="password"
            required
            minLength={6}
            className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all sm:text-sm"
            placeholder="6자 이상 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* 가입 버튼 */}
      <button
        type="submit"
        disabled={loading || disabled}
        className="w-full rounded-[20px] bg-slate-900 py-4 px-4 text-sm font-black text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-100 active:scale-[0.98]"
      >
        {loading ? "가입 처리 중..." : "동의하고 가입하기"}
      </button>
    </form>
  );
}
