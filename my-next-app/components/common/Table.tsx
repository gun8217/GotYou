export function Table({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-[24px] border border-slate-100">
      <table className={`w-full text-left text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-slate-50 text-xs font-black uppercase text-slate-400 border-b border-slate-100">
      {children}
    </thead>
  );
}

export function TBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-slate-50 bg-white">{children}</tbody>
  );
}

export function TR({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={`${onClick ? "cursor-pointer hover:bg-slate-50/50" : ""} transition-colors`}
    >
      {children}
    </tr>
  );
}

export function TD({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-5 font-bold text-slate-600 ${className}`}>
      {children}
    </td>
  );
}

export function TH({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-4 font-black">{children}</th>;
}
