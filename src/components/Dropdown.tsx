"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropdownProps = {
  options: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export function Dropdown({ options, selected, setSelected }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-44">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 mb-2 bg-primary text-secondary rounded-lg focus:ring-2 focus:ring-secondary focus:ring-opacity-50 cursor-pointer"
      >
        {selected}
      </div>

      {isOpen && (
        <ul className="fixed w-44">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="p-3 w-full bg-primary text-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-50 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
