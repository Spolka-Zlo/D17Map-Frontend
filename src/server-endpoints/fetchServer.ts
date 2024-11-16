import { z } from "zod";
import { getToken } from "../auth/getToken";

export async function fetchGet<T>(url: string, schema: z.ZodSchema<T>) {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("URL", url);
    throw new Error(url);
  }

  const data = await response.json();
  return schema.parse(data);
}

export async function fetchPost<T, U>(
  url: string,
  schema: z.ZodSchema<T>,
  body: U,
) {
  const token = await getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return schema.parse(data);
}
