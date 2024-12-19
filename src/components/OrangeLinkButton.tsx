import { twMerge } from "tailwind-merge";
import Link from "next/link";

export interface LinkButtonProps {
  text: string;
  className?: string;
  textClassName?: string;
  href: string;
}

export function OrangeLinkButton({
  text,
  className,
  textClassName,
  href,
}: LinkButtonProps) {
  return (
    <Link
      className={twMerge(
        "rounded-lg bg-secondary px-4 py-2 text-black shadow-blueShadow hover:bg-primary hover:text-secondary hover:shadow-buttonHoverShadow",
        className,
      )}
      href={href}
    >
      <span className={twMerge("text-lg font-extrabold", textClassName)}>
        {text}
      </span>
    </Link>
  );
}
