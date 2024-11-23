"use server";

import { getToken } from "@/auth/getToken";
import { getRole } from "@/auth/getRole";

export async function putClassrooms(formData: FormData) {
  const token = await getToken();
  const role = await getRole();

  if (!token || role !== "ADMIN") {
    throw new Error("Not authenticated");
  }

  const id = formData.get("id") as string | null;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const modelKey = formData.get("modelKey") as string;
  const capacity = Number(formData.get("capacity") as string);
  const equipmentIds = formData.getAll("equipmentIds") as string[];

  const body = {
    name,
    description,
    modelKey,
    capacity,
    equipmentIds,
  };

  if (id) {
    console.log("waiting for PUT /classrooms/:id to be implemented");
    // await fetch(`http://localhost:8080/classrooms/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(body),
    // });
    // return;
  }

  await fetch("http://localhost:8080/classrooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}
