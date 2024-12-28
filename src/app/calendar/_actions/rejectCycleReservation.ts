"use server";

import { getToken } from "@/auth/getToken";
import { REJECT_RECURRING_RESERVATION_URL } from "@/server-endpoints/reservations";
import { redirect } from "next/navigation";

export async function rejectCycleReservation(
  recurringId: string,
): Promise<void> {
  const token = await getToken();
  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }

  const response = await fetch(REJECT_RECURRING_RESERVATION_URL, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recurringId),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to reject cycle reservation");
  }
}
