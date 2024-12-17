"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { twMerge } from "tailwind-merge";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";

type AdminPanelExtraRoomListProps = {
  extraRooms: ExtraRoom[];
};

export function AdminPanelExtraRoomList({
  extraRooms,
}: AdminPanelExtraRoomListProps) {
  const { editedElement, setEditedElement } = useContext(EditContext);
  return (
    <ul className="flex flex-col items-stretch justify-start gap-2 p-2">
      <span
        className="cursor-pointer rounded-md border-2 border-primary bg-white/0 p-2 text-center"
        onClick={() => setEditedElement(null)}
      >
        Clear
      </span>
      {extraRooms.map((extraRoom) => (
        <li
          key={extraRoom.id}
          className={twMerge(
            "flex items-center justify-between gap-2 rounded-md border-2 border-primary bg-white/0 p-2",
            editedElement === extraRoom.name && "bg-accent/10",
          )}
        >
          <h3>{extraRoom.name}</h3>

          <EditDeleteButtonsSection
            onEdit={() => setEditedElement(extraRoom.name)}
            onDelete={() => {}}
          />
        </li>
      ))}
    </ul>
  );
}
