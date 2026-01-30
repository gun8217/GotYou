import ExecutionChart from "@/components/display/ExecutionChart";
import Button from "@/components/ui/Button";
import { fetchYearlyStats } from "@/types/stats"; // 1. 임포트 추가
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import styles from "./page.module.scss";

config.autoAddCss = false;

export default async function HomePage() {
  // rawData가 필요 없다면 제거하여 경고 해결
  const { labels, counts } = await fetchYearlyStats();

  const {
    pageMain,
    titBox,
    dataCon,
    graph,
    dataTxt,
    cardList,
    item1,
    item2,
    item3,
  } = styles;

  return (
    <>
      <main className={pageMain}>
        <div className={titBox}>
          <strong>
            소액 채권자의 <span>합리적 선택</span>을 돕는 <span>나침반</span>
          </strong>
          <p>
            종이 한 장으로 남은 승소 판결문, 소멸시효가 지나기 전에 데이터로
            가치를 증명하세요.
          </p>
          <Button type="animate" label="판결문 등록하기" />
        </div>

        {/* 데이터 검증 영역 */}
        <div className={dataCon}>
          <div className={dataTxt}>
            <b>
              2015년 이후 집행 건수 <span>65% 감소</span>
            </b>
            <p>
              실제 판결 대비 집행 비율은 매년 감소하고 있습니다.
              <br />
              우리는 이 격차를 데이터로 분석합니다.
            </p>
          </div>
          <div className={graph}>
            <div>
              <ExecutionChart labels={labels} counts={counts} />
            </div>
            <span>*출처: 사법연감(&rsquo;14-&rsquo;19)</span>
          </div>
        </div>

        <div className={cardList}>
          <ul>
            <li className={item1}>
              <b>판결문 데이터화</b>
              <ul>
                <li>종이 판결문 등록</li>
                <li>소멸시효·집행 가능성 자동 분석</li>
              </ul>
            </li>
            <li className={item2}>
              <b>유사 사례 찾기</b>
              <ul>
                <li>등록된 채권 데이터 비교</li>
                <li>다른 채권자의 회수 절차 확인</li>
              </ul>
            </li>
            <li className={item3}>
              <b>채권 지도 만들기</b>
              <ul>
                <li>정보 공유로 은닉 자산 탐색</li>
                <li>데이터로 회수 확률 강화</li>
              </ul>
            </li>
          </ul>
        </div>
      </main>
      <footer>본 사이트 이미지는 AI로 생성되었습니다.</footer>
    </>
  );
}
