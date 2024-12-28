"use server";

import { getToken } from "@/auth/getToken";
import { ACCEPT_RECURRING_RESERVATION_URL } from "@/server-endpoints/reservations";
import { redirect } from "next/navigation";
import { RecurringData } from "../_components/CalendarReservationForm";

export async function acceptCycleReservation(data: RecurringData) {
  const token = await getToken();
  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }
  const response = await fetch(ACCEPT_RECURRING_RESERVATION_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to accept cycle reservation");
  }
}
