import { ButtonHTMLAttributes } from "react";
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
        "px-4 py-2 bg-secondary text-black hover:text-secondary rounded-lg shadow-blueShadow hover:shadow-buttonHoverShadow hover:bg-primary",
        className
      )}
      href={href}
    >
      <span className={twMerge("text-lg font-extrabold", textClassName)}>
        {text}
      </span>
    </Link>
  );
}
