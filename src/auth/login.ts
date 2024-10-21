"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const LOGIN_URL = "http://localhost:8080/auth/login";

export async function login(username: string, password: string) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error("Login failed");
  }

  const token = await response.text();
  if (typeof token !== "string") {
    throw new Error("Invalid data received");
  }

  // TODO: handle any errors with login

  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  redirect("/classrooms");
}
