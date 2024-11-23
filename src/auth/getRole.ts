"use server";

import { cookies } from "next/headers";

export async function getRole() {
  const role = cookies().get("role");
  if (!role) {
    return null;
  }
  return role.value;
}
