"use server";

import { getRole } from "@/auth/getRole";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { redirect } from "next/navigation";

export async function putUser(formData: FormData) {
  const token = await getToken();
  const role = await getRole();

  if (!token || role !== "ADMIN") {
    console.error("Not authenticated");
    redirect("/login");
  }

  const roles = formData.getAll("roles") as string[];
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;

  const body = {
    name,
    roles,
  };

  if (id) {
    const response = await fetch(`${HOST}/buildings/D17/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    } else {
      console.log("User updated successfully");
    }
    return;
  }

  const response = await fetch(`${HOST}/buildings/D17/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  console.log("User created successfully");
}
