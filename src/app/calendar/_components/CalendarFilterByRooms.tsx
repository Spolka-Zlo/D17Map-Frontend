import { MultipleChoiceDropdown } from "@/components/MultipleChoiceDropdown";
import { Dispatch, SetStateAction } from "react";

type CalendarFilterByRoomsProps = {
  availableRooms: string[];
  selectedRooms: string[];
  setSelectedRooms: Dispatch<SetStateAction<string[]>>;
};

export function CalendarFilterByRooms({
  availableRooms,
  selectedRooms,
  setSelectedRooms,
}: CalendarFilterByRoomsProps) {
  return (
    <div>
      <MultipleChoiceDropdown
        options={availableRooms}
        selected={selectedRooms}
        setSelected={setSelectedRooms}
        className=""
      />
    </div>
  );
}
