import { CalendarSection } from "./_components/CalendarSection";

export type ReservationType = "Lecture" | "Consultation" | "Exam";

export type Reservation = {
  title: string;
  startTime: string;
  endTime: string;
  room: string;
  date: Date;
  reservationType: ReservationType;
  roomE: {
    id: number;
    name: string;
    equipment: string[];
    peopleCapacity: number;
  };
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
      roomE: {
        id: 1,
        name: "2.41",
        equipment: ["Computers", "Routers", "Terminals"],
        peopleCapacity: 30,
      },
    },
    {
      title: "Consultation",
      startTime: "14:00",
      endTime: "15:00",
      room: "2.41",
      date: new Date(),
      reservationType: "Consultation",
      roomE: {
        id: 1,
        name: "2.41",
        equipment: ["Computers", "Routers", "Terminals"],
        peopleCapacity: 30,
      },
    },
    {
      title: "Lecture",
      startTime: "12:15",
      endTime: "16:45",
      room: "4.22",
      date: new Date(),
      reservationType: "Lecture",
      roomE: {
        id: 2,
        name: "4.22",
        equipment: ["Computers", "Terminals"],
        peopleCapacity: 30,
      },
    },
    {
      title: "Exam",
      startTime: "16:00",
      endTime: "18:00",
      room: "1.38",
      date: new Date(),
      reservationType: "Exam",
      roomE: {
        id: 3,
        name: "1.38",
        equipment: [],
        peopleCapacity: 30,
      },
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
