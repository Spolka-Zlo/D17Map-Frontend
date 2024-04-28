import Image from "next/image";
import Link from "next/link";
import { OrangeButton } from "../../components/OrangeButton";
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
    <nav className="z-0 flex justify-between items-center gap-3 p-1 bg-primary text-white">
      <div className="flex justify-center items-center gap-3 pr-3 w-full min-w-72">
        <Image src="/img/logo.png" alt="Logo" width={120} height={120} />
        <h1 className="text-white text-4xl">D17 MAP</h1>
      </div>
      <Menu links={links} />
      <LoginSection />
    </nav>
  );
}
