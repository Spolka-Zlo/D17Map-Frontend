"use client";
import { Dropdown } from "@/components/Dropdown";
import { OrangeButton } from "@/components/OrangeButton";
import { XButton } from "@/components/XButton";
import { Dispatch, SetStateAction, useState } from "react";
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
  const [selectedRoom, setSelectedRoom] = useState("1.38");
  const availableRooms = ["2.41", "1.38", "3.33", "4.22"];
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
        <div className="p-4 w-full h-full flex flex-col justify-center items-center gap-2">
          <div className="flex gap-3 justify-center items-center">
            <h3>Sala: </h3>
            <Dropdown
              options={availableRooms}
              selected={selectedRoom}
              setSelected={setSelectedRoom}
              className="w-24 p-1"
            />
          </div>
          <OrangeButton
            text="Sprawdź dostępność"
            className="bg-white hover:bg-secondary text-secondary hover:text-primary hover:shadow-primary"
            textClassName=""
          />
        </div>
      )}
      {isOpen && (
        <div className="absolute p-4 top-5 right-2">
          <XButton className="z-10" onClickHandler={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
