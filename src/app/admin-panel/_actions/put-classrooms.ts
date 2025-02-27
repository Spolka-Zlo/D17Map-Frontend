"use server";

import { getToken } from "@/auth/getToken";
import { getRole } from "@/auth/getRole";
import { HOST } from "@/server-endpoints/host";
import { getBuildingName } from "@/auth/getBuildingName";
import { revalidateTag } from "next/cache";

export async function putClassrooms(formData: FormData) {
  const token = await getToken();
  const role = await getRole();
  const buildingName = await getBuildingName();

  if (!buildingName) {
    throw new Error("Building name not found");
  }

  if (!token || role !== "ADMIN") {
    throw new Error("Not authenticated");
  }

  const id = formData.get("id") as string | null;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const modelKey = formData.get("modelKey") as string;
  const capacity = Number(formData.get("capacity") as string);
  const equipmentIds = formData.getAll("equipmentIds") as string[];
  const floorName = formData.get("floorName") as string;

  const body = {
    name,
    description,
    modelKey,
    capacity,
    equipmentIds,
    floorName,
  };

  if (id) {
    const response = await fetch(
      `${HOST}/buildings/${buildingName}/classrooms/admin/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update classroom");
    } else {
      revalidateTag("adminClassrooms");
    }
  }

  const response = await fetch(`${HOST}/buildings/${buildingName}/classrooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to create classroom");
  } else {
    revalidateTag("adminClassrooms");
    return;
  }
}
