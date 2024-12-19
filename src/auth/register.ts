"use server";

import { redirect } from "next/navigation";
import { REGISTER_URL } from "./constants";

export async function register(username: string, password: string) {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.error(response.statusText);
  } else {
    redirect("/login");
  }
}
