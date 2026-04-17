"use client";

import {
  Badge,
  Box,
  Table,
  TBody,
  TD,
  TR,
} from "@/components/common/LayoutElements";
import { Contact } from "@/type/contact";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface Props {
  initialContacts: Contact[];
}

export default function ContactListClient({ initialContacts }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Table>
      <TBody>
        {initialContacts.map((item: Contact) => {
          const isOpen = openId === item.id;
          return (
            <React.Fragment key={item.id}>
              <TR
                onClick={() => toggleAccordion(item.id)}
                className={`cursor-pointer transition-colors ${
                  isOpen ? "bg-slate-100/50" : "hover:bg-slate-50"
                }`}
              >
                <TD className="text-center w-24">
                  <Badge
                    variant={item.status === "답변완료" ? "green" : "slate"}
                  >
                    {item.status}
                  </Badge>
                </TD>
                <TD className="font-bold">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
                      {item.category}
                    </span>
                    <span
                      className={isOpen ? "text-blue-600" : "text-slate-700"}
                    >
                      {item.title}
                    </span>
                  </div>
                </TD>
                <TD className="text-right text-slate-400 text-xs w-32">
                  {new Date(item.created_at).toLocaleDateString()}
                </TD>
                <TD className="w-10 text-center">
                  <ChevronDown
                    className={`w-4 h-4 text-slate-300 transition-transform ${
                      isOpen ? "rotate-180 text-blue-500" : ""
                    }`}
                  />
                </TD>
              </TR>

              {isOpen && (
                <TR>
                  <td colSpan={4} className="p-0 border-b border-slate-100">
                    <Box className="bg-slate-50/30 p-6 rounded-none border-0 shadow-none">
                      <div className="mb-6">
                        <span className="text-[11px] font-bold text-slate-400 uppercase mb-2 block tracking-widest">
                          문의 내용
                        </span>
                        <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                          {item.content}
                        </p>
                      </div>

                      {item.status === "답변완료" && item.answer ? (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <Badge variant="green" className="mb-3">
                            운영자 답변
                          </Badge>
                          <p className="text-slate-800 text-sm font-medium whitespace-pre-wrap leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-6 pt-6 border-t border-slate-200 text-slate-400 text-xs italic">
                          {item.status === "답변완료"
                            ? "답변 내용이 없습니다."
                            : "담당자가 확인 중입니다."}
                        </div>
                      )}
                    </Box>
                  </td>
                </TR>
              )}
            </React.Fragment>
          );
        })}
      </TBody>
    </Table>
  );
}
