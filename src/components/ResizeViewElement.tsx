import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type ResizeViewElementProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  className?: string;
};

export function ResizeViewElement({
  value,
  setValue,
  className,
}: ResizeViewElementProps) {
  const handleIncrement = () => {
    setValue((prev) => (prev < 100 ? prev + 1 : 0));
  };

  const handleDecrement = () => {
    setValue((prev) => (prev > 0 ? prev - 1 : 100));
  };

  return (
    <div
      className={twMerge(
        "h-7, flex w-24 flex-col items-center justify-between gap-4 rounded-lg bg-primary p-4 text-2xl text-secondary",
        className,
      )}
    >
      <button className="py-2 text-4xl" onClick={handleIncrement}>
        +
      </button>
      <button className="py-2 text-4xl" onClick={handleDecrement}>
        -
      </button>
      <span className="py-4 text-center">{value}%</span>
    </div>
  );
}
