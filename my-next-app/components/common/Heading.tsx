interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

// 모달용 제목
export function ModalTitle({ children, className = "" }: HeadingProps) {
  return (
    <h3
      className={`text-lg font-black text-slate-900 leading-tight ${className}`}
    >
      {children}
    </h3>
  );
}

// ✅ 섹션/카드용 제목 추가
export function SectionTitle({ children, className = "" }: HeadingProps) {
  return (
    <h4
      className={`text-xl font-black text-slate-900 tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
}

// 나중에 페이지 큰 제목이 필요하면 여기에 추가
export function PageTitle({ children, className = "" }: HeadingProps) {
  return (
    <h1
      className={`text-3xl font-black text-slate-900 tracking-tight ${className}`}
    >
      {children}
    </h1>
  );
}
