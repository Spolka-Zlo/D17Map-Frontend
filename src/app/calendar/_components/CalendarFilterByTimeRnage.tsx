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
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-primary text-xl">Wybór po przedziale czasowym:</h3>
      <div className="flex justify-center content-center items-end gap-4">
        <input
          type="time"
          id="start"
          name="start"
          min="07:00"
          max="21:00"
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          id="end"
          name="end"
          min="07:00"
          max="19:00"
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center content-center items-center gap-4">
        <h3 className="text-primary text-xl">Wyposażenie sali:</h3>
        <MultipleChoiceDropdown
          options={equipment}
          selected={selectedEquipment}
          setSelected={setSelectedEquipment}
        />
      </div>
      <div className="flex justify-start content-center items-center gap-4">
        <h3 className="text-primary text-xl">Pojemność sali:</h3>
        <input
          type="number"
          min={0}
          max={500}
          className="w-32 p-1 rounded-lg"
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
