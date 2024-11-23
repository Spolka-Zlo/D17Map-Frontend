"use server";

import { fetchPost } from "@/server-endpoints/fetchServer";
import { createEquipmentSchema } from "@/schemas/equipmentSchemas";

export async function createEquipment(formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;

  if (id) {
    console.log("waiting for PUT /equipments/:id to be implemented");
    // await fetch(`http://localhost:8080/equipments/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name }),
    // });
    // return;
  }

  await fetchPost("http://localhost:8080/equipments", createEquipmentSchema, {
    name,
  });
}
