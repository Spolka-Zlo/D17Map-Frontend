"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

type MultipleChoiceDropdownProps = {
  options: string[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  className?: string;
};

export function MultipleChoiceDropdown({
  options,
  selected,
  setSelected,
  className,
}: MultipleChoiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={twMerge("relative w-44", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="truncate p-2 mb-2 bg-primary text-secondary rounded-lg focus:ring-2 focus:ring-secondary focus:ring-opacity-50 cursor-pointer"
      >
        {selected.join(", ") || "Select rooms"}
      </div>

      {isOpen && (
        <ul className="w-44 absolute rounded-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(
                  selected.includes(option)
                    ? selected.filter((s) => s !== option)
                    : [...selected, option]
                );
              }}
              className="p-3 w-44 bg-primary text-secondary border-y-2 border-primary focus:ring-2 focus:ring-secondary focus:ring-opacity-50
                cursor-pointer hover:border-secondary"
            >
              <input
                type="checkbox"
                className="accent-secondary"
                checked={selected.includes(option)}
                onChange={() => {
                  setSelected(
                    selected.includes(option)
                      ? selected.filter((c) => c !== option)
                      : [...selected, option]
                  );
                }}
              />
              <span className="pl-2 text-start">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
