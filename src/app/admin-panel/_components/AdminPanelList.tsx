import { AdminPanelListItem } from "./AdminPanelListItem";
import { AdminPanelClassroomList } from "./classrooms/AdminPanelClassroomList";
import { AddEditClassroom } from "./classrooms/AddEditClassroom";
import { AddEditEquipment } from "./equipments/AddEditEquipment";
import { AdminPanelEquipmentList } from "./equipments/AdminPanelEquipmentList.tsx";
import { AddEditReservation } from "./reservations/AddEditReservation";
import { Reservation } from "@/schemas/reservationSchemas";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { AdminPanelReservationList } from "./reservations/AdminPanelReservationList";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";
import { AdminPanelExtraRoomList } from "./extra-rooms/AdminPanelExtraRoomList";
import { AddEditExtraRoom } from "./extra-rooms/AddEditExtraRoom";
import { AddEditRole } from "./roles/AddEditRole";
import { Role } from "@/schemas/roleSchema";
import { AdminPanelRoleList } from "./roles/AdminPanelRoleList";
import { Floor } from "@/schemas/floorsSchema";
import { AddEditUser } from "./users/AddEditUser";
import { User } from "@/schemas/usersSchema";
import { AdminPanelUserList } from "./users/AdminPanelUserList";

type AdminPanelListProps = {
  equipments: Equipment[];
  classrooms: Classroom[];
  extraRooms: ExtraRoom[];
  reservations: Reservation[];
  roles: Role[];
  floors: Floor[];
  users: User[];
};

export default function AdminPanelList({
  equipments,
  classrooms,
  extraRooms,
  reservations,
  roles,
  floors,
  users,
}: AdminPanelListProps) {
  return (
    <div className="flex gap-4">
      <ul className="flex w-[35vw] flex-col items-stretch justify-start gap-4">
        <AdminPanelListItem name="Sale">
          <AddEditClassroom classrooms={classrooms} equipments={equipments} />
          <AdminPanelClassroomList classrooms={classrooms} />
        </AdminPanelListItem>
        <AdminPanelListItem name="Sprzęt">
          <AddEditEquipment equipments={equipments} />
          <AdminPanelEquipmentList equipments={equipments} />
        </AdminPanelListItem>
        <AdminPanelListItem name="Specjalne pomieszczenia">
          <AddEditExtraRoom extraRooms={extraRooms} />
          <AdminPanelExtraRoomList extraRooms={extraRooms} />
        </AdminPanelListItem>
        <AdminPanelListItem name="Rezerwacje">
          <AddEditReservation reservations={reservations} />
          <AdminPanelReservationList reservations={reservations} />
        </AdminPanelListItem>
      </ul>
      <ul className="flex w-[35vw] flex-col items-stretch justify-start gap-4">
        <AdminPanelListItem name="Role">
          <AddEditRole roles={roles} floors={floors} classrooms={classrooms} />
          <AdminPanelRoleList roles={roles} />
        </AdminPanelListItem>
        <AdminPanelListItem name="Użytkownicy">
          <AddEditUser users={users} roles={roles.map((role) => role.name)} />
          <AdminPanelUserList users={users} />
        </AdminPanelListItem>
      </ul>
    </div>
  );
}
