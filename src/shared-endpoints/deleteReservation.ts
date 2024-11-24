"use server";

import { getToken } from "@/auth/getToken";

import { DELETE_RESERVATION_URL } from "@/server-endpoints/reservations";

export async function deleteReservation(id: string) {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(DELETE_RESERVATION_URL + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete reservation");
  } else {
    console.log("Reservation deleted successfully");
  }
}
