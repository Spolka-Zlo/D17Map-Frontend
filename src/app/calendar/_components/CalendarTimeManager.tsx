import { XButton } from "@/components/XButton";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type CalendarTimeManagerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export function CalendarTimeManager({
  isOpen,
  setIsOpen,
  className,
}: CalendarTimeManagerProps) {
  return (
    <div
      className={twMerge(
        "z-0 sm:rounded-r-lg maxSM:rounded-b-lg bg-secondary relative",
        !isOpen &&
          "sm:w-0 maxSM:h-0 duration-700 transition-[width] maxSM:transition-[height]",
        isOpen &&
          "sm:w-full maxSM:h-full sm:-ml-2 maxSM:-mt-2 transition-[width] maxSM:transition-[height] duration-700"
      )}
    >
      {isOpen && (
        <div className="absolute p-4 top-5 right-2">
          <XButton className="z-10" onClickHandler={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
