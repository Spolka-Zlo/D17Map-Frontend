import { register } from "@/auth/register";

export default function RegisterPage() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const username = formData.get("username") as string | undefined;
        const password = formData.get("password") as string | undefined;
        const confirmPassword = formData.get("confirm-password") as
          | string
          | undefined;
        if (!username || !password) {
          return;
        }
        if (password !== confirmPassword) {
          console.error("Passwords do not match");
          return;
        }
        await register(username, password);
      }}
    >
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <label htmlFor="confirm-password">Confirm Password</label>
      <input type="password" id="confirm-password" name="confirm-password" />
      <button type="submit">Register</button>
    </form>
  );
}
