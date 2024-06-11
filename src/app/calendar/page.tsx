import { CalendarSection } from "./_components/CalendarSection";

export type ReservationType = "Lecture" | "Consultation" | "Exam";

export type Reservation = {
  title: string;
  startTime: string;
  endTime: string;
  room: string;
  date: Date;
  reservationType: ReservationType;
};

export default function Reservation() {
  const reservations: Reservation[] = [
    {
      title: "Lecture",
      startTime: "12:15",
      endTime: "13:45",
      room: "2.41",
      date: new Date(),
      reservationType: "Lecture",
    },
    {
      title: "Consultation",
      startTime: "14:00",
      endTime: "15:00",
      room: "2.41",
      date: new Date(),
      reservationType: "Consultation",
    },
    {
      title: "Lecture",
      startTime: "12:15",
      endTime: "16:45",
      room: "4.22",
      date: new Date(),
      reservationType: "Lecture",
    },
    {
      title: "Exam",
      startTime: "16:00",
      endTime: "18:00",
      room: "1.38",
      date: new Date(),
      reservationType: "Exam",
    },
  ];
  const availableRooms = ["2.41", "1.38", "3.33", "4.22", "3.11", "2.22"];
  const equipment = ["Computers", "Routers", "Terminals"];
  return (
    <main>
      <CalendarSection
        reservations={reservations}
        availableRooms={availableRooms}
        equipment={equipment}
      />
    </main>
  );
}
