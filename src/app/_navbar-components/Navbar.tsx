import Image from "next/image";
import LoginSection from "./LoginSection";
import { Menu } from "./Menu";
export type NavigationItems = {
  links: {
    name: string;
    url: string;
  }[];
};
export function Navbar({ links }: NavigationItems) {
  return (
    <nav className="z-0 flex items-center justify-between gap-3 bg-primary p-1 text-white">
      <div className="flex w-full min-w-72 items-center justify-center gap-3 pr-3">
        <Image src="/img/logo.png" alt="Logo" width={80} height={80} />
        <h1 className="text-3xl text-white">D17 MAP</h1>
      </div>
      <Menu links={links} />
      <LoginSection />
    </nav>
  );
}
