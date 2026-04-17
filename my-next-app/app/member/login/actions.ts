"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ContactResponse = { success: true } | { success: false; error: string };

async function getSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value: "",
            ...options,
            maxAge: 0,
          });
        },
      },
    },
  );
}

export async function login(formData: FormData): Promise<ContactResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await getSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");

  return { success: true };
}

export async function logout(): Promise<void> {
  const supabase = await getSupabaseClient();

  await supabase.auth.signOut();

  const cookieStore = await cookies();

  cookieStore.set("sb-access-token", "", { maxAge: 0 });
  cookieStore.set("sb-refresh-token", "", { maxAge: 0 });

  revalidatePath("/", "layout");
}

export async function createContact(data: {
  title: string;
  category: string;
  content: string;
}): Promise<ContactResponse> {
  const supabase = await getSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const { error } = await supabase.from("contacts").insert({
    user_id: user.id,
    user_email: user.email,
    title: data.title,
    category: data.category,
    content: data.content,
    status: "대기중",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/customer/contact/list");

  return { success: true };
}
