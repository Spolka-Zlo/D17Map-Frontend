"use client";
import Link from "next/link";
import { NavigationItems } from "./Navbar";
import { Burger } from "./Burger";
import { useEffect, useState } from "react";
import { MenuContent } from "./MenuContent";

export function Menu({ links }: NavigationItems) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  useCloseOnResize(setOpen);

  return (
    <>
      <div className="z-20 flex w-full items-center justify-center gap-9 p-3 maxML:hidden">
        {links.map(({ name, url }) => (
          <Link
            key={url}
            href={url}
            className="rounded-md border-b-2 border-l-2 border-accent pb-2 pl-2 text-xl"
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="flex w-full justify-end justify-self-end p-3 pr-10 ml:hidden">
        <Burger open={open} toggleOpen={toggleOpen} />
      </div>
      <MenuContent links={links} open={open} toggleOpen={toggleOpen} />
    </>
  );
}

function useCloseOnResize(setOpen: (o: boolean) => void) {
  useEffect(() => {
    const closeMenu = () => {
      setOpen(false);
    };
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, [setOpen]);
}
