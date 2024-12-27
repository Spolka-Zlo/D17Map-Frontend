"use server";

import { getToken } from "@/auth/getToken";
import {
  ADD_RECURRING_RESERVATION_URL,
  ADD_RESERVATION_URL,
} from "@/server-endpoints/reservations";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addReservation(
  formData: FormData,
): Promise<string[] | null | undefined> {
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

  console.log("recurringType", recurringType);
  console.log("recurringEndDate", recurringEndDate);

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

    // console.log("body", body);

    const response = await fetch(ADD_RECURRING_RESERVATION_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status > 204) {
      console.log("Failed to add reservation", response);
      throw new Error("Failed to add reservation");
    } else {
      const data = await response.json();
      console.log("Reservation added successfully", data);
      if (
        "message" in data &&
        data.message === "Collisions detected." &&
        "collisions" in data
      ) {
        console.log("Collisions detected.", data.collisions);
        return data.collisions;
      } else {
        revalidateTag("userReservations");
      }
    }
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
    console.log("Reservation added successfully");
    revalidateTag("userReservations");
  }
}
