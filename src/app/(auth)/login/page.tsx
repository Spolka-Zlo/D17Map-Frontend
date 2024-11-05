import { login } from "@/auth/login";

export default function LoginPage() {
  return (
    <div className="absolute left-[50%] top-[50%] w-[25vw] -translate-x-2/4 -translate-y-1/2 justify-center rounded-md bg-white/25 p-10">
      <form
        action={async (formData) => {
          "use server";
          const username = formData.get("username") as string | undefined;
          const password = formData.get("password") as string | undefined;
          if (!username || !password) {
            return;
          }
          await login(username, password);
        }}
        className="flex flex-col gap-4"
      >
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button
          type="submit"
          className="w-44 self-center rounded-md border-b-2 border-l-2 border-primary p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
