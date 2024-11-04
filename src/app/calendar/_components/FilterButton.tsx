import { twMerge } from "tailwind-merge";

export function FilterButton({
  filter,
  isOn,
}: {
  filter: string;
  isOn: boolean;
}) {
  return (
    <button
      className={twMerge(
        "rounded-md border-b-2 border-l-2 border-black p-2 text-primary hover:bg-accent/50",
        isOn && "bg-accent/50",
      )}
    >
      {filter}
    </button>
  );
}
