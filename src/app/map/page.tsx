import { MapReservationSection } from "./_components/MapReservationSection";

export const dynamic = "force-dynamic";

async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default async function Map() {
  const availableRooms = await fetchData("http://localhost:8080/classrooms");

  const equipment = await fetchData("http://localhost:8080/equipments");
  return (
    <main>
      <MapReservationSection rooms={availableRooms} equipment={equipment} />
    </main>
  );
}
