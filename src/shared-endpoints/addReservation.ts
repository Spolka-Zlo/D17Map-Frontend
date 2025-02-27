"use server";

import { getToken } from "@/auth/getToken";
import {
  ADD_RECURRING_RESERVATION_URL,
  ADD_RESERVATION_URL,
} from "@/server-endpoints/reservations";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export type CycleResponse = {
  collisions: string[];
  recurringId: string;
};

export async function addReservation(
  formData: FormData,
): Promise<CycleResponse | null | undefined> {
  const token = await getToken();
  if (!token) {
    console.error("Not authenticated");
    redirect("/login");
  }
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const date = formData.get("date") as string;
  const type = formData.get("type") as string;
  const classroomId = formData.get("classroomId") as string;
  const numberOfParticipants = Number(
    formData.get("numberOfParticipants") as string,
  );

  const recurringType = formData.get("recurringType") as string;
  const recurringEndDate = formData.get("recurringEndDate") as string;

  if (recurringType && recurringEndDate) {
    const body = {
      title,
      description,
      startTime,
      endTime,
      date,
      type,
      classroomId,
      numberOfParticipants,
      recurringType,
      recurringEndDate,
    };

    const response = await fetch(ADD_RECURRING_RESERVATION_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status > 204) {
      throw new Error("Failed to add reservation");
    } else {
      const data = await response.json();
      if (
        "message" in data &&
        data.message === "Collisions detected." &&
        "collisions" in data
      ) {
        return {
          collisions: data.collisions,
          recurringId: data.recurringId,
        };
      } else {
        revalidateTag("userReservations");
      }
    }
    revalidateTag("userReservations");
    return null;
  }

  const body = {
    title,
    description,
    startTime,
    endTime,
    date,
    type,
    classroomId,
    numberOfParticipants,
  };

  const response = await fetch(ADD_RESERVATION_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to add reservation");
  } else {
    revalidateTag("userReservations");
  }
}
