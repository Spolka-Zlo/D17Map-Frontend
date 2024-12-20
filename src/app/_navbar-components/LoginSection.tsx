import { getToken } from "@/auth/getToken";
import { getRole } from "@/auth/getRole";
import { OrangeLinkButton } from "@/components/OrangeLinkButton";
import { LogoutButton } from "./LogoutButton";

export async function LoginSection() {
  const token = await getToken();
  const role = await getRole();
  const isLoggedIn = !!token;

  return (
    <div className="flex h-full w-full items-center justify-center gap-4 maxML:hidden">
      {!isLoggedIn ? (
        <OrangeLinkButton
          text="Zaloguj się"
          className="w-28 text-center"
          href="/login"
        />
      ) : (
        isLoggedIn && (
          <>
            <LogoutButton />
            {role === "ADMIN" && (
              <OrangeLinkButton
                text="Admin Panel"
                className="h-fit"
                href="/admin-panel"
              />
            )}
          </>
        )
      )}
    </div>
  );
}
