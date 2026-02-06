export const pageName = "신용정보 조회 안내";

export default function CreditInfoServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">신용정보 조회 안내</h1>

      <div className="mb-8 rounded-md border border-gray-200 bg-gray-50 p-5 text-sm leading-relaxed">
        <p className="font-semibold mb-2">
          본 페이지는 신용정보 조회 단계에 대한 일반적인 안내를 제공하기 위한
          정보 페이지입니다.
        </p>
        <p>
          본 플랫폼은 신용정보를 직접 조회하거나 조회를 대행하지 않으며, 조회
          결과를 판단하거나 법적 효력을 부여하지 않습니다.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          신용정보 조회가 필요한 이유
        </h2>
        <p className="text-sm leading-relaxed">
          판결문이 존재하더라도, 실제 강제집행을 위해서는 채무자의 현재 정보가
          필요한 경우가 많습니다.
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          신용정보 조회는 집행 가능성을 판단하기 위한 참고 자료로 사용되며,
          집행을 보장하거나 결과를 예측하기 위한 수단은 아닙니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">조회 주체에 대한 안내</h2>
        <p className="text-sm leading-relaxed">
          신용정보 조회는 정보주체 본인 또는 적법한 권한을 가진 자만 수행할 수
          있습니다.
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          본 플랫폼은 신용정보 조회를 요청·대행·중개하지 않으며, 사용자가 직접
          조회한 결과를 기록·보관할 수 있는 공간만 제공합니다.
        </p>
      </section>

      <section className="rounded-md border border-gray-200 p-5 text-sm leading-relaxed">
        <p className="font-semibold mb-2">유의 사항</p>
        <p>
          신용정보 조회는 관련 법령 및 각 신용정보회사의 기준에 따라 제한될 수
          있습니다. 본 플랫폼은 조회 가능 여부나 조회 결과에 대한 책임을
          부담하지 않습니다.
        </p>
      </section>
    </main>
  );
}
