import { Dispatch, SetStateAction, useState } from "react";
import { Reservation } from "@/app/calendar/page";
import { MultipleChoiceDropdown } from "@/components/MultipleChoiceDropdown";
import { OrangeButton } from "@/components/OrangeButton";

type CalendarFilterByTimeRangeProps = {
  reservations: Reservation[];
  equipment: string[];
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
};

export function CalendarFilterByTimeRange({
  reservations,
  equipment,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  room,
  setRoom,
  setFormOpen,
}: CalendarFilterByTimeRangeProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  function roundToNearestQuarter(time: string): string {
    const [hours, minutes] = time.split(":");
    const roundedMinutes = Math.round(Number(minutes) / 15) * 15;
    const roundedHours =
      roundedMinutes === 60 ? Number(hours) + 1 : Number(hours);
    const formattedHours = String(roundedHours).padStart(2, "0");
    const formattedMinutes = String(roundedMinutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  }

  function filterReservationsByAllFilters(reservation: Reservation): boolean {
    const isEquipmentMatch = selectedEquipment.every((equipment) =>
      reservation.roomE?.equipment.includes(equipment)
    );
    const isTimeMatch =
      reservation.endTime < startTime || reservation.startTime > endTime;
    const isPeopleMatch = reservation.roomE?.peopleCapacity >= numberOfPeople;
    return isEquipmentMatch && isTimeMatch && isPeopleMatch;
  }

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-primary text-xl">Wybór po przedziale czasowym:</h3>
      <div className="flex justify-center content-center items-end gap-4">
        <input
          className="w-32 p-1 rounded-lg"
          type="time"
          id="start"
          name="start"
          min="07:00"
          max="22:00"
          value={startTime}
          onChange={(e) => setStartTime(roundToNearestQuarter(e.target.value))}
          required
        />
        <input
          className="w-32 p-1 rounded-lg"
          type="time"
          id="end"
          name="end"
          min={"07:00"}
          max={"22:00"}
          value={endTime}
          onChange={(e) => setEndTime(roundToNearestQuarter(e.target.value))}
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
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
        />
      </div>
      <ul className="flex justify-center items-center gap-3">
        {reservations
          .filter(filterReservationsByAllFilters)
          .reduce((acc: string[], reservation) => {
            if (!acc.includes(reservation.classroom.name)) {
              return [...acc, reservation.classroom.name];
            }
            return acc;
          }, [])
          .map((room) => (
            <li key={room}>
              <OrangeButton
                text={room}
                onClick={() => {
                  setRoom(room);
                  setFormOpen(true);
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
