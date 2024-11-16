"use client";

import { logout } from "@/auth/logout";

export function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="text-2xl font-extrabold text-secondary maxLG:hidden"
    >
      Logout!
    </button>
  );
}
