import { Dispatch, SetStateAction, useState } from "react";
import { Reservation } from "@/app/calendar/page";
import { MultipleChoiceDropdown } from "@/components/MultipleChoiceDropdown";

type CalendarFilterByTimeRnageProps = {
  reservations: Reservation[];
  equipment: string[];
};

export function CalendarFilterByTimeRnage({
  reservations,
  equipment,
}: CalendarFilterByTimeRnageProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  return (
    <div className="flex flex-col">
      <h2>Wybór po przedziale czasowym:</h2>
      <div className="flex justify-center content-center items-end gap-4">
        <input
          type="time"
          id="appt"
          name="appt"
          min="07:00"
          max="19:00"
          required
        />
        <input
          type="time"
          id="appt"
          name="appt"
          min="07:00"
          max="19:00"
          required
        />
      </div>
      <h3>Wyposażenie sali:</h3>
      <MultipleChoiceDropdown
        options={equipment}
        selected={selectedEquipment}
        setSelected={setSelectedEquipment}
      />
      <h3>Pojemność sali:</h3>
      <input type="number" />
    </div>
  );
}
