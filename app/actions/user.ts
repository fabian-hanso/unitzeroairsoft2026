"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { User, UserUpdateData } from "@/types/user";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return user;
}

export async function updateUser(userData: UserUpdateData) {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { error: "Nicht authentifiziert" };
  }

  const { error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", authUser.id);

  if (error) {
    console.error("Error updating user:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/profile");

  return { success: true };
}

export async function getUserById(userId: string): Promise<User | null> {
  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }

  return user;
}
