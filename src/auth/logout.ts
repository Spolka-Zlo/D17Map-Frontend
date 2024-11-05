"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// write logout endpoint

export async function logout() {
  cookies().delete("token");
  redirect("/login");
}
