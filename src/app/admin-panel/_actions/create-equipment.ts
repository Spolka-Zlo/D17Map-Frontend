"use server";

import { fetchPost } from "@/server-endpoints/fetchServer";
import { createEquipmentSchema } from "@/schemas/equipmentSchemas";
import { HOST } from "@/server-endpoints/host";

export async function createEquipment(formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;

  if (id) {
    console.log("waiting for PUT /equipments/:id to be implemented");
    await fetch(`${HOST}/equipments/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    return;
  }

  await fetch(`${HOST}/equipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
}
