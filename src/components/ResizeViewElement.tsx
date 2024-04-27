import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

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
        "bg-primary w-24 flex flex-col items-center justify-between gap-4 rounded-lg text-2xl p-4 h-7, text-secondary",
        className
      )}
    >
      <button className="py-2 text-4xl" onClick={handleIncrement}>
        +
      </button>
      <button className="py-2 text-4xl" onClick={handleDecrement}>
        -
      </button>
      <span className="text-center py-4">{value}%</span>
    </div>
  );
}
