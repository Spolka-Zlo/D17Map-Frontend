"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

type RadioDropdownProps = {
  options: {
    id: string;
    name: string;
  }[];
  className?: string;
  htmlName: string;
  defaultValue?: string;
  hidden?: boolean;
};

export function RadioDropdown({
  options,
  className,
  htmlName,
  defaultValue,
  hidden,
}: RadioDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue ?? options[0].name);
  return (
    <div
      className={twMerge(
        "relative w-44 maxLG:z-0",
        className,
        hidden && "hidden",
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="-z-10 block cursor-pointer rounded-md border-b-2 border-l-2 border-accent bg-primary p-2 text-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
      >
        {selected}
      </div>

      <ul
        className={twMerge(
          "absolute z-50 mt-2 max-h-40 w-44 overflow-auto rounded-md",
          !isOpen && "hidden",
        )}
      >
        {options.map(({ id, name }) => (
          <li
            key={id}
            className="w-full cursor-pointer border-y-2 border-primary bg-primary text-secondary hover:border-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
          >
            <label
              htmlFor={id}
              className="flex h-full w-full cursor-pointer gap-2 p-3"
            >
              <input
                id={id}
                type="radio"
                name={htmlName}
                value={id}
                defaultChecked={
                  defaultValue
                    ? defaultValue === name
                    : options[0].name === name
                }
                onChange={() => setSelected(name)}
              />
              <span>{name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
