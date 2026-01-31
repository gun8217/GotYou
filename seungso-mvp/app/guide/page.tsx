"use client";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import UiSelect from "@/components/ui/UiSelect";
import React, { useState } from "react";

export default function Guide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("kr");
  const [fruit, setFruit] = useState("apple");
  const [agree, setAgree] = useState(false);
  const [selected, setSelected] = useState("A");
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("폼 제출 데이터:", {
      email,
      password,
      country,
      agree,
      selected,
      darkMode,
    });
    alert("폼이 제출되었습니다!");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

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

      <UiSelect
        options={[
          { label: "사과", value: "apple" },
          { label: "바나나", value: "banana" },
          { label: "포도", value: "grape" },
        ]}
        value={fruit}
        onChange={setFruit}
      />

      <Checkbox
        label="약관에 동의합니다."
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />

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

      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        label="다크 모드 활성화"
      />

      <Button label="가입하기" type="primary" />
    </Form>
  );
}
