"use server";

import { getBuildingName } from "@/auth/getBuildingName";
import { getRole } from "@/auth/getRole";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function putUser(formData: FormData) {
  const token = await getToken();
  const role = await getRole();
  const buildingName = await getBuildingName();

  if (!buildingName) {
    throw new Error("Building name not found");
  }

  if (!token || role !== "ADMIN") {
    console.error("Not authenticated");
    redirect("/login");
  }

  const roles = formData.getAll("roles") as string[];
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;

  const body = {
    name,
    roles,
  };

  if (id) {
    const response = await fetch(
      `${HOST}/buildings/${buildingName}/users/${id}`,
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
      throw new Error("Failed to update user");
    } else {
      revalidateTag("adminUsers");
    }
    return;
  }

  const response = await fetch(`${HOST}/buildings/${buildingName}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  revalidateTag("adminUsers");
}
