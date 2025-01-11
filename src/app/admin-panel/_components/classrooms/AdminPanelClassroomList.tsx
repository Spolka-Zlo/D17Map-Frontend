"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { ClassroomListElement } from "./ClassroomListElement";
import { Classroom } from "@/schemas/classroomSchemas";

type AdminPanelClassroomListProps = {
  classrooms: Classroom[];
};

export function AdminPanelClassroomList({
  classrooms,
}: AdminPanelClassroomListProps) {
  const { editedElement, setEditedElement } = useContext(EditContext);
  return (
    <ul className="flex max-h-96 flex-col items-stretch justify-start gap-2 overflow-auto p-2">
      <span
        className="cursor-pointer rounded-md border-2 border-primary bg-white/0 p-2 text-center"
        onClick={() => setEditedElement(null)}
      >
        Wyczyść
      </span>
      {classrooms.map((classroom) => (
        <ClassroomListElement
          key={classroom.id}
          classroom={classroom}
          editedElement={editedElement}
          setEditedElement={setEditedElement}
        />
      ))}
    </ul>
  );
}
