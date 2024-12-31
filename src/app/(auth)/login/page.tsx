import { login } from "@/auth/login";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="m-auto w-[25vw] justify-center rounded-md bg-white/25 p-10">
      <form
        action={async (formData) => {
          "use server";
          const username = formData.get("username") as string | undefined;
          const password = formData.get("password") as string | undefined;
          const buildingName = formData.get("buildingName") as
            | string
            | undefined;
          if (!username || !password || !buildingName) {
            return;
          }
          await login(username, password, buildingName);
        }}
        className="flex flex-col gap-4"
      >
        <label htmlFor="username">Nazwa użytkownika</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Hasło</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="buildingName">Nazwa budynku</label>
        <input type="text" id="buildingName" name="buildingName" />
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
