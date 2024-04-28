"use client";
import Link from "next/link";
import { NavigationItems } from "./Navbar";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";

type MenuContentProps = {
  links: NavigationItems["links"];
  open: boolean;
  toggleOpen: () => void;
};

export function MenuContent({ links, open, toggleOpen }: MenuContentProps) {
  return (
    <div
      className={twMerge(
        "ml:hidden flex flex-col justify-center items-center content-center gap-7 absolute top-0 bottom-0 left-0 right-0 z-10 w-screen bg-primary",
        open
          ? "transition-[height] duration-700 h-screen"
          : "h-0 transition-[height] duration-1000 -mt-40"
      )}
    >
      {links.map((link) => (
        <Link
          key={link.url}
          href={link.url}
          onClick={toggleOpen}
          className="text-2xl"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
