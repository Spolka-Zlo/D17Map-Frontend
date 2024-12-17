"use server";

import { fetchPost } from "@/server-endpoints/fetchServer";
import { createEquipmentSchema } from "@/schemas/equipmentSchemas";
import { HOST } from "@/server-endpoints/host";
import { getToken } from "@/auth/getToken";

export async function createEquipment(formData: FormData) {
  const token = await getToken();
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;
  if (id) {
    await fetch(`${HOST}/equipments/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return;
  }

  const response = await fetch(`${HOST}/equipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create equipment");
  }

  console.log("Equipment created successfully");
}
