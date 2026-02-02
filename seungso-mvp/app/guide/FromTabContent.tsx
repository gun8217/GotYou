"use client";
import Checkbox from "@/components/ui/Checkbox";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import UiSelect from "@/components/ui/UiSelect";
import React, { useState } from "react";

import Flex from "@/components/ui/Flex";
import Title from "@/components/ui/Title";

export default function Guide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [time, setTime] = useState("");
  const [rangeValue, setRangeValue] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [country, setCountry] = useState("kr");
  const [fruit, setFruit] = useState("apple");
  const [agree, setAgree] = useState(false);
  const [selected, setSelected] = useState("A");
  const [darkMode, setDarkMode] = useState(false);
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Flex direction="column" gap={8}>
        <Title text="Input" level={5} />
        <Flex direction="column" gap={8}>
          <Input
            type="text"
            value={email}
            placeholder="이메일 입력"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="email"
            value={email}
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="비밀번호 입력"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="number"
            value={age.toString()}
            min={0}
            max={120}
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Input
            type="range"
            value={rangeValue.toString()}
            min={0}
            max={100}
            step={10}
            onChange={(e) => setRangeValue(Number(e.target.value))}
          />
          <Input
            type="file"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files && target.files[0]) {
                setFile(target.files[0]);
              }
            }}
          />
          {file && <p>선택한 파일: {file.name}</p>}
          <Input
            type="textarea"
            value={bio}
            rows={5}
            placeholder="내용을 입력하세요"
            onChange={(e) => setBio(e.target.value)}
          />
        </Flex>

        <Flex justify="space-between">
          <Flex direction="column" gap={8}>
            <Title text="Select" level={5} />
            <Select
              label="국가 선택"
              options={[
                { label: "대한민국", value: "kr" },
                { label: "미국", value: "us" },
                { label: "일본", value: "jp" },
              ]}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Flex>
          <Flex direction="column" gap={8}>
            <Title text="UiSelect" level={5} />
            <UiSelect
              options={[
                { label: "사과", value: "apple" },
                { label: "바나나", value: "banana" },
                { label: "포도", value: "grape" },
              ]}
              value={fruit}
              onChange={setFruit}
            />
          </Flex>
        </Flex>

        <Title text="Checkbox" level={5} />
        <Checkbox
          label="약관에 동의합니다."
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <Title text="Radio" level={5} />
        <Radio
          label="옵션 A"
          name="example"
          value="A"
          checked={selected === "A"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="옵션 B"
          name="example"
          value="B"
          checked={selected === "B"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Title text="Switch" level={5} />
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          label="다크 모드 활성화"
        />
      </Flex>
    </Form>
  );
}
