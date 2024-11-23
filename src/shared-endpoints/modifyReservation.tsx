"use server";

import { getToken } from "@/auth/getToken";
import { MODIFY_RESERVATION_URL } from "@/server-endpoints/reservations";

export async function modifyReservation(formData: FormData) {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;

  const body = {
    title,
    description,
    type,
  };
  console.log(body);

  const response = await fetch(MODIFY_RESERVATION_URL + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to modify reservation");
  } else {
    console.log("Reservation modified successfully");
    console.log(await response.json());
  }
}
