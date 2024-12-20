"use server";

import { getToken } from "@/auth/getToken";
import { getRole } from "@/auth/getRole";
import { HOST } from "@/server-endpoints/host";

export async function putExtraRoom(formData: FormData) {
  const token = await getToken();
  const role = await getRole();

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
    console.log("waiting for PUT /extra-rooms/admin/:id to be implemented");
    // await fetch(`${HOST}/buildings/D17/extra-rooms/admin/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(body),
    // });
    return;
  }

  const response = await fetch(`${HOST}/buildings/D17/extra-rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to create extra room");
  } else {
    console.log("Extra room created successfully");
  }
}
