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
  const [country, setCountry] = useState("");
  const [selectItem, setSelectItem] = useState("");
  const [agree, setAgree] = useState(false);
  const [selected, setSelected] = useState("A");
  const [darkMode, setDarkMode] = useState(false);
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Flex direction="column" gap={32}>
        <Flex direction="column" gap={8}>
          <Title text="Input" />
          <Flex direction="column" gap={8}>
            <Input
              type="text"
              autoComplete="new-password"
              placeholder="입력하세요."
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="email"
              autoComplete="new-password"
              value={email}
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              autoComplete="new-password"
              value={password}
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="number"
              value={age.toString()}
              min={0}
              max={120}
              placeholder="숫자를 입력하세요."
              onChange={(e) => setAge(Number(e.target.value))}
            />
            <Input
              type="date"
              value={birthDate}
              placeholder="날짜를 입력하세요."
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <Input
              type="time"
              value={time}
              placeholder="시간을 입력하세요."
              onChange={(e) => setTime(e.target.value)}
            />
            <Input
              type="range"
              value={rangeValue.toString()}
              min={0}
              max={100}
              step={10}
              placeholder="범위를 선택하세요."
              onChange={(e) => setRangeValue(Number(e.target.value))}
            />
            <Input
              type="file"
              placeholder="파일을 선택하세요."
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
              placeholder="내용을 입력하세요."
              onChange={(e) => setBio(e.target.value)}
            />
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Flex direction="column" gap={8}>
            <Title text="Select" />
            <Select
              label="국가를 선택하세요."
              options={[
                { label: "대한민국", value: "kr" },
                { label: "미국", value: "us" },
                { label: "일본", value: "jp" },
              ]}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Flex>

          <Flex direction="column" gap={8} style={{ width: "50%" }}>
            <Title text="UiSelect" />
            <UiSelect
              options={[
                { label: "UiSelect1", value: "1" },
                { label: "UiSelect2", value: "2" },
                { label: "UiSelect3", value: "3" },
              ]}
              value={selectItem}
              onChange={setSelectItem}
            />
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Flex direction="column" gap={8}>
            <Title text="Checkbox" />
            <Checkbox
              label="약관에 동의합니다."
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
          </Flex>

          <Flex direction="column" gap={8} style={{ width: "50%" }}>
            <Title text="Switch" />
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              label="다크 모드 활성화"
            />
          </Flex>
        </Flex>

        <Flex direction="column" gap={8}>
          <Title text="Radio" />
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
        </Flex>
      </Flex>
    </Form>
  );
}
