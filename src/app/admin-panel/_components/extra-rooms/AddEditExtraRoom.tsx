"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { AddEditExtraRoomForm } from "./AddEditExtraRoomForm";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";

export function AddEditExtraRoom({ extraRooms }: { extraRooms: ExtraRoom[] }) {
  const { editedElement } = useContext(EditContext);
  const extraRoom = extraRooms.find(
    (extraRoom) => extraRoom.name === editedElement,
  );
  return <AddEditExtraRoomForm extraRoom={extraRoom} />;
}
