export const pageName = "집행 비용 기록 안내";

export default function ExpensesServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-gray-900">
      {/* 페이지 제목 */}
      <h1 className="text-2xl font-bold mb-4">집행 비용 기록 안내</h1>

      {/* 상단 요약 */}
      <div className="mb-8 rounded-md border border-gray-200 bg-gray-50 p-5 text-sm leading-relaxed">
        <p className="font-semibold mb-2">
          이 페이지는 집행 과정에서 발생한 비용을 기록·보관하는 기능에 대한 안내
          페이지입니다.
        </p>
        <p>
          본 플랫폼은 비용의 청구 가능 여부나 법적 인정 여부를 판단하지 않으며,
          집행 과정에서 발생한 비용을 사건 단위로 모아둘 수 있는 기록 공간만
          제공합니다.
        </p>
      </div>

      {/* 왜 기록하나요 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">왜 비용을 기록하나요?</h2>
        <p className="text-sm leading-relaxed">
          강제집행 과정은 길고 복잡하며, 소액의 비용도 여러 번 발생합니다.
          시간이 지나면 어떤 비용을 언제 사용했는지 기억하기 어려워질 수
          있습니다.
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          이 기능은 집행과 관련하여 지출한 비용을 잊지 않도록 사건 단위로
          보관하고 정리할 수 있도록 돕기 위한 목적의 기록 기능입니다.
        </p>
      </section>

      {/* 기록 가능한 비용 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          어떤 비용을 기록할 수 있나요?
        </h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed">
          <li>법원 인지대 및 송달료</li>
          <li>강제집행 신청 관련 비용</li>
          <li>법무사·집행 관련 수수료</li>
          <li>신용정보 조회 비용</li>
          <li>교통비, 출력비, 우편 비용 등 부대비용</li>
          <li>그 외 집행과 관련하여 발생한 지출</li>
        </ul>
        <p className="mt-2 text-xs text-gray-600">
          ※ 비용의 종류와 관계없이 기록할 수 있습니다.
        </p>
      </section>

      {/* 인정 가능성 안내 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          비용 인정 가능성에 대한 안내
        </h2>
        <p className="text-sm leading-relaxed">
          일부 비용은 집행 절차에서 필요비용으로 인정되는 경우가 있으나, 모든
          비용이 자동으로 인정되거나 회수되는 것은 아닙니다.
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          특히 교통비, 조사 비용, 개인 소요비용 등은 사건의 경과와 판단에 따라
          인정 여부가 달라질 수 있습니다.
        </p>
      </section>

      {/* 플랫폼 역할 고지 */}
      <section className="rounded-md border border-gray-200 p-5 text-sm leading-relaxed">
        <p className="font-semibold mb-2">플랫폼의 역할</p>
        <p>
          본 플랫폼은 집행 비용의 법적 성격이나 청구 가능성을 판단하거나
          보장하지 않습니다. 사용자가 집행 과정에서 발생한 비용을 잊지 않도록
          기록하고 사건 단위로 정리할 수 있도록 보관 공간을 제공하는 역할만
          수행합니다.
        </p>
      </section>
    </main>
  );
}
