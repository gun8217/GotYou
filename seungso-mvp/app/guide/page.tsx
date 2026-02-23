import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Guide from "./Guide";

export default async function GuidePage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user?.email !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }

  return <Guide />;
}
