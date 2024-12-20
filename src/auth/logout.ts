"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("role");
  cookies().delete("token");
  redirect("/login");
}
