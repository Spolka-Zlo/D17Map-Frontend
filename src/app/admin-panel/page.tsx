import { fetchGet } from "@/server-endpoints/fetchServer";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import AdminPanelList from "./_components/AdminPanelList";
import { getReservationsSchema } from "@/schemas/reservationSchemas";
import { toTimestamp } from "@/utils/DateUtils";

export default async function AdminPanel() {
  const equipments = await fetchGet(
    "http://localhost:8080/equipments",
    getEquipmentsSchema,
  );
  const classrooms = await fetchGet(
    "http://localhost:8080/classrooms",
    getClassroomsSchema,
  );
  const reservations = (
    await fetchGet(
      "http://localhost:8080/reservations?day=2024-07-07",
      getReservationsSchema,
    )
  ).map((reservation) => ({
    ...reservation,
    startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
    endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
  }));

  return (
    <main className="flex flex-row items-start justify-start gap-4">
      <AdminPanelList
        equipments={equipments}
        classrooms={classrooms}
        reservations={reservations}
      />
    </main>
  );
}
