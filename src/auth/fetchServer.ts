import { z } from "zod";
import { getToken } from "./getToken";

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
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return schema.parse(data);
}
