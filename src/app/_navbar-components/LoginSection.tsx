"use client";
import { OrangeButton } from "@/components/OrangeButton";

export default function LoginSection() {
  return (
    <div className="flex maxML:hidden justify-center items-center gap-4 w-full h-full">
      <OrangeButton text="Logout" className="w-28" onClick={() => {}} />
      <span className="text-2xl font-extrabold text-secondary maxLG:hidden">
        Welcome Iza!
      </span>
    </div>
  );
}
