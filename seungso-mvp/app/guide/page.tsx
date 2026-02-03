import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Guide from "./Guide";

export default async function GuidePage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/member/login");
  }

  if (user.email !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }

  return <Guide />;
}
