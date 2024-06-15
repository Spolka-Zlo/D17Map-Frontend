"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropdownProps = {
  options: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  className?: string;
};

export function Dropdown({
  options,
  selected,
  setSelected,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={twMerge("relative w-44", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 mb-2 bg-primary text-secondary rounded-lg focus:ring-2 focus:ring-secondary focus:ring-opacity-50 cursor-pointer"
      >
        {selected}
      </div>

      {isOpen && (
        <ul className="fixed w-44 max-h-40 rounded-lg overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="p-3 w-full bg-primary text-secondary border-y-2 border-primary focus:ring-2 focus:ring-secondary focus:ring-opacity-50
               cursor-pointer hover:border-secondary"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
