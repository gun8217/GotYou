"use client";

import Flex from "@/components/ui/Flex";
import Spinner from "@/components/ui/Spinner";
import Text from "@/components/ui/Text";

export default function Loading() {
  return (
    <div className="loadingSpinner">
      <Flex direction="column" className="inner" gap={50}>
        <Spinner />
        <Text color="info" size="xs">
          로딩 중...
        </Text>
      </Flex>
    </div>
  );
}
