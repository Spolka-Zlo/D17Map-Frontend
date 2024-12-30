"use server";

import { getRole } from "@/auth/getRole";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { redirect } from "next/navigation";

function createIncludedExcluded(
  all: boolean,
  floorIds: string[],
  classroomIds: string[],
) {
  if (all) {
    return {
      all: true,
    };
  }
  return {
    all,
    floors: floorIds,
    classrooms: classroomIds,
  };
}

export async function putRole(formData: FormData) {
  const token = await getToken();
  const role = await getRole();

  if (!token || role !== "ADMIN") {
    console.error("Not authenticated");
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const id = formData.get("id") as string;
  const all = Boolean(formData.get("all"));
  const floorIds = formData.getAll("floorIds") as string[];
  const classroomIds = formData.getAll("classroomIds") as string[];
  const includedExcluded = formData.get("includedExcluded") as string;

  const body =
    includedExcluded === "included"
      ? {
          name,
          included: createIncludedExcluded(all, floorIds, classroomIds),
        }
      : {
          name,
          excluded: createIncludedExcluded(all, floorIds, classroomIds),
        };

  if (id) {
    const response = await fetch(`${HOST}/buildings/D17/roles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to update role");
    } else {
      console.log("Role updated successfully");
    }
    return;
  }
  const response = await fetch(`${HOST}/buildings/D17/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to create role");
  }

  console.log("Role created successfully");
}
