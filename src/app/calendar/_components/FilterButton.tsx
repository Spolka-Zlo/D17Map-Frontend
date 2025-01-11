import { twMerge } from "tailwind-merge";

export function FilterButton({
  filter,
  isOn,
  onClickHandler,
}: {
  filter: string;
  isOn: boolean;
  onClickHandler: () => void;
}) {
  return (
    <button
      className={twMerge(
        "w-44 truncate rounded-md border-b-2 border-l-2 border-black p-2 text-primary hover:bg-accent/50 maxLG:w-24",
        isOn && "bg-accent/50",
      )}
      onClick={onClickHandler}
      title={filter}
    >
      {filter}
    </button>
  );
}
