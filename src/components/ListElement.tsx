import { twMerge } from "tailwind-merge";

type ListElementProps = {
  text: string;
  onClick?: () => void;
  buttonClassName?: string;
  textClassName?: string;
};

export function ListElement({
  text,
  onClick,
  buttonClassName,
  textClassName,
}: ListElementProps) {
  return (
    <div
      className={twMerge(
        "p-4 flex justify-center bg-primary rounded-lg shadow-blueShadow",
        onClick && "cursor-pointer hover:shadow-listHoverShadow",
        buttonClassName
      )}
      onClick={onClick}
    >
      <span
        className={twMerge(
          "text-lg text-white font-extrabold text-center",
          textClassName
        )}
      >
        {text}
      </span>
    </div>
  );
}
