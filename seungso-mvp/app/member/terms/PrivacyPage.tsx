"use client";

import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

export default function PrivacyPage() {
  return (
    <div className={styles.terms}>
      <Title level={2}>개인정보 수집 및 이용 안내</Title>

      <section>
        <Title level={4}>1. 수집하는 개인정보 항목</Title>
        <Text>
          플랫폼은 회원가입 및 서비스 제공을 위해 다음의 개인정보를 수집합니다.
          <br />
          • 이메일 주소
          <br />
          • 비밀번호(암호화 저장)
          <br />• 서비스 이용 과정에서 생성되는 사건 정보
        </Text>
      </section>

      <section>
        <Title level={4}>2. 개인정보 수집 목적</Title>
        <Text>
          수집된 개인정보는 다음 목적에 한하여 이용됩니다.
          <br />
          • 회원 식별 및 인증
          <br />
          • 로그인 아이디로서의 계정 관리
          <br />
          • 사건 정보 관리 및 서비스 제공
          <br />
          • 서비스 개선 및 운영 관리
          <br />
          <br />
          이메일 주소는 본인 식별 및 로그인을 위한 아이디로 사용되며, 가입 시
          입력한 이메일 주소를 분실하거나 기억하지 못하는 경우 플랫폼은 이를
          별도로 안내하거나 확인해 드리지 않습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>3. 개인정보 보관 기간</Title>
        <Text>
          이용자의 개인정보는 회원 탈퇴 시까지 보관하며, 관계 법령에 따라 보존할
          필요가 있는 경우 해당 기간 동안 보관합니다.
        </Text>
      </section>

      <section>
        <Title level={4}>4. 개인정보의 제3자 제공</Title>
        <Text>
          플랫폼은 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
          다만, 이용자가 외부 전문가(법무사 등)와의 연결을 선택한 경우, 해당
          업무 수행을 위해 필요한 최소한의 정보만 전달될 수 있습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>5. 이용자의 권리</Title>
        <Text>
          이용자는 언제든지 본인의 개인정보를 조회, 수정, 삭제할 수 있으며, 회원
          탈퇴를 통해 개인정보 이용을 중단할 수 있습니다.
        </Text>
      </section>

      <section>
        <Title level={4}>6. 개인정보 보호를 위한 조치</Title>
        <Text>
          플랫폼은 Supabase 인증 시스템과 데이터 접근 제어(RLS)를 활용하여
          이용자의 개인정보와 사건 데이터를 본인만 접근 가능하도록 관리합니다.
        </Text>
      </section>

      <section>
        <Title level={4}>7. 고지 의무</Title>
        <Text>
          본 개인정보 수집 및 이용 안내 내용이 변경될 경우, 플랫폼은 서비스
          화면을 통해 사전에 고지합니다.
        </Text>
      </section>

      <section>
        <Title level={4}>부칙</Title>
        <Text>본 안내는 2026년 2월 1일부터 적용됩니다.</Text>
      </section>
    </div>
  );
}
