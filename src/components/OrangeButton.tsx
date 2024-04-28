import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  textClassName?: string;
}

export function OrangeButton({
  text,
  className,
  textClassName,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "px-4 py-2 bg-secondary text-black hover:text-secondary rounded-lg shadow-blueShadow hover:shadow-buttonHoverShadow hover:bg-primary",
        className
      )}
      type={type}
      onClick={onClick}
      {...rest}
    >
      <span className={twMerge("text-lg font-extrabold", textClassName)}>
        {text}
      </span>
    </button>
  );
}
