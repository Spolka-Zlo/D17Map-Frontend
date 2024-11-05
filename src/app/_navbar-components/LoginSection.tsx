import { getToken } from "@/auth/getToken";
import { OrangeLinkButton } from "@/components/OrangeLinkButton";
import { LogoutButton } from "./LogoutButton";

export async function LoginSection() {
  const token = await getToken();
  const isLoggedIn = !!token;
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 maxML:hidden">
      {!isLoggedIn ? (
        <OrangeLinkButton text="Login" className="w-28" href="/login" />
      ) : (
        isLoggedIn && <LogoutButton />
      )}
    </div>
  );
}
