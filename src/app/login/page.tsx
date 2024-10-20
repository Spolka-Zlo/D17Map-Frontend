import { login } from "@/auth/login";

export default function LoginPage() {
  return (
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
    >
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
