"use server";

import { getToken } from "@/auth/getToken";

export async function createEquipment(formData: FormData) {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  await fetch("http://localhost:8080/equipments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: "hhbhb",
      name: formData.get("name"),
    }),
  });
}
