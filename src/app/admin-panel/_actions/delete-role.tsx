"use server";

import { getBuildingName } from "@/auth/getBuildingName";
import { getRole } from "@/auth/getRole";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { redirect } from "next/navigation";

export async function deleteRole(id: string) {
  const token = await getToken();
  const role = await getRole();
  const buildingName = await getBuildingName();

  if (!buildingName) {
    throw new Error("Building name not found");
  }

  if (!token || role !== "ADMIN") {
    console.error("Not authenticated");
    redirect("/login");
  }

  const response = await fetch(
    `${HOST}/buildings/${buildingName}/roles/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete role");
  } else {
    console.log("Role deleted successfully");
  }
}
