export const pageName = "서비스 안내";

export default function ServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">서비스 안내</h1>

      <div className="mb-8 rounded-md border border-gray-200 bg-gray-50 p-5 text-sm leading-relaxed">
        <p className="font-semibold mb-2">
          본 페이지는 본 플랫폼이 제공하는 기능의 범위와 역할에 대해 안내하기
          위한 정보 페이지입니다.
        </p>
        <p>
          본 플랫폼은 법률 행위나 강제집행을 대행하지 않으며, 집행 과정에서
          필요한 정보와 기록을 정리·관리할 수 있도록 돕는 도구를 제공합니다.
        </p>
      </div>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">제공되는 주요 안내</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed">
          <li>집행 비용 기록 기능 안내</li>
          <li>신용정보 조회 단계에 대한 설명</li>
          <li>사건 진행 과정에서 필요한 정보 정리</li>
        </ul>
      </section>

      <section className="text-sm leading-relaxed">
        <p>
          각 단계별 안내 페이지는 실제 집행 절차를 대신하지 않으며, 사용자가
          상황을 정리하고 다음 판단을 준비하는 데 도움을 주기 위한 정보 제공을
          목적으로 합니다.
        </p>
      </section>
    </main>
  );
}
