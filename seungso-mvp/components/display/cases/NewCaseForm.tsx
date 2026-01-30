"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

export default function NewCaseForm() {
  const [claimAmount, setClaimAmount] = useState("");
  const [debtorType, setDebtorType] = useState("individual");

  const submit = async () => {
    await supabase.from("cases").insert({
      claim_amount: claimAmount,
      debtor_type: debtorType,
    });
  };

  return (
    <div>
      <input
        placeholder="청구 금액"
        value={claimAmount}
        onChange={(e) => setClaimAmount(e.target.value)}
      />

      <select
        value={debtorType}
        onChange={(e) => setDebtorType(e.target.value)}
      >
        <option value="individual">개인</option>
        <option value="corporation">법인</option>
      </select>

      <button onClick={submit}>등록</button>
    </div>
  );
}
