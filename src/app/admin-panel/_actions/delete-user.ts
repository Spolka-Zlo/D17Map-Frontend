"use server";

import { getBuildingName } from "@/auth/getBuildingName";
import { getRole } from "@/auth/getRole";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { revalidateTag } from "next/cache";

export async function deleteUser(id: string) {
  const token = await getToken();
  const role = await getRole();
  const buildingName = await getBuildingName();

  if (!buildingName) {
    throw new Error("Building name not found");
  }

  if (!token || role !== "ADMIN") {
    throw new Error("Not authenticated");
  }

  const response = await fetch(
    `${HOST}/buildings/${buildingName}/users/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete user");
  } else {
    revalidateTag("adminUsers");
  }
}
