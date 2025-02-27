"use server";

import { HOST } from "@/server-endpoints/host";
import { getToken } from "@/auth/getToken";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function createEquipment(formData: FormData) {
  const token = await getToken();
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;
  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }
  if (id) {
    const response = await fetch(`${HOST}/equipments/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to update equipment");
    } else {
      revalidateTag("adminEquipments");
    }
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
  } else {
    revalidateTag("adminEquipments");
  }
}
