import ReservationsList from "./_components/ReservationsList";

export type Reservation = {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
};

export default function Reservations() {
  const reservations: Reservation[] = [
    {
      id: 1,
      name: "Kolokwium ASD",
      date: "2022-01-01",
      startTime: "12:00",
      endTime: "13:00",
      room: "4.21",
    },
    {
      id: 2,
      name: "Kolokwium Bazy danych",
      date: "2022-01-02",
      startTime: "14:00",
      endTime: "15:00",
      room: "3.31",
    },
  ];
  return (
    <main>
      <h1>Twoje rezerwacje</h1>
      <ReservationsList reservations={reservations} />
    </main>
  );
}
