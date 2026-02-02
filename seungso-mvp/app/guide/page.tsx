"use client";

import Tabs from "@/components/ui/Tabs";
import BasicTabContent from "./BasicTabContent";
import FromTabContent from "./FromTabContent";
import UiTabContent from "./UiTabContent";

export default function Guide() {
  return (
    <>
      <Tabs
        tabs={[
          { label: "Basic", content: <BasicTabContent /> },
          { label: "Form", content: <FromTabContent /> },
          { label: "UI", content: <UiTabContent /> },
        ]}
      />
    </>
  );
}
