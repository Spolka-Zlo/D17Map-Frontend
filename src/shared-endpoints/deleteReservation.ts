"use server";

import { getToken } from "@/auth/getToken";

import { DELETE_RESERVATION_URL } from "@/server-endpoints/reservations";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
export async function deleteReservation(id: string) {
  const token = await getToken();
  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }

  const response = await fetch(DELETE_RESERVATION_URL + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete reservation");
  }

  revalidateTag("reservations");
}
