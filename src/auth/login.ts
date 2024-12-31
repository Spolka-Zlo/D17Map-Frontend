"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LOGIN_URL } from "./constants";

export async function login(
  username: string,
  password: string,
  buildingName: string,
) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.error("Failed to login");
    return;
  }

  const { token, roles } = await response.json();
  const role = roles[0];

  if (typeof token !== "string" || typeof role !== "string") {
    console.error("Failed to login");
    return;
  }

  // TODO: handle any errors with login

  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // One day
    path: "/",
  });

  cookies().set("role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // One day
  });

  cookies().set("buildingName", buildingName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // One day
  });

  redirect("/calendar");
}
