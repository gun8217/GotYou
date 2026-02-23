import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Tabs from "@/components/ui/Tabs";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

export const pageName = "강제집행 안내";

export default function AboutPage() {
  return (
    <Flex direction="column" gap={32} className="contentsPage">
      <Flex justify="center">
        <Title level={1}>강제집행 안내</Title>
      </Flex>

      <Card title="강제집행이란?">
        <Flex direction="column" gap={8}>
          <Text size="sm" color="secondary" as="p">
            승소 판결을 받고도 돈을 받지 못했을 때 채무자의 계좌나 재산을 법원을
            통해 압류하여 돌려받는 절차.
          </Text>
          <Flex align="center" gap={6}>
            <Text size="sm" color="secondary" as="b">
              계좌 조회는 반드시 법원 절차 필요.
            </Text>
            <Text color="error" size="sm" as="p">
              (판결문만 가지고 바로 조회 불가)
            </Text>
          </Flex>
        </Flex>
      </Card>

      <Tabs
        tabs={[
          {
            label: "개인",
            content: (
              <Flex direction="column" gap={24}>
                <Card variant="noHeader">
                  <Text weight="bold" color="secondary" as="p">
                    ❗비용은 적게 들지만, 법원 신청과 서류 준비를 전부 직접
                    진행.
                  </Text>
                </Card>

                <Flex direction="column" gap={8}>
                  <Title level={2}>1. 판결문 준비</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    승소 판결문과 판결이 확정되었음을 증명하는 확정증명원을
                    준비합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>
                    2. 법원에 재산조회(또는 재산명시) 신청
                  </Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    채무자의 계좌를 알기 위해 법원에 재산조회신청 또는
                    재산명시신청을 합니다.
                    <br />
                    법원의 허가가 있어야 계좌 조회가 가능합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>3. 신용정보사를 통해 계좌 조회</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    법원의 결정문을 근거로 신용정보사에 조회를 의뢰합니다.
                    <br />
                    채무자가 사용 중인 금융기관(은행)을 확인합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>4. 압류 및 추심명령 신청</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    확인한 은행을 대상으로 법원에 압류 및 추심명령을 신청합니다.
                    <br />
                    인지액과 송달료가 발생합니다.
                    <br />
                    보통 1~2주 정도 소요됩니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>5. 금융기관 송달 및 계좌 동결</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    법원이 은행에 압류 명령을 송달하면 해당 계좌는 출금이
                    제한됩니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>6. 돈 받기(추심)</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    압류된 계좌에서 채권을 회수합니다.
                    <br />
                    절차에 든 비용은 채권자가 먼저 내지만, 최종적으로는 채무자가
                    부담합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>⏱ 소요 기간 & 특징</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    전체 기간: 약 2~4주
                    <br />
                    장점: 비용이 적게 듦<br />
                    단점: 절차가 복잡하고 실수 위험 있음
                  </Text>
                </Flex>
              </Flex>
            ),
          },
          {
            label: "법무사",
            content: (
              <Flex direction="column" gap={24}>
                <Card variant="noHeader">
                  <Text weight="bold" color="secondary" as="p">
                    ❗계좌 조회는 직접 하고, 법원 절차와 서류는 법무사가 대신
                    처리.
                  </Text>
                </Card>

                <Flex direction="column" gap={8}>
                  <Title level={2}>1. 판결문 준비</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    승소 판결문과 확정증명원을 준비합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>2. 법원에 재산조회 신청 (본인 진행)</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    채권자가 직접 법원에 재산조회(또는 재산명시)를 신청합니다.
                    <br />
                    계좌 조회에 필요한 법원의 허가를 받습니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>
                    3. 신용정보사를 통해 계좌 조회 (본인 진행)
                  </Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    법원의 결정문을 근거로 신용정보사에 조회를 의뢰합니다.
                    <br />
                    채무자의 금융기관 정보를 확보합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>4. 법무사에게 사건 위임</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    판결문, 확정증명원, 계좌 조회 결과를 법무사에게 전달합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>5. 압류 및 추심명령 신청 대리</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    법무사가 압류·추심명령 신청서를 대신 작성하고 법원에
                    제출합니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>6. 금융기관 송달 및 계좌 동결</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    법원이 은행에 압류 명령을 송달하고 계좌가 동결됩니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>7. 돈 받기(추심)</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    압류된 계좌에서 채권을 회수합니다.
                    <br />
                    비용은 먼저 내지만, 최종 부담은 채무자에게 돌아갑니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={8}>
                  <Title level={2}>⏱ 소요 기간 & 특징</Title>
                  <Text
                    size="md"
                    color="secondary"
                    as="p"
                    style={{ paddingLeft: "20px" }}
                  >
                    전체 기간: 약 2~4주
                    <br />
                    장점: 서류 오류·절차 실수 위험 적음
                    <br />
                    단점: 법무사 수임료 추가 발생
                  </Text>
                </Flex>
              </Flex>
            ),
          },
        ]}
      />
    </Flex>
  );
}
