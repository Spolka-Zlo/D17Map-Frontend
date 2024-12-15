"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { Classroom } from "@/schemas/classroomSchemas";
import { deleteClassroom } from "../../_actions/delete-classroom";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { toast } from "sonner";

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
  const [isConfirmationModalOpen, openCloseConfirmationModal] = useState(false);
  const [deletedClassroom, setDeletedClassroom] = useState<Classroom | null>(
    null,
  );
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
        onDelete={() => {
          setDeletedClassroom(classroom);
          openCloseConfirmationModal(true);
        }}
      />
      {deletedClassroom && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            openCloseConfirmationModal(false);
          }}
          onConfirm={async () => {
            await deleteClassroom(deletedClassroom.name)
              .then(() => {
                toast.success("Sala została usunięta");
              })
              .catch(() => {
                toast.error("Nie udało się usunąć sali");
              });
            openCloseConfirmationModal(false);
          }}
          message={`Czy na pewno chcesz usunąć salę ${deletedClassroom.name}?`}
          title="Usuwanie sali"
        />
      )}
    </li>
  );
}
