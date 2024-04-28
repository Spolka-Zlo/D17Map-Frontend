import { twMerge } from "tailwind-merge";

type ListElementProps = {
  text: string;
  onClick?: () => void;
};

export function ListElement({ text, onClick }: ListElementProps) {
  return (
    <div
      className={twMerge(
        "p-4 bg-primary rounded-lg shadow-blueShadow",
        onClick && "cursor-pointer hover:shadow-listHoverShadow"
      )}
      onClick={onClick}
    >
      <span className="text-lg text-white font-extrabold">{text}</span>
    </div>
  );
}
