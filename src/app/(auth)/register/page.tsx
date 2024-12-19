import { register } from "@/auth/register";

export default function RegisterPage() {
  return (
    <div className="m-auto w-[25vw] justify-center rounded-md bg-white/25 p-10">
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
            alert("Passwords do not match");
            return;
          }
          await register(username, password);
        }}
        className="flex flex-col gap-4"
      >
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input
          minLength={8}
          maxLength={32}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters"
          type="password"
          id="password"
          name="password"
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password" />
        <button
          type="submit"
          className="w-44 self-center rounded-md border-b-2 border-l-2 border-primary p-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
