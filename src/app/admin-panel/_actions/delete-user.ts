"use server";

import { getRole } from "@/auth/getRole";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";

export async function deleteUser(id: string) {
  const token = await getToken();
  const role = await getRole();

  if (!token || role !== "ADMIN") {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${HOST}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  } else {
    console.log("User deleted successfully");
  }
}
