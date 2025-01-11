"use server";

import { getToken } from "@/auth/getToken";
import { getRole } from "@/auth/getRole";
import { HOST } from "@/server-endpoints/host";
import { getBuildingName } from "@/auth/getBuildingName";
import { revalidateTag } from "next/cache";

export async function putExtraRoom(formData: FormData) {
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
  const floorName = formData.get("floorName") as string;
  const type = formData.get("type") as string;

  const body = {
    name,
    description,
    type,
    modelKey,
    floorName,
  };

  if (id) {
    const response = await fetch(
      `${HOST}/buildings/${buildingName}/extra-rooms/${id}`,
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
      throw new Error("Failed to update extra room");
    } else {
      revalidateTag("adminExtraRooms");
    }
  }

  const response = await fetch(
    `${HOST}/buildings/${buildingName}/extra-rooms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create extra room");
  } else {
    revalidateTag("adminExtraRooms");
    return;
  }
}
