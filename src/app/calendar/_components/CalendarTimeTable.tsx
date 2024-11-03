import { Reservation } from "@/app/calendar/page";
import React from "react";
import { twMerge } from "tailwind-merge";

type CalendarTimeTableProps = {
  reservations: Reservation[];
  mondayDate: number;
};

type weekdaysMapType = {
  Mon: Reservation[];
  Tue: Reservation[];
  Wed: Reservation[];
  Thu: Reservation[];
  Fri: Reservation[];
  Sat: Reservation[];
  Sun: Reservation[];
};

export function CalendarTimeTable({
  reservations,
  mondayDate,
}: CalendarTimeTableProps) {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function getWeekDay(date: string) {
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  }

  function weekdaysMap(reservations: Reservation[]) {
    const weekdaysMap: weekdaysMapType = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };
    reservations.forEach((reservation) => {
      const day = getWeekDay(reservation.date) as keyof weekdaysMapType;
      weekdaysMap[day].push(reservation);
    });
    // console.log(weekdaysMap);
    return weekdaysMap;
  }

  function generateTimestamps(startHour: number, endHour: number, day?: Date) {
    if (!day) {
      return [];
    }
    day.setHours(0, 0, 0, 0);
    const startTime = day.getTime() + startHour * 3600 * 1000; // Start of the time range (e.g., 7:00)
    const timestamps = new Array((endHour - startHour) * 4) // Number of 15-min intervals in the range
      .fill(0)
      .map((_, i) => startTime + i * 1000 * 60 * 15); // Each 15-min increment
    return timestamps;
  }

  function mapReservationsToTimestamps(
    dayReservations: Reservation[],
    day?: Date,
  ) {
    const timestamps = generateTimestamps(7, 22, day);
    // console.log("timestamps", timestamps);
    // console.log(dayReservations);
    const currentEvents = timestamps.map(
      (timestamp) =>
        dayReservations.find((reservation) => {
          return (
            reservation.startTime <= timestamp &&
            reservation.endTime >= timestamp
          );
        }) || null, // Ensure null is returned if no reservation matches
    );
    // console.log(currentEvents);
    return currentEvents;
  }

  const mapWeekdaysToTimestamps = (weekdaysMap: weekdaysMapType) => {
    const timeStampWeekdayMap: Record<
      keyof weekdaysMapType,
      (Reservation | null)[]
    > = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };

    Object.entries(weekdaysMap).forEach(([day, reservations]) => {
      const weekDay = day as keyof weekdaysMapType;
      timeStampWeekdayMap[weekDay] =
        mapReservationsToTimestamps(
          reservations,
          new Date(reservations[0]?.date),
        ) ?? [];
    });

    return timeStampWeekdayMap;
  };

  function isFirstTimestampInReservation(
    timestamp: number,
    reservation: Reservation,
  ) {
    return timestamp === reservation.startTime;
  }

  const timestampsMap = mapWeekdaysToTimestamps(weekdaysMap(reservations));
  const timestamps = generateTimestamps(7, 22); // Only needed if used elsewhere in your code

  console.log(timestampsMap);
  // console.log(timestampsMap);
  return (
    <div className="relative">
      <div className="grid-col-9 grid w-full grid-rows-1">
        <div className="border-r-4 border-black p-2">
          <div className="border-b-4 border-black pb-3 text-center">Time</div>
          <div className="pt-2">
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <div className="h-2.5 border-t-2 border-black">{i + 7}:00</div>
                <div className="h-2.5"></div>
                <div className="h-2.5"></div>
                <div className="h-2.5"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {Object.entries(timestampsMap).map(
          ([day, reservationTimeStamps], i) => (
            <div
              key={day}
              className="p-2"
              style={{
                gridColumn: i + 2,
                gridRow: 1,
              }}
            >
              <div className="border-b-4 border-black pb-3 text-center">
                {day}
              </div>
              <div className="pt-2">
                {reservationTimeStamps.map((reservation, j) => (
                  <div
                    key={j + i + day}
                    className={twMerge(
                      "h-2.5 w-full cursor-pointer border-dotted border-primary text-center text-accent",
                      j % 4 === 0 && "border-solid",
                      reservation
                        ? "border-l-2 border-r-2 border-solid border-accent bg-primary"
                        : "border-t-2",
                      reservation &&
                        j - 1 >= 0 &&
                        reservationTimeStamps[j - 1] === null &&
                        "border-t-2 border-solid border-accent",
                      reservation &&
                        j + 1 < reservationTimeStamps.length &&
                        reservationTimeStamps[j + 1] === null &&
                        "border-b-2 border-solid border-accent",
                    )}
                  >
                    {reservation &&
                    j - 1 >= 0 &&
                    reservationTimeStamps[j - 1] === null
                      ? reservation.title
                      : ""}
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
