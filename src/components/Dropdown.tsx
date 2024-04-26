import { Dispatch, SetStateAction } from "react";

type DropdownProps = {
  options: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export function Dropdown({ options, selected, setSelected }: DropdownProps) {
  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="p-3 bg-primary text-secondary rounded-lg focus:ring-2 focus:ring-secondary focus:ring-opacity-50 cursor-pointer"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="rounded-lg m-2 focus:bg-secondary"
        >
          {option}
        </option>
      ))}
    </select>
  );
}
