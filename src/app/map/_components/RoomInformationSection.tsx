import { CalendarReservationForm } from "@/app/calendar/_components/CalendarReservationForm";
import { ThreeSixtyViewer } from "@/app/sphere/_components/ThreeSixtyViewer";
import { OrangeButton } from "@/components/OrangeButton";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";
import { Dispatch, SetStateAction, useState } from "react";

type RoomInformationSectionProps = {
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
  classrooms: Classroom[];
  extraRooms: ExtraRoom[];
  equipments: Equipment[];
  reservationTypes: string[];
};

export function RoomInformationSection({
  clickedRoom,
  setClickedRoom,
  classrooms,
  extraRooms,
  equipments,
  reservationTypes,
}: RoomInformationSectionProps) {
  const [isReservationModalOpen, openCloseReservationModal] = useState(false);
  const room =
    classrooms.find((c) => c.modelKey === clickedRoom) ||
    extraRooms.find((e) => e.modelKey === clickedRoom);
  if (!room) {
    return null;
  }
  const equipment =
    "equipmentIds" in room
      ? room.equipmentIds.map((id) => equipments.find((e) => e.id === id))
      : [];
  return (
    <div className="flex w-full flex-col justify-between p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{room.name}</h1>
        <OrangeButton
          onClick={() => openCloseReservationModal(true)}
          text={"Zarezerwuj"}
          className="border-primary bg-accent text-primary"
        >
          Zarezerwuj
        </OrangeButton>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">Numer sali:</span>
          <span className="text-sm">{room.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Pojemność:</span>
          <span className="text-sm">
            {"capacity" in room ? room.capacity : "Nie dotyczy"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Typ sali:</span>
          <span className="text-sm">
            {"type" in room ? room.type : "Sala zajęć"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Wyposażenie:</span>
          <span className="text-sm">
            {equipment.map((e) => e?.name).join(", ") || "Brak wyposażenia"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Opis:</span>
          <span className="text-sm">
            {"description" in room && room.description
              ? room.description
              : "Brak opisu"}
          </span>
        </div>
      </div>
      {clickedRoom !== "" && (
        <ThreeSixtyViewer
          classroomId={
            classrooms.find((c) => c.modelKey === clickedRoom)?.id ||
            extraRooms.find((e) => e.modelKey === clickedRoom)?.id ||
            ""
          }
        />
      )}
      {isReservationModalOpen &&
        classrooms.find((c) => c.modelKey === clickedRoom) && (
          <CalendarReservationForm
            room={room.name}
            date={new Date()}
            classrooms={classrooms}
            setOpen={openCloseReservationModal}
            reservationTypes={reservationTypes}
            setEditedReservation={() => {}}
          />
        )}
    </div>
  );
}
