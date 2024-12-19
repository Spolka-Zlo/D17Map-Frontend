"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropdownProps = {
  options: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  className?: string;
  additionalInfo?: string;
};

export function Dropdown({
  options,
  selected,
  setSelected,
  className,
  additionalInfo = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={twMerge("relative w-44", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer justify-between rounded-md border-b-2 border-l-2 border-accent bg-primary p-2 text-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
      >
        <span>{selected + " " + additionalInfo}</span>

        <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <ul className="absolute z-30 mt-2 max-h-40 w-44 overflow-auto rounded-md">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="w-full cursor-pointer border-y-2 border-primary bg-primary p-3 text-secondary hover:border-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
