"use client";

import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

export default function TermsPage() {
  return (
    <div className={styles.terms}>
      <Title level={2}>서비스 이용약관</Title>

      <section>
        <Title level={4}>제1조 (목적)</Title>
        <Text>
          본 약관은 승소환전소(이하 “플랫폼”)가 제공하는 서비스의 이용과
          관련하여 플랫폼과 이용자 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제2조 (서비스의 성격)</Title>
        <Text>
          본 서비스는 판결 이후 권리 실현(집행) 과정에서 발생하는 절차, 단계,
          선택지에 대한 정보를 구조화하여 제공하는 정보 제공 및 판단 보조
          서비스입니다.
          <br />
          플랫폼은 법률 판단을 하거나 강제집행을 직접 수행하지 않습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제3조 (회원가입)</Title>
        <Text>
          이용자는 플랫폼이 정한 가입 양식에 따라 이메일 및 비밀번호를 입력하고
          본 약관과 개인정보 수집·이용에 동의함으로써 회원가입을 신청합니다.
          <br />
          <br />
          본 플랫폼은 회원 가입 시 입력한 이메일 주소를 로그인 아이디로
          사용합니다.
          <br />
          이용자는 본인이 관리할 수 있고 기억할 수 있는 이메일 주소를 정확히
          입력해야 하며,
          <br />
          가입 시 사용한 이메일 주소를 분실하거나 기억하지 못하는 경우 플랫폼은
          이를 별도로 안내하거나 확인해 줄 의무를 지지 않습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제4조 (이용자의 책임)</Title>
        <Text>
          이용자는 본인의 판단과 책임 하에 서비스를 이용해야 하며, 집행 여부의
          결정 및 집행 실행에 대한 책임은 전적으로 이용자 본인에게 있습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제5조 (외부 전문가와의 관계)</Title>
        <Text>
          플랫폼은 법무사, 신용정보사 등 외부 전문가와 협력 구조를 가질 수
          있으나, 이는 선택적·비독점적 연계에 불과하며 플랫폼이 특정 전문가를
          지정하거나 수임을 강제하지 않습니다.
          <br />
          개별 사건에 대한 계약은 이용자와 해당 전문가 간에 직접 체결됩니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제6조 (성공 여부의 정의)</Title>
        <Text>
          플랫폼은 집행 결과의 성공 또는 실패를 판단하지 않으며, 외부 절차를
          통해 실제 금전이 이용자 계좌로 입금되었고, 그 사실이 증빙된 경우에만
          내부적으로 ‘회수 발생 상태’로 기록합니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제7조 (면책조항)</Title>
        <Text>
          플랫폼은 이용자가 제공한 정보의 정확성, 외부 집행 결과, 제3자의 행위로
          발생한 손해에 대하여 책임을 지지 않습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제8조 (서비스 이용 제한)</Title>
        <Text>
          플랫폼은 이용자가 본 약관을 위반하거나 관련 법령에 위반되는 행위를 한
          경우 서비스 이용을 제한할 수 있습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>제9조 (콘텐츠 저작권 및 기술 고지)</Title>
        <Text>
          1. 플랫폼에 게시된 모든 콘텐츠의 저작권은 &quot;플랫폼&quot;에
          귀속됩니다.
          <br />
          2. 본 서비스의 웹사이트 및 서비스 내 사용된 일부 이미지 및 디자인
          리소스는 생성형 AI(Generative AI) 기술을 활용하여 제작되었습니다.
          이러한 이미지들은 특정 인물의 초상권을 침해하지 않도록 생성되었으며,
          플랫폼의 고유한 시각적 정체성을 위해 사용됩니다.
        </Text>
      </section>

      <section>
        <Title level={4}>부칙</Title>
        <Text>본 약관은 2026년 2월 1일부터 시행합니다.</Text>
      </section>
    </div>
  );
}
