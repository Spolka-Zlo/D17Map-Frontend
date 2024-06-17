import { Reservation } from "@/app/calendar/page";
import React from "react";
import { twMerge } from "tailwind-merge";

type CalendarTimeTableProps = {
  rooms: string[];
  roomsToColors: Record<string, string>;
  startTime?: string;
  endTime?: string;
  setStartTime?: React.Dispatch<React.SetStateAction<string>>;
  setEndTime?: React.Dispatch<React.SetStateAction<string>>;
  reservations: Reservation[];
};

export function CalendarTimeTable({
  rooms,
  roomsToColors,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  reservations,
}: CalendarTimeTableProps) {
  const [selectedCells, setSelectedCells] = React.useState<string[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleCellMouseDown = (time: string) => {
    if (selectedCells.length > 0 && isDragging) {
      setIsDragging(false);
    } else {
      setSelectedCells([time]);
      setIsDragging(true);
    }
  };

  const handleCellMouseEnter = (time: string) => {
    if (selectedCells.length > 0 && isDragging) {
      const start = selectedCells[0];
      const end = time;
      const selectedRange = generateTimeRange(start, end);
      setSelectedCells(selectedRange);
    }
  };

  const handleCellMouseUp = () => {
    setIsDragging(false);
    if (selectedCells.length === 0 || !setStartTime || !setEndTime) {
      return;
    }
    if (selectedCells.length === 1) {
      setStartTime(selectedCells[0]);
      setEndTime(selectedCells[0]);
    } else {
      setStartTime(selectedCells[0]);
      setEndTime(selectedCells[selectedCells.length - 1]);
    }
    // setSelectedCells([]);
  };

  const generateTimeRange = (start: string, end: string) => {
    const startIndex = timeToIndex(start);
    const endIndex = timeToIndex(end);
    const range = [];
    for (let i = startIndex; i <= endIndex; i++) {
      range.push(indexToTime(i));
    }
    return range;
  };

  const timeToIndex = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return (hour - 7) * 4 + Math.floor(minute / 15);
  };

  const indexToTime = (index: number) => {
    const hour = Math.floor(index / 4) + 7;
    const minute = (index % 4) * 15;
    return `${hour}:${minute === 0 ? "00" : minute}`;
  };
  if (!rooms && !startTime && !endTime) {
    return null;
  }

  function fillTimeTableForRoom(reservations: Reservation[], rooms: string[]) {
    reservations = reservations.filter((reservation) =>
      rooms.includes(reservation.room)
    );

    const timeTable = Array.from({ length: 15 * 4 }, (_, i) => {
      let variants = "";
      const reservationsInTime = reservations.filter(
        (reservation) =>
          reservation.startTime <=
            `${Math.floor(i / 4) + 7}:${i % 4 === 0 ? "00" : (i % 4) * 15}` &&
          `${Math.floor(i / 4) + 7}:${i % 4 === 0 ? "00" : (i % 4) * 15}` <
            reservation.endTime
      );

      if (reservationsInTime.length === 1) {
        variants = roomsToColors[reservationsInTime[0].room];
      }
      if (reservationsInTime.length === 2) {
        const roomsColors = [
          roomsToColors[reservationsInTime[0].room],
          roomsToColors[reservationsInTime[1].room],
        ];
        if (roomsColors.includes("bg-secondary")) {
          if (roomsColors.includes("bg-primary")) {
            variants = "bg-primary-secondary-stripped";
          } else {
            variants = "bg-secondary-grey-stripped";
          }
        } else if (roomsColors.includes("bg-primary")) {
          variants = "bg-primary-grey-stripped";
        }
      }
      if (reservationsInTime.length === 3) {
        variants = "bg-three-colors-stripped";
      }

      return {
        time: `${Math.floor(i / 4) + 7}:${i % 4 === 0 ? "00" : (i % 4) * 15}`,
        reservationInTime: reservationsInTime,
        colors: variants,
      };
    });
    return timeTable;
  }

  return (
    <div className="relative">
      <div className="grid grid-col-4 grid-rows-1 w-full">
        <div className="border-r-4 p-2 border-black">
          <div className="text-center pb-8 border-b-4 border-black">Time</div>
          <div className="pt-4">
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <div className="h-3 border-t-2 border-black">{i + 7}:00</div>
                <div className="h-3"></div>
                <div className="h-3"></div>
                <div className="h-3"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="p-2 col-start-2 col-end-5">
          <div className="text-center pb-8 border-b-4 border-black">
            Reservations
          </div>
          <div className="pt-4">
            {fillTimeTableForRoom(reservations, rooms).map((reservation, i) => (
              <div
                id={reservation.time}
                key={reservation.time}
                className={twMerge(
                  "text-center h-3 border-t-2 border-dotted border-primary cursor-pointer",
                  i % 4 === 0 && "border-solid",
                  reservation.colors,
                  selectedCells.includes(reservation.time) && "bg-blue-200"
                )}
                onMouseDown={() => handleCellMouseDown(reservation.time)}
                onMouseEnter={() => handleCellMouseEnter(reservation.time)}
                onMouseUp={handleCellMouseUp}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
