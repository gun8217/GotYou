export interface Contact {
  id: string;
  user_id: string;
  user_email: string | null;
  category: string;
  title: string;
  content: string;
  status: "대기중" | "답변완료";
  answer: string | null;
  created_at: string;
}

export interface ContactResponse {
  success?: boolean;
  error?: string;
}
