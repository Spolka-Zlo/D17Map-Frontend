"use server";

import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { redirect } from "next/navigation";

export async function rejectCycleReservation(
  recurringId: string,
): Promise<void> {
  const token = await getToken();
  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }

  const response = await fetch(
    `${HOST}/buildings/D17/reservations/recurringReservations/${recurringId}/reject`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.ok) {
    console.log("Cycle reservation rejected");
  } else {
    throw new Error("Failed to reject cycle reservation");
  }
}
