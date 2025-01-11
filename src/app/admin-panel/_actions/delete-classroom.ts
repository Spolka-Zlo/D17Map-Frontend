"use server";

import { getToken } from "@/auth/getToken";
import { getRole } from "@/auth/getRole";
import { HOST } from "@/server-endpoints/host";
import { getBuildingName } from "@/auth/getBuildingName";
import { revalidateTag } from "next/cache";

export async function deleteClassroom(id: string) {
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
    `${HOST}/buildings/${buildingName}/classrooms/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete classroom");
  } else {
    revalidateTag("adminClassrooms");
  }
}
