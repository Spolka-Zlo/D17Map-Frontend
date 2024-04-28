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
  useEffect(() => {
    const closeMenu = () => {
      setOpen(false);
    };
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);
  return (
    <>
      <div className="z-20 maxML:hidden flex p-3 justify-center w-full items-center gap-5">
        {links.map((link) => (
          <Link key={link.url} href={link.url} className="text-2xl">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="ml:hidden justify-self-end flex justify-end p-3 pr-10 w-full">
        <Burger open={open} toggleOpen={toggleOpen} />
      </div>
      <MenuContent links={links} open={open} toggleOpen={toggleOpen} />
    </>
  );
}
