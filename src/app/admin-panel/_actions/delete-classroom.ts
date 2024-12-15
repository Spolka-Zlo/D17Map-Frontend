"use server";

import { getToken } from "@/auth/getToken";
import { getRole } from "@/auth/getRole";
import { HOST } from "@/server-endpoints/host";

export async function deleteClassroom(id: string) {
  const token = await getToken();
  const role = await getRole();

  if (!token || role !== "ADMIN") {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${HOST}/classrooms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete classroom");
  } else {
    console.log("Classroom deleted successfully");
  }
}
