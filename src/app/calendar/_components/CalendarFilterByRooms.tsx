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
    <div className="flex justify-center content-center items-end gap-4">
      <h2>Wybór po salach:</h2>
      <MultipleChoiceDropdown
        options={availableRooms}
        selected={selectedRooms}
        setSelected={setSelectedRooms}
        className=""
      />
    </div>
  );
}
