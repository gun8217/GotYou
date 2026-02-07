import Link from "next/link";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside>
        <Link href="/service/expenses">비용</Link>
        <Link href="/service/credit-info">정보</Link>
      </aside>
      <main>{children}</main>
    </div>
  );
}
