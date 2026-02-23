import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

export const pageName = "승소환전소의 시작";

export default function AboutPage() {
  return (
    <Flex direction="column" gap={40} className="contentsPage">
      <Flex justify="center">
        <Title level={1}>승소환전소의 시작</Title>
      </Flex>

      <Card title="판결은 받았지만, 돈은 받지 못했습니다.">
        <Flex direction="column" gap={8}>
          <Text size="sm" color="secondary" as="p">
            승소환전소는 ‘승소하고도 돈을 받지 못한 경험’에서 시작되었습니다.
          </Text>
          <Text size="sm" color="secondary" as="p">
            법원에서 이겼다는 판결문을 손에 쥐었지만, 그 다음 단계는 아무도
            알려주지 않았습니다. 어디서부터 무엇을 해야 하는지, 얼마가 들고
            얼마나 걸리는지조차 알기 어려웠습니다.
          </Text>
        </Flex>
      </Card>

      <Card title="문제는 판결 이후">
        <Flex direction="column" gap={8}>
          <Text size="sm" color="secondary" as="p">
            계좌를 찾아야 했고, 법원 절차를 다시 밟아야 했고, 서류는 또다시
            복잡했습니다.
          </Text>
          <Text size="sm" color="secondary" as="p">
            정보는 흩어져 있었고, 경험이 없으면 실수하기 쉬운 구조였습니다.
          </Text>
          <Text as="p">
            승소에 들어간 많은 시간과 비용이 의미 없이 사라지는 것을 방치하면
            안됩니다.
          </Text>
        </Flex>
      </Card>

      <Card title="승소환전소는 이런 생각에서 만들어졌습니다.">
        <Flex direction="column" gap={8}>
          <Text size="sm" color="secondary" as="p">
            승소한 사람이 길을 헤매지 않도록
          </Text>
          <Text size="sm" color="secondary" as="p">
            절차를 몰라서 포기하지 않도록
          </Text>
          <Text size="sm" color="secondary" as="p">
            ‘판결’이 실제 ‘회수’로 이어지도록
          </Text>
          <Text as="p">
            승소 이후의 과정을 정리하고, 누구나 이해할 수 있게 설명하는 서비스
          </Text>
        </Flex>
      </Card>

      <Card title="승소환전소가 돕고 싶은 사람들">
        <Flex direction="column" gap={8}>
          <Text size="sm" color="secondary" as="p">
            판결은 받았지만 어떻게 돈을 받아야 할지 모르는 분
          </Text>
          <Text size="sm" color="secondary" as="p">
            강제집행 절차가 너무 어렵고 두려운 분
          </Text>
          <Text size="sm" color="secondary" as="p">
            혼자서 해보려다 어디서 막혔는지 모르는 분
          </Text>
          <Text as="p">
            법을 대신 싸워주는 서비스가 아니라, 회수까지 가는 길을 함께
            정리해주는 서비스
          </Text>
        </Flex>
      </Card>

      <Card title="승소는 끝이 아니라, 시작입니다.">
        <Flex direction="column" gap={8}>
          <Text size="sm" color="secondary" as="p">
            판결은 결과이지만, 회수는 또 다른 과정입니다.
          </Text>
          <Text size="sm" color="secondary" as="p">
            승소환전소는 그 사이의 공백을 줄이기 위해 만들어졌습니다.
          </Text>
          <Text as="p">승소를 ‘종이’가 아니라 ‘현실’로 바꾸는 것.</Text>
          <Text size="sm" color="secondary" as="p">
            그것이 승소환전소의 시작입니다.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
