"use client";

// import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Spinner from "@/components/ui/Spinner";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

export default function Guide() {
  return (
    <>
      <Title text="Title" level={5} />
      <Flex gap={16}>
        <Title text="기본 (H1)" />
        <Title text="H2" level={2} />
        <Title text="H3" level={3} />
        <Title text="H4" level={4} />
        <Title text="H5" level={5} />
        <Title text="H6" level={6} />
        <Title text="Primary" level={5} type="primary" />
        <Title text="Secondary" level={5} type="secondary" />
        <Title text="Highlight" level={5} type="highlight" />
      </Flex>

      <Title text="Text" level={5} />
      <Flex gap={16}>
        <Text>기본(size=&quot;md&quot;)</Text>
        <Text size="lg">size=&quot;lg&quot;</Text>
        <Text size="sm">size=&quot;sm&quot;</Text>

        <Text weight="bold" as="div">
          weight=&quot;bold&quot; as=&quot;div&quot;
        </Text>
        <Text weight="light" as="span">
          weight=&quot;light&quot; as=&quot;span&quot;
        </Text>
      </Flex>
      <Flex gap={16}>
        <Text color="primary">color=&quot;primary&quot;</Text>
        <Text color="secondary">color=&quot;secondary&quot;</Text>
        <Text color="info">color=&quot;info&quot;</Text>
        <Text color="error">color=&quot;error&quot;</Text>
      </Flex>

      <Title text="Badge" level={5} />
      <Badge text="Default" />
      <Badge text="Success" color="success" />
      <Badge text="Error" color="error" />

      <Title text="Button" level={5} />
      <Flex direction="column" gap={8}>
        <Flex align="flex-start" gap={8}>
          <Button size="sm">size=&quot;sm&quot;</Button>
          <Button>md(Default)</Button>
          <Button size="lg">size=&quot;lg&quot;</Button>
        </Flex>
        <Flex gap={8}>
          <Button styleType="primary">styleType=&quot;primary&quot;</Button>
          <Button styleType="secondary">styleType=&quot;secondary&quot;</Button>
          <Button styleType="animate">styleType=&quot;animate&quot;</Button>
          <Button styleType="error">styleType=&quot;error&quot;</Button>
        </Flex>
        <Flex gap={8}>
          <Button type="submit">type=&quot;submit&quot;</Button>
          <Button type="reset">type=&quot;reset&quot;</Button>
          <Button disabled>disabled</Button>
          <Button onClick={() => alert("Clicked!")}>Click Me</Button>
        </Flex>
        <Button fullWidth>Full Width</Button>
      </Flex>

      <Title text="Icon" level={5} />
      <Flex gap={8} wrap="wrap">
        <Icon icon="arrow-right-from-bracket" />
        <Icon icon="bars" />
        <Icon icon="check-circle" />
        <Icon icon="coffee" />
        <Icon icon="user" />
        <Icon icon="user-check" />
        <Icon icon="user-plus" />
        <Icon icon="times" />
        <Icon icon="arrow-right" />
        <Icon icon="chevron-right" />
        <Icon icon="eye" />
        <Icon icon="eye-slash" />
        <Icon icon="compass" />
        <Icon icon="hand-pointer" />
      </Flex>

      <Title text="Spinner" level={5} />
      <Spinner />

      {/* <Title text="Avatar" level={5} />
      <Avatar src="/avatar.png" size={60} alt="사용자" /> */}
    </>
  );
}
