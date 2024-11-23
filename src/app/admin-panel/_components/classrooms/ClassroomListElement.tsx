import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { Classroom } from "@/schemas/classroomSchemas";

type ClassroomListElementProps = {
  classroom: Classroom;
  editedElement: string | null;
  setEditedElement: Dispatch<SetStateAction<string | null>>;
};

export function ClassroomListElement({
  classroom,
  editedElement,
  setEditedElement,
}: ClassroomListElementProps) {
  return (
    <li
      key={classroom.id}
      className={twMerge(
        "flex items-center justify-stretch gap-2 rounded-md border-2 border-primary bg-white/0 p-2",
        editedElement === classroom.name && "bg-accent/10",
      )}
    >
      <h3>{classroom.name}</h3>
      <span className="h-1 w-1 rounded-full bg-primary" />
      <p>Floor {classroom.name[0]}</p>
      <EditDeleteButtonsSection
        onEdit={() => setEditedElement}
        onDelete={() => {}}
      />
    </li>
  );
}
