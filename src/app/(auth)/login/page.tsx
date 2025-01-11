"use client";

import { login } from "@/auth/login";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const submitAction = async (formData: FormData) => {
    const username = formData.get("username") as string | undefined;
    const password = formData.get("password") as string | undefined;
    const buildingName = formData.get("buildingName") as string | undefined;
    if (!username || !password || !buildingName) {
      return;
    }
    await login(username, password, buildingName)
      .then(() => toast.success("Zalogowano pomyślnie"))
      .catch(() => toast.error("Nie udało się zalogować"));
  };

  return (
    <div className="m-auto w-[25vw] justify-center rounded-md bg-white/25 p-10">
      <form action={submitAction} className="flex flex-col gap-4">
        <label htmlFor="username">Nazwa użytkownika</label>
        <input
          className="rounded-md border-2 bg-white p-1"
          type="text"
          id="username"
          name="username"
          required
        />
        <label htmlFor="password">Hasło</label>
        <input
          className="rounded-md border-2 bg-white p-1"
          type="password"
          id="password"
          name="password"
          required
        />
        <label htmlFor="buildingName">Nazwa budynku</label>
        <input
          className="rounded-md border-2 bg-white p-1"
          type="text"
          id="buildingName"
          name="buildingName"
          required
        />
        <button
          type="submit"
          className="w-44 self-center rounded-md border-b-2 border-l-2 border-primary p-2 hover:bg-accent/25"
        >
          Zaloguj się
        </button>
        <div className="text-center">Nie masz jeszcze konta?</div>
        <Link
          className="w-44 self-center rounded-md border-b-2 border-l-2 border-primary p-2 text-center hover:bg-accent/25"
          href="/register"
        >
          Zarejestruj się
        </Link>
      </form>
    </div>
  );
}
