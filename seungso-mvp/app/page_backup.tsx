import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section id="hero">
        <div>
          <span>MVP • 집행 의사결정 지원 플랫폼</span>
          <h1>집행나침반</h1>
          <p>
            판결 이후 집행 단계의 비효율을 줄이고, 권리 실현 가능성을 높이는
            디지털 집행 지원 서비스
            <span>
              캠코(KAMCO) 표준 알고리즘과 디지털 흔적(OSINT)을 결합해 소액
              채권자의 합리적 선택을 돕습니다.
            </span>
          </p>
          <div>
            <a
              href="https://github.com/gun8217/MVP/tree/main/SocialVenture"
              target="_blank"
              rel="noreferrer"
            >
              저장소
            </a>
            <Link href="#overview">개요</Link>
            <Link href="#problem">문제 정의</Link>
            <Link href="#solution">해결 방안</Link>
            <Link href="#market">시장 분석</Link>
            <Link href="#service">서비스 로직</Link>
            <Link href="#roadmap">로드맵</Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview">
        <div>
          <h2>사업 개요</h2>
          <p>
            집행나침반는 국가기관(KAMCO)의 회수 예측 로직을 기반으로, 소액
            채권자가 집행 착수 여부를 데이터로 판단할 수 있도록 돕는 의사결정
            플랫폼입니다.
          </p>
        </div>
      </section>

      {/* Problem Definition */}
      <section id="problem">
        <div>
          <h2>문제 정의</h2>
          <ul>
            <li>채무자 재산 정보 접근성 부족 → 집행 실익 판단 어려움</li>
            <li>회수 가능성 낮은 사건에 비용 낭비</li>
            <li>실익 있는 사건을 포기하는 구조적 한계</li>
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section id="solution">
        <div>
          <h2>해결 방안 및 서비스 특징</h2>
          <p>
            판결문과 사건 정보를 분석해 집행 가능성·비용·기간 리포트를 제공하며,
            이용자의 합리적 판단을 돕습니다. 대행 이전 단계의
            <b> 지능형 판단 가이드</b> 역할에 집중합니다.
          </p>
          <ul>
            <li>캠코 표준 알고리즘 기반 신뢰성 확보</li>
            <li>디지털 흔적(OSINT) 데이터 축적 및 정밀화</li>
            <li>강화학습(RL) 기반 고정밀 예측 모델 구축</li>
          </ul>
        </div>
      </section>

      {/* Market */}
      <section id="market">
        <div>
          <h2>시장 및 수요 분석</h2>
          <p>
            매년 수십만 건 발생하는 민사 판결 중 집행 실익 판단의 어려움으로
            방치되는 &lsquo;권리 미실현 소액 사건(NPL)&lsquo; 시장을 타겟으로
            합니다.
          </p>
          <ul>
            <li>B2C: 개인 채권자 대상 AI 진단 리포트</li>
            <li>B2B: 금융사·렌탈사 대상 데이터 API</li>
            <li>B2G: 공공기관 대상 효율화 지원</li>
          </ul>
        </div>
      </section>

      {/* Service Logic */}
      <section id="service">
        <div>
          <h2>서비스 개요 및 구현 로직</h2>
          <ul>
            <li>Core: 캠코 회수 예측 알고리즘 디지털 이식</li>
            <li>Expansion: OSINT 기반 은닉 패턴 탐지</li>
            <li>Intelligence: RL 기반 맞춤형 회수 시나리오 추천</li>
          </ul>
          <p>
            주요 기능: 판결문 OCR 분석, 집행 실익 리포트, 지능형 대시보드,
            실시간 알림 및 절차 가이드
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap">
        <div>
          <h2>로드맵</h2>
          <ol>
            <li>
              <b>1단계 (시장 진입)</b>: MVP 개발 및 캠코 로직 검증
            </li>
            <li>
              <b>2단계 (고도화)</b>: OSINT 내재화 및 은닉 탐지 정밀화
            </li>
            <li>
              <b>3단계 (규모 확장)</b>: B2G/B2B API 서비스 및 글로벌 진출
            </li>
          </ol>
        </div>
      </section>

      <footer>
        <div>
          <p>
            면책 조항: 이 페이지는 MVP 단계의 실험적 프레임워크를 소개합니다.
            이는 실제 운영 시스템, 예측 엔진 또는 정책 결정 도구가 아닙니다.
          </p>
        </div>
      </footer>
    </main>
  );
}
