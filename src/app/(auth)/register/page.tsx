"use client";

import { register } from "@/auth/register";
import { useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const submitAction = async (formData: FormData) => {
    const username = formData.get("username") as string | undefined;
    const password = formData.get("password") as string | undefined;
    const confirmPassword = formData.get("confirm-password") as
      | string
      | undefined;
    if (!username || !password) {
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await register(username, password)
      .then(() => toast.success("Zarejestrowano pomyślnie"))
      .catch(() => toast.error("Nie udało się zarejestrować"));
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
          minLength={8}
          maxLength={32}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Hasło musi zawierać co najmniej jedną cyfrę, jedną małą i jedną dużą literę oraz mieć co najmniej 8 znaków"
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordValid(isPasswordValid(e.target.value));
          }}
          className={twMerge(
            "rounded-md border-2 bg-white p-1",
            !passwordValid && "border-red-500",
          )}
        />
        <span
          title="Hasło musi zawierać co najmniej jedną cyfrę, jedną małą i jedną dużą literę oraz mieć co najmniej 8 znaków"
          className={twMerge("text-red-500", passwordValid && "hidden")}
        >
          Niepoprawne hasło
        </span>
        <label htmlFor="confirm-password">Potwierdź hasło</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordMatch(password === e.target.value);
          }}
          className={twMerge(
            "rounded-md border-2 bg-white p-1",
            !passwordMatch && "border-red-500",
          )}
        />
        <span className={twMerge("text-red-500", passwordMatch && "hidden")}>
          Hasła muszą być takie same
        </span>
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
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}

function isPasswordValid(password: string) {
  return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);
}
