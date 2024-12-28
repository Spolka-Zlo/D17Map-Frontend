"use server";

import { getRole } from "@/auth/getRole";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";

export async function deleteRole(id: string) {
  const token = await getToken();
  const role = await getRole();

  if (!token || role !== "ADMIN") {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${HOST}/roles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete role");
  } else {
    console.log("Role deleted successfully");
  }
}