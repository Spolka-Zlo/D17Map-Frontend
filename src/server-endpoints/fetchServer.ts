import { z } from "zod";
import { getToken } from "../auth/getToken";
import { redirect } from "next/navigation";
import { logout } from "@/auth/logout";

export async function fetchGet<T>(
  url: string,
  schema: z.ZodSchema<T>,
  isTokenRequired = false,
  options?: RequestInit,
) {
  if (!isTokenRequired) {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(response.statusText);
      if (response.status === 404) {
        redirect("/404");
      }
      if (response.status === 500) {
        redirect("/500");
      }
    }

    const data = await response.json();
    try {
      return schema.parse(data);
    } catch (error) {
      console.error(error);
      console.error(data);
      throw error;
    }
  }

  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      await logout();
    }
    if (response.status === 404) {
      redirect("/404");
    }
    if (response.status === 500) {
      redirect("/500");
    }
    throw new Error(response.statusText);
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
    redirect("/login");
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
    if (response.status === 401 || response.status === 403) {
      await logout();
    }
    if (response.status === 404) {
      redirect("/404");
    }
    if (response.status === 500) {
      redirect("/500");
    }
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return schema.parse(data);
}
