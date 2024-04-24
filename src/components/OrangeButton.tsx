import { ButtonInterface } from "@/types-interfaces/ButtonInterface";
import { twMerge } from "tailwind-merge";

export function OrangeButton({
  text,
  className,
  textClassName,
  onClick,
}: ButtonInterface) {
  return (
    <button
      className={twMerge(
        "px-4 py-2 text-black border-2 border-black bg-secondary rounded-lg shadow-lg hover:shadow-xl hover:bg-mapGrey",
        className
      )}
      type="button"
      onClick={onClick}
    >
      <span className={twMerge("text-lg font-bold", textClassName)}>
        {text}
      </span>
    </button>
  );
}
