"use server";

import { getToken } from "@/auth/getToken";
import { MODIFY_RESERVATION_URL } from "@/server-endpoints/reservations";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function modifyReservation(formData: FormData) {
  const token = await getToken();
  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const classroomId = formData.get("classroomId") as string;

  const body = {
    title,
    description,
    type,
    classroomId: formData.get("classroomId"),
  };

  const response = await fetch(MODIFY_RESERVATION_URL + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log(response.status);
    console.log("body", body);
    throw new Error("Failed to modify reservation");
  } else {
    console.log("Reservation modified successfully");
    revalidateTag("userReservations");
  }
}
