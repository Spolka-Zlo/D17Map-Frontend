"use server";

import { getToken } from "@/auth/getToken";
import { ADD_RESERVATION_URL } from "@/server-endpoints/reservations";
import { revalidateTag } from "next/cache";

export async function addReservation(formData: FormData) {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
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
    console.log("Reservation added successfully");
    revalidateTag("userReservations");
  }
}
