"use server";

import { getBuildingName } from "@/auth/getBuildingName";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function rejectCycleReservation(
  recurringId: string,
): Promise<void> {
  const token = await getToken();
  const buildingName = await getBuildingName();

  if (!buildingName) {
    throw new Error("Building name not found");
  }

  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }

  const response = await fetch(
    `${HOST}/buildings/${buildingName}/reservations/recurringReservations/${recurringId}/reject`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.ok) {
    revalidateTag("userReservations");
  } else {
    throw new Error("Failed to reject cycle reservation");
  }
}
