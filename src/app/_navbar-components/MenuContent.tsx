"use client";
import Link from "next/link";
import { NavigationItems } from "./Navbar";
import { twMerge } from "tailwind-merge";
import { OrangeButton } from "@/components/OrangeButton";

type MenuContentProps = {
  links: NavigationItems["links"];
  open: boolean;
  toggleOpen: () => void;
};

export function MenuContent({ links, open, toggleOpen }: MenuContentProps) {
  return (
    <div
      className={twMerge(
        "absolute bottom-0 left-0 right-0 top-0 flex w-screen flex-col content-center items-center justify-center gap-7 bg-primary ml:hidden",
        open
          ? "h-screen transition-[height] duration-700"
          : "-mt-40 h-0 transition-[height] duration-1000",
      )}
    >
      {links.map(({ name, url }) => (
        <Link key={url} href={url} onClick={toggleOpen} className="text-2xl">
          {name}
        </Link>
      ))}
      <OrangeButton text="Logout" onClick={() => {}} />
    </div>
  );
}
